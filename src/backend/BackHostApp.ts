import { Server, createServer } from 'http';
import express, { Express, NextFunction, Request, Response } from 'express';
import colors from 'colors/safe';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import { WebSocketServer } from './WebSocketServer';
import { Context } from './Context';
import { BkApplication } from './viewer/BkModel/BkApplication/BkApplication';
import { AppInfo } from './AppInfo';
import { MonitorModule } from './monitor/MonitorModule';
import { IndexModule } from './index/IndexModule';
import { HttpError } from './HttpError';
import { ViewerModule } from './viewer/ViewerModule';
import { EditorModule } from './editor/EditorModule';
import { FileSessionStore, getSecretSync } from './FileSessionStore';
import { Result } from '../Result';
import { ApplicationEditor } from './editor/Editor/ApplicationEditor/ApplicationEditor';
import { BaseModel } from './BaseModel';
import { Optional, Scalar, Route } from '../types';
import { EVEvent, EventLog, EventLogOptions } from './EventLog';
import { EmptyPromise } from './EmptyPromise';
import { debug, error } from '../console';
import { Nullable } from '../types';
import { log, time } from '../decorators';
import { pConsole, LogLevel } from '../pConsole';
import { e500 } from './e500';
import { checkNodeVersion } from './private-helper';
import { Router } from './Router';
import { createDirIfNotExists, createDirIfNotExistsSync } from './file-helper';
import { Helper, CreateAppDto } from '../frontend';
import { CODE_ROOT_DIR_PATH } from '../index';

const pkg = require('../../package.json');

const APPS_DIR_PATH = process.env.APPS_DIR_PATH || './apps';
const LISTEN_HOST = process.env.LISTEN_HOST || 'localhost';
const LISTEN_PORT = (process.env.LISTEN_PORT && parseInt(process.env.LISTEN_PORT)) || 7000;
const MIN_NODE_VERSION = 14;

export interface BackHostAppConfig {
    srcDirPath?: string;
    distDirPath?: string;
    runtimeDirPath?: string;
    codeRootDirPath?: string; // for testing source files with jest
    handleException?: boolean;
    host?: string;
    port?: number;
    logger?: EventLogOptions;
    frontLogUrl?: string;
    monitor?: {
        username: string;
        password: string;
    };
}

export class BackHostApp<TParams extends BackHostAppConfig = BackHostAppConfig> {
    applications: { [route: string]: BkApplication } = {};
    private express: Express;
    httpServer: Server;
    wsServer: WebSocketServer;

    // dir path
    private srcDirPath: string;
    distDirPath: string;
    backendDirPath: string;
    frontendDirPath: string;
    runtimeDirPath: string;
    sessionDirPath: string;

    private router: Router;

    // module
    indexModule: IndexModule;
    monitorModule: MonitorModule;
    viewerModule: ViewerModule;
    editorModule: EditorModule;

    startTime: Date = new Date();
    createAppQueue: { [route: string]: Nullable<Array<EmptyPromise<BkApplication>>> } = {};
    private eventLog: EventLog;

    constructor(private config: TParams = {} as TParams) {
        debug('BackHostApp.constructor', config);
        pConsole.debug('CODE_ROOT_DIR_PATH:', CODE_ROOT_DIR_PATH);
        pConsole.debug('this.getCodeRootDirPath():', this.getCodeRootDirPath());
    }

    @log(LogLevel.debug)
    @time
    async init(): Promise<void> {
        checkNodeVersion(MIN_NODE_VERSION);
        this.initDirPaths();
        this.checkApplicationFolder();
        this.createTempDirsIfNotExistSync();
        this.createEventLog();
        this.initRouter();
        await this.initModules();
        this.createExpressServer();
        this.createHttpServer();
    }

    @log(LogLevel.debug)
    @time
    async run(): Promise<void> {
        await BackHostApp.runHttpServer(this.httpServer, this.getHost(), this.getPort());
        this.httpServer.on('error', this.onHttpServerError.bind(this));
        this.createWebSocketServer();
        this.listenProcessEvents();
        pConsole.log(this.composeStartMessage());
    }

    getHost(): string {
        return this.config.host || LISTEN_HOST;
    }

    getPort(): number {
        const { port } = this.config;
        if (port && typeof port !== 'number')
            throw new Error(`getPort: type port error: ${typeof port}`);
        return port || LISTEN_PORT;
    }

    createHttpServer(): void {
        this.httpServer = createServer(this.express);
    }

    checkApplicationFolder(): void {
        if (!fs.existsSync(this.srcDirPath)) {
            throw new Error(`Application folder '${this.srcDirPath}' doesn't exist`);
        }
    }

    createTempDirsIfNotExistSync(): void {
        createDirIfNotExistsSync(this.runtimeDirPath);
        createDirIfNotExistsSync(this.sessionDirPath);
    }

    private createEventLog(): void {
        this.eventLog = new EventLog(this.config.logger);
    }

    initRouter() {
        this.router = new Router(this);
    }

    async initModules(): Promise<void> {
        this.indexModule = new IndexModule(this);
        this.monitorModule = new MonitorModule(this);
        this.viewerModule = new ViewerModule(this);
        this.editorModule = new EditorModule(this);
        await this.indexModule.init();
        await this.monitorModule.init();
        await this.viewerModule.init();
        await this.editorModule.init();
    }

    createWebSocketServer(): void {
        this.wsServer = new WebSocketServer({
            hostApp: this,
            httpServer: this.httpServer,
        });
    }

    initDirPaths(): void {
        this.srcDirPath = path.resolve(this.config.srcDirPath || APPS_DIR_PATH);
        this.distDirPath = this.config.distDirPath || this.srcDirPath;
        this.backendDirPath = path.join(this.getCodeRootDirPath(), 'backend');
        this.frontendDirPath = path.join(this.getCodeRootDirPath(), 'frontend');
        this.runtimeDirPath = path.resolve(this.config.runtimeDirPath || './runtime');
        this.sessionDirPath = path.join(this.runtimeDirPath, 'session');
    }

    getCodeRootDirPath(): string {
        return this.config.codeRootDirPath || CODE_ROOT_DIR_PATH;
    }

    composeStartMessage(): string {
        const host = this.getHost();
        const port = this.getPort();
        let message = '\n';
        message += `NODE_ENV=${process.env.NODE_ENV}\n`;
        message += `QFORMS_LOG_LEVEL=${process.env.QFORMS_LOG_LEVEL}\n`;
        message += '\n';
        message += `QForms server v${this.getPlatformVersion()} listening on http://${host}:${port}${
            this.isDevelopment() ? '/index2' : ''
        }\n`;
        message += `\tcwd: ${process.cwd()}\n`;
        message += `\tsrcDirPath: ${this.srcDirPath}\n`;
        message += `\tdistDirPath: ${this.distDirPath}\n`;
        message += `\tbackendDirPath: ${this.backendDirPath}\n`;
        message += `\tfrontendDirPath: ${this.frontendDirPath}\n`;
        message += `\truntimeDirPath: ${this.runtimeDirPath}\n`;
        message += `\tsessionDirPath: ${this.sessionDirPath}\n`;

        if (this.isDevelopment()) {
            message += `\tmonitor: http://${host}:${port}/monitor\n`;
        }
        message += `\tstarted at: ${new Date().toISOString()}\n`;
        return message;
    }

    listenProcessEvents(): void {
        process.on('message', this.onProcessMessage.bind(this));
        process.on('SIGINT', this.onProcessSIGINT.bind(this));
        process.on('SIGTERM', this.onProcessSIGTERM.bind(this));
        process.on('exit', this.onProcessExit.bind(this));
        process.on('uncaughtException', this.onUncaughtException.bind(this));
        process.on('unhandledRejection', this.onUnhandledRejection.bind(this));
    }

    createExpressServer(): void {
        this.express = express();
        this.initExpressServer();
        this.useMiddlewares();
        this.initSystemRoutes();
        this.useStatic();
        this.initCustomRoutes();
        this.useErrors();
    }

    initExpressServer() {
        this.express.set('handleException', this.config.handleException ?? true);
        this.express.enable('strict routing');
    }

    useMiddlewares(): void {
        this.express.use(
            bodyParser.json({
                limit: '20mb',
                reviver: Helper.dateTimeReviver,
            }),
        );
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(cookieParser());
        this.express.use(
            session({
                store: new FileSessionStore(this.sessionDirPath),
                secret: getSecretSync(path.join(this.runtimeDirPath, 'secret.txt')),
                // @ts-ignore
                key: 'sid',
                resave: false,
                saveUninitialized: false,
            }),
        );
    }

    initSystemRoutes(): void {
        this.router.createRoutes();

        // error
        this.express.options('/error', this.optionsError.bind(this));
        this.express.post('/error', this.postError.bind(this));
    }

    initCustomRoutes(): void {}

    // handle static for index and monitor
    useStatic(): void {
        this.express.use(
            express.static(this.frontendDirPath, {
                setHeaders: (res, fullPath, stat) => {
                    pConsole.log(
                        `static: /${path.relative(this.frontendDirPath, fullPath)} ${
                            res.statusCode
                        }`,
                    );
                },
            }),
        );
    }

    // 404 and 500 error handlers
    useErrors() {
        this.express.use(this._e404.bind(this));
        this.express.use(this._e500.bind(this));
    }

    // создание приложения длительный процесс, если во время создания приложения
    // будет вызвара createApplicationIfNotExists, то ей будет возвращён пустой промис
    async createApplicationIfNotExists(context: Context): Promise<BkApplication> {
        // debug(`BackHostApp.createApplicationIfNotExists debug: ${context.query.debug}, env: ${context.getEnv()}`);
        const route = context.getRoute();
        const application = this.applications[route];
        if (application) {
            return application;
        }

        // if creating application
        if (Array.isArray(this.createAppQueue[route])) {
            debug('application is creating:', route);
            const promise = EmptyPromise.create<BkApplication>();
            this.createAppQueue[route]!.push(promise);
            return promise;
        }

        return await this.beginCreateApplication(context);
    }

    // создаём приложение и после создание уведомляем всех ждущих
    async beginCreateApplication(context: Context): Promise<BkApplication> {
        const route = context.getRoute();
        this.createAppQueue[route] = [];
        try {
            const app = (this.applications[route] = await this.createApplication(context));
            debug(
                'application created, start resolve loop',
                route,
                this.createAppQueue[route]!.length,
            );
            for (const p of this.createAppQueue[route]!) {
                p.resolve(app);
            }
            return app;
        } catch (err) {
            error(
                'application not created, start reject loop',
                route,
                this.createAppQueue[route]!.length,
            );
            for (const p of this.createAppQueue[route]!) {
                p.reject(err);
            }
            throw err;
        } finally {
            this.createAppQueue[route] = null;
        }
    }

    getApplication(context: Context): BkApplication {
        const application = this.applications[context.getRoute()];
        if (!application) throw new Error(`no application for route: ${context.getRoute()}`);
        return application;
    }

    getApplicationByRoute(route: string): BkApplication {
        return this.applications[route];
    }

    getSrcAppFilePath(context: Context): string {
        return path.join(
            this.srcDirPath,
            context.getAppDirName(),
            context.getAppFileName() + '.json',
        );
    }

    getDistAppFilePath(context: Context): string {
        return path.join(
            this.distDirPath,
            context.getAppDirName(),
            context.getAppFileName() + '.json',
        );
    }

    async createApplication(context: Context): Promise<BkApplication> {
        debug(`BackHostApp.createApplication: ${context.getRoute()}`);

        const appFilePath = this.getDistAppFilePath(context);
        // const distDirPath = this.makeDistDirPathForApp(appFilePath);
        const appInfo = await BkApplication.loadAppInfo(appFilePath /* , distDirPath */);

        // ApplicationClass
        const ApplicationClass = this.getApplicationClass(appInfo);

        // application
        const application = new ApplicationClass(appInfo, this, context.getEnv());
        await application.init(context);
        return application;
    }

    getApplicationClass(appInfo: AppInfo): typeof BkApplication {
        // debug('BackHostApp.getApplicationClass', appInfo);
        const modelClass = BaseModel.getAttr(appInfo.appFile.data, 'modelClass');
        if (modelClass) {
            const CustomClass = (global as any)[modelClass];
            if (!CustomClass) throw new Error(`no class ${modelClass}`);
            return CustomClass;
        }
        return BkApplication;
    }

    @log(LogLevel.debug)
    async createAppInfos(req: Request): Promise<AppInfo[]> {
        const { folder, name } = req.body as CreateAppDto;
        if (!folder) throw new Error(`folder required: ${folder}`);
        if (!name) throw new Error(`name required: ${name}`);
        const appDirPath = path.join(this.srcDirPath, folder);
        const appFilePath = path.join(appDirPath, name + '.json');
        await createDirIfNotExists(appDirPath);
        await ApplicationEditor.createAppFile(appFilePath, { name });
        const appInfos = await BkApplication.getAppInfos(this.srcDirPath);
        return appInfos;
    }

    async logError(err: Error, req?: Request): Promise<void> {
        pConsole.log('BackHostApp.logError:', colors.bgRed(colors.white(err.message)));
        try {
            await this.eventLog.log({
                type: 'error',
                source: 'server',
                message: err.message,
                stack: err.stack,
                data: req && JSON.stringify(this.composeContextData(err, req), null, 4),
                ip: req && Context.getIpFromReq(req),
            });
        } catch (err) {
            error('logError:', colors.red(err));
        }
    }

    composeContextData(err: Error, req: Request) {
        const route = err instanceof HttpError ? err.route : null;
        return {
            route: route,
            headers: req.headers,
            method: req.method,
            host: req.headers.host,
            originalUrl: req.originalUrl,
            uri: req.params['0'],
            platformVersion: this.getPlatformVersion(),
            appVersion:
                route && this.applications[route] ? this.applications[route].getVersion() : null,
            body: req.body,
            status: err instanceof HttpError ? err.status || null : null,
            data: err instanceof HttpError ? err.data || null : null,
        };
    }

    async logEvent(context: Context, message: string, data?: object): Promise<void> {
        pConsole.log('BackHostApp.logEvent', message);
        try {
            await this.eventLog.log({
                type: 'log',
                source: 'server',
                message: message,
                data: data && JSON.stringify(data, null, 4),
                ip: context.getIp(),
            });
        } catch (err) {
            pConsole.error('logEvent:', colors.red(err));
        }
    }

    async _e404(req: Request, res: Response, next: NextFunction): Promise<void> {
        debug(colors.magenta(req.method), 'error/404', req.originalUrl);
        next(
            new HttpError({
                message: `${req.method} ${req.originalUrl} not found`,
                status: 404,
            }),
        );
    }

    async _e500(err: any, req: Request, res: Response, next: NextFunction): Promise<void> {
        debug(colors.magenta('module.exports.e500:'), req.method, req.originalUrl, err);

        pConsole.log('_e500:', colors.bgRed(colors.white(err.message)));

        const error = typeof err === 'string' ? new HttpError({ message: err }) : err;
        res.status(error.status || 500);
        if (
            req.headers['content-type'] &&
            req.headers['content-type'].indexOf('application/json') !== -1
        ) {
            res.end(
                this.isDevelopment() || error.status === 404
                    ? error.message
                    : 'Internal Software Error',
            );
        } else {
            const status: number = error.status || 500;
            const message: string =
                this.isDevelopment() || error.status === 404
                    ? error.message
                    : 'Internal Software Error';
            const stack: string = this.isDevelopment() && error.status !== 404 ? error.stack : '';
            res.setHeader('Content-Type', 'text/html').end(e500(status, message, stack));
        }
        await this.logError(error, req);
    }

    static runHttpServer(httpServer: Server, host: string, port: number): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const tempErrorHandler = (err: any) => {
                    error('tempErrorHandler', err);
                    httpServer.off('error', tempErrorHandler);
                    reject(err);
                };
                httpServer.on('error', tempErrorHandler);
                httpServer.listen(port, host, () => {
                    httpServer.off('error', tempErrorHandler);
                    resolve();
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    @log(LogLevel.debug)
    async onProcessMessage(message: string): Promise<void> {
        if (message === 'shutdown') {
            try {
                await this.shutdown();
            } catch (err) {
                error('shutdown error:', err.message);
            }
            process.exit(0);
        }
    }

    async onProcessSIGINT(): Promise<void> {
        debug('\nBackHostApp.onProcessSIGINT');
        pConsole.log('\nReceived INT signal (Ctrl+C), shutting down gracefully...');
        try {
            await this.shutdown();
            process.exit(0);
        } catch (err) {
            error('shutdown error:', err.message);
            process.exit(1);
        }
    }

    @log(LogLevel.debug)
    async onProcessSIGTERM(): Promise<void> {
        pConsole.log('Received SIGTERM (kill) signal, shutting down forcefully.');
        try {
            await this.shutdown();
            process.exit(0);
        } catch (err) {
            error('shutdown error:', err.message);
            process.exit(1);
        }
    }

    onProcessExit(code: number) {
        debug('BackHostApp.onProcessExit:', code);
        pConsole.log('exit:', code);
    }

    async onUncaughtException(err: Error, origin: string): Promise<void> {
        error(colors.red('BackHostApp.onUncaughtException'), err);
        err.message = `uncaughtException: ${err.message}`;
        await this.logError(err);
    }

    async onUnhandledRejection(reason: Error | any, promise: Promise<any>): Promise<void> {
        error(colors.red('BackHostApp.onUnhandledRejection'), reason);
        reason.message = `unhandledRejection: ${reason.message}`;
        await this.logError(reason);
    }

    @log(LogLevel.debug)
    async shutdown(): Promise<void> {
        const routes = Object.keys(this.applications);
        for (let i = 0; i < routes.length; i++) {
            const route = routes[i];
            // debug('route:', route);
            const application = this.applications[route];
            await application.deinit();
        }
    }

    onHttpServerError(err: any): void {
        error(colors.red('BackHostApp.onHttpServerError'), err.code, err.message);
        /* if (err.code === 'EADDRINUSE') {
            error(`Address ${host}:${port} in use.`);
        } else {
            error(err);
        } */
    }

    static getDomainFromRequest(req: Request): Nullable<string> {
        if (!req) throw new Error('need req param');
        const hostPort = req.headers.host;
        if (!hostPort) throw new Error('no host');
        const [host, port] = hostPort.split(':');
        const [domain] = host.split('.');
        if (!domain) throw new Error('trouble getting a domain');
        return domain;
    }

    getDomain(req: Request): Nullable<string> {
        return 'domain';
    }

    async optionsError(req: Request, res: Response, next: NextFunction): Promise<void> {
        pConsole.log('options /error');
        res.header('Access-Control-Allow-Origin', '*')
            .header('Access-Control-Allow-Headers', 'Content-Type, Content-Length')
            .end();
    }

    async postError(req: Request, res: Response, next: (err?: Error) => void): Promise<void> {
        debug(colors.blue('BackHostApp.postError'), req.body.message);
        const body = req.body as EVEvent;

        pConsole.log('client error:', colors.red(body.message));

        try {
            const data = JSON.stringify(
                {
                    headers: req.headers,
                    domain: this.getDomain(req),
                },
                null,
                4,
            );
            await this.eventLog.log({
                type: body.type,
                source: body.source,
                message: body.message,
                stack: body.stack,
                data: `${body.data}\n${data}`,
                ip: body.ip || Context.getIpFromReq(req),
            });
            res.header('Access-Control-Allow-Origin', '*').end('ok');
        } catch (err) {
            next(err);
        }
    }

    static getQueryFromParams(
        req: Request,
        query: Record<string, Nullable<Scalar>>,
    ): Record<string, any> {
        return Object.keys(query).reduce((acc: Record<string, any>, name: string) => {
            const value = query[name];
            if (value === null) {
                acc[name] = req.params[name];
            } else {
                // @ts-ignore
                acc[name] = req.params[value] || value;
            }
            return acc;
        }, {} as Record<string, any>);
    }

    createCustomRoute(
        path: string | RegExp,
        route: Route,
        optionsOrCallBack?: Record<string, Nullable<Scalar>> | ((req: Request) => void),
    ): void {
        this.router.alias('get', path, route, 'moduleGet', optionsOrCallBack);
        this.router.alias('post', path, route, 'modulePost', optionsOrCallBack);
        this.router.alias('patch', path, route, 'modulePatch', optionsOrCallBack);
        this.router.alias('delete', path, route, 'moduleDelete', optionsOrCallBack);
    }

    broadcastResult(sourceApplication: BkApplication, context: Context, result: Result): void {
        debug('BackHostApp.broadcastResult');
        for (const route in this.applications) {
            if (context.getRoute() === route && this.applications[route] === sourceApplication) {
                sourceApplication.broadcastDomesticResultToClients(context, result);
            } else {
                const application = this.applications[route];
                application.broadcastForeignResultToClients(context, result);
            }
        }
    }

    getLogger(): EventLog {
        return this.eventLog;
    }

    getFrontLogUrl(): Optional<string> {
        return this.config.frontLogUrl;
    }

    getHttpServer(): Server {
        return this.httpServer;
    }

    getFrontendDirPath(): string {
        return this.frontendDirPath;
    }

    getNodeEnv(): Nullable<string> {
        return process.env.NODE_ENV || null;
    }

    isDevelopment(): boolean {
        return this.getNodeEnv() === 'dev';
    }

    /* isProduction(): boolean {
        return !this.isDevelopment();
    } */

    getParams(): TParams {
        return this.config;
    }

    getExpress(): Express {
        return this.express;
    }

    getSrcDirPath(): string {
        return this.srcDirPath;
    }

    getPlatformVersion(): string {
        return pkg.version;
    }

    getRouter(): Router {
        return this.router;
    }
}
