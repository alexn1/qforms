import http from 'http';
import express, { Express, Request, Response } from 'express';
import fetch from 'node-fetch';
import colors from 'colors/safe';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import { WebSocketServer } from './WebSocketServer';
import { Helper } from './Helper';
import { BkPostgreSqlDatabase } from './viewer/BkModel/BkDatabase/BkSqlDatabase/BkPostgreSqlDatabase/BkPostgreSqlDatabase';
import { Context } from './Context';
import { BkApplication } from './viewer/BkModel/BkApplication/BkApplication';
import { AppInfo } from './AppInfo';
import { MonitorModule } from './monitor/MonitorModule';
import { IndexModule } from './index/IndexModule';
import { MyError } from './MyError';
import { ViewerModule } from './viewer/ViewerModule';
import { EditorModule } from './editor/EditorModule';
import { FileSessionStore } from './FileSessionStore';
import { Result } from '../Result';
import { ApplicationEditor } from './editor/Editor/ApplicationEditor/ApplicationEditor';
import { BaseModel } from './BaseModel';
// import Test from './test/Test';

const pkg = require('../../package.json');

export class BackHostApp {
    params: any;
    applications: any; // application by route
    express: Express;
    httpServer: any;
    wsServer: any;
    appsDirPath: string;
    distDirPath: string;
    frontendDirPath: string;
    runtimeDirPath: string;
    sessionDirPath: string;
    logPool: any;
    indexModule: IndexModule;
    monitorModule: MonitorModule;
    viewerModule: ViewerModule;
    editorModule: EditorModule;
    startTime: Date;
    logErrorUrl: string;
    appQueue: any;

    constructor(params: any = {}) {
        // console.log('BackHostApp.constructor');
        this.checkVersion();
        this.params = params;
        this.applications = {};
        this.appQueue = {};
    }

    checkVersion() {
        const [majorNodeVersion] = process.versions.node.split('.');
        // console.log('majorNodeVersion', majorNodeVersion, typeof majorNodeVersion);
        const MIN_NODE_VERSION = 14;
        if (parseInt(majorNodeVersion) < MIN_NODE_VERSION) {
            throw new Error(
                `min node version required ${MIN_NODE_VERSION}, current ${majorNodeVersion}`,
            );
        }
    }

    async run() {
        // console.log(`${this.constructor.name}.run`);
        this.startTime = new Date();
        this.appsDirPath = path.resolve(
            this.params.appsDirPath || process.env.APPS_DIR_PATH || './apps',
        );
        this.distDirPath = this.params.distDirPath || this.appsDirPath;
        this.runtimeDirPath = path.resolve(this.params.runtimeDirPath || './runtime');
        this.logErrorUrl = this.params.logErrorUrl || null;
        const handleException = this.params.handleException || true;
        const host = this.params.host || process.env.LISTEN_HOST || 'localhost';
        const port = this.params.port || process.env.LISTEN_PORT || 3000;
        const { log } = this.params;

        if (!fs.existsSync(this.appsDirPath)) {
            console.error(colors.red(`Application folder '${this.appsDirPath}' doesn't exist`));
            process.exit(1);
            return;
        }

        // path
        const backendDirPath = __dirname;
        this.frontendDirPath = path.resolve(path.join(backendDirPath, '../frontend'));
        this.sessionDirPath = path.join(this.runtimeDirPath, 'session');

        // runtime & temp
        Helper.createDirIfNotExistsSync(this.runtimeDirPath);
        Helper.createDirIfNotExistsSync(this.sessionDirPath);

        // logPool
        if (log) {
            this.logPool = BkPostgreSqlDatabase.createPool(log);
        }

        // express server
        this.express = express();
        this.express.set('handleException', handleException);
        this.express.set('view engine', 'ejs');
        this.express.set('views', backendDirPath);
        this.express.enable('strict routing');

        this.initExpressServer();

        // indexModule
        this.indexModule = new IndexModule(this);
        await this.indexModule.init();

        // monitorModule
        this.monitorModule = new MonitorModule(this);
        await this.monitorModule.init();

        // viewerModule
        this.viewerModule = new ViewerModule(this);
        await this.viewerModule.init();

        // editorModule
        this.editorModule = new EditorModule(this);
        await this.editorModule.init();

        // http
        this.httpServer = await this.createAndRunHttpServer(host, port);

        this.httpServer.on('error', this.onHttpServerError.bind(this));

        if (process.send) {
            process.send('online');
        }
        let msg = `QForms server v${pkg.version} listening on http://${host}:${port}${
            this.isDevelopment() ? '/index2' : ''
        }\n`;
        msg += `\tprocess.env.NODE_ENV: ${process.env.NODE_ENV}\n`;
        msg += `\tappsDirPath: ${this.appsDirPath}\n`;
        msg += `\tdistDirPath: ${this.distDirPath}\n`;

        if (this.isDevelopment()) {
            msg += `\tmonitor: http://${host}:${port}/monitor\n`;
        }
        msg += `\tstarted at: ${new Date().toISOString()}\n`;
        console.log(msg);

        // ws
        this.wsServer = new WebSocketServer({
            hostApp: this,
            httpServer: this.httpServer,
        });
        this.initProcess();
    }

    initProcess() {
        process.on('message', this.onProcessMessage.bind(this));
        process.on('SIGINT', this.onProcessSIGINT.bind(this));
        process.on('SIGTERM', this.onProcessSIGTERM.bind(this));
        process.on('exit', this.onProcessExit.bind(this));
        process.on('unhandledRejection', this.onUnhandledRejection.bind(this));
    }

    getSecretSync() {
        const secretFilePath = path.join(this.runtimeDirPath, 'secret.txt');
        let secret;
        secret = Helper.getFileContentSync(secretFilePath);
        if (secret) {
            return secret;
        }
        secret = Helper.getRandomString(20);
        Helper.writeFileSync(secretFilePath, secret);
        return secret;
    }

    initExpressServer() {
        // middlewares
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
                secret: this.getSecretSync(),
                // @ts-ignore
                key: 'sid',
                resave: false,
                saveUninitialized: false,
            }),
        );

        // test
        // this.express.get( '/test', this._getTest.bind(this));
        // this.express.post('/test', this._postTest.bind(this));

        // error logger
        this.express.options('/error', (req, res, next) => {
            console.log('options /error');
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length');
            res.end();
        });
        this.express.post('/error', this.postError.bind(this));

        // index module
        if (this.isDevelopment()) {
            // google chrome always redirect from /index to /index/ even with disabled cache
            // so we use /index2
            this.express.get('/index2', this.indexGet.bind(this));
            this.express.post('/index2', this.indexPost.bind(this));
        }

        // monitor module
        this.express.get('/monitor', this.monitorGet.bind(this));

        // viewer/editor module
        this.express.get(
            '/:module/:appDirName/:appFileName/:env/:domain/',
            this.moduleGet.bind(this),
        );
        this.express.post(
            '/:module/:appDirName/:appFileName/:env/:domain/',
            this.modulePost.bind(this),
        );
        this.express.get(
            '/:module/:appDirName/:appFileName/:env/:domain/*',
            this.moduleGetFile.bind(this),
        );

        // handle static for index and monitor
        this.express.use(express.static(this.frontendDirPath));

        this.initCustomRoutes();

        // 404 and 500 error handlers
        this.express.use(this._e404.bind(this));
        this.express.use(this._e500.bind(this));
    }

    async createApplicationIfNotExists(context: Context) {
        // console.log(`BackHostApp.createApplicationIfNotExists debug: ${context.query.debug}, env: ${context.getEnv()}`);
        const application = this.applications[context.getRoute()];
        if (application) {
            /*if (req.method === 'GET' && (context.query.debug === '1' || context.getModule() === 'edit')) {
                await application.deinit();
                return this.applications[route] = await this.createApplication(context);
            }*/
            return application;
        }

        // if creating application
        if (Array.isArray(this.appQueue[context.getRoute()])) {
            console.log('application is creating:', context.getRoute());
            const promise = Helper.createEmptyPromise();
            this.appQueue[context.getRoute()].push(promise);
            return promise;
        }

        this.appQueue[context.getRoute()] = [];
        const app = (this.applications[context.getRoute()] = await this.createApplication(context));
        console.log(
            'application created, start resolve loop',
            context.getRoute(),
            this.appQueue[context.getRoute()].length,
        );
        for (const p of this.appQueue[context.getRoute()]) {
            // @ts-ignore
            p.resolve(app);
        }
        this.appQueue[context.getRoute()] = null;

        return app;
    }

    getApplication(context: Context): BkApplication {
        const application = this.applications[context.getRoute()];
        if (!application) throw new Error(`no application for route: ${context.getRoute()}`);
        return application;
    }

    getApplicationByRoute(route: string): BkApplication {
        return this.applications[route];
    }

    getAppFilePath(context: Context) {
        return path.join(
            this.appsDirPath,
            context.getAppDirName(),
            context.getAppFileName() + '.json',
        );
    }

    async createApplication(context: Context): Promise<BkApplication> {
        console.log(`BackHostApp.createApplication: ${context.getRoute()}`);
        const appInfo = await BkApplication.loadAppInfo(this.getAppFilePath(context), this);

        // ApplicationClass
        const ApplicationClass = this.getApplicationClass(appInfo);

        // application
        const application = new ApplicationClass(appInfo.appFile.data, appInfo, this, context);
        await application.init(context);
        return application;
    }

    getApplicationClass(appInfo: AppInfo): any {
        // console.log('BackHostApp.getApplicationClass', appInfo);
        const modelClass = BaseModel.getAttr(appInfo.appFile.data, 'modelClass');
        if (modelClass) {
            const CustomClass = global[modelClass];
            if (!CustomClass) throw new Error(`no class ${modelClass}`);
            return CustomClass;
        }
        return BkApplication;
    }

    async createApp(req) {
        console.log('createApp');
        if (!req.body.folder) throw new Error('folder required: ' + req.body.folder);
        if (!req.body.name) throw new Error('name required: ' + req.body.name);
        const folder = req.body.folder;
        const name = req.body.name;
        const appDirPath = path.join(this.appsDirPath, folder);
        const appFilePath = path.join(appDirPath, name + '.json');
        await Helper.createDirIfNotExists(appDirPath);
        await ApplicationEditor.createAppFile(appFilePath, { name });
        const appInfos = await BkApplication.getAppInfos(this.appsDirPath, this);
        return appInfos;
    }

    async logError(err: Error, req: Request | null = null) {
        console.log('BackHostApp.logError:', colors.red(err.message));
        try {
            const route = err instanceof MyError && err.context ? err.context.getRoute() : null;
            const data = req
                ? {
                      headers: req.headers,
                      method: req.method,
                      host: req.headers.host,
                      originalUrl: req.originalUrl,
                      uri: req.params['0'],
                      platformVersion: pkg.version,
                      appVersion: route ? this.applications[route].getVersion() : null,
                      route: route,
                      body: req.body,
                      status: err instanceof MyError ? err.status || null : null,
                      data: err instanceof MyError ? err.data || null : null,
                  }
                : null;

            if (this.logPool) {
                await BackHostApp.createLog(this.logPool, {
                    type: 'error',
                    source: 'server',
                    ip: req ? req.headers['x-forwarded-for'] || req.connection.remoteAddress : null,
                    message: err.message,
                    stack: err.stack?.toString(),
                    data: data ? JSON.stringify(data, null, 4) : null,
                });
            } else if (this.logErrorUrl) {
                console.log(`fetch ${this.logErrorUrl}`);
                await fetch(this.logErrorUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        type: 'error',
                        source: 'server',
                        ip: req
                            ? req.headers['x-forwarded-for'] || req.connection.remoteAddress
                            : null,
                        message: err.message,
                        stack: err.stack?.toString(),
                        data: data,
                    }),
                });
            }
        } catch (err) {
            console.error(colors.red(err));
        }
    }

    async logRequest(req, context: Context, time) {
        if (!this.logPool) return;
        try {
            const application = this.getApplication(context);
            let args = '';
            if (req.body.params) {
                args = Object.keys(req.body.params)
                    .map((name) => `${name}: ${req.body.params[name]}`)
                    .join(', ');
            } else if (req.body.row) {
                args = Object.keys(req.body.row)
                    .map((name) => `${name}: ${req.body.row[name]}`)
                    .join(', ');
            }
            let message = [
                application.getName(),
                ...(req.body.page ? [req.body.page] : []),
                ...(req.body.form ? [req.body.form] : []),
                ...(req.body.ds ? [req.body.ds] : []),
                `${req.body.action}(${args})`,
            ].join('.');
            if (time) {
                message += `, time: ${time}`;
            }
            await BackHostApp.createLog(this.logPool, {
                type: 'log',
                source: 'server',
                ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                message: message,
                data: JSON.stringify(req.body, null, 4),
            });
        } catch (err) {
            console.error(colors.red(err));
        }
    }

    async logEvent(context: Context, message: string, data = null): Promise<void> {
        console.log('BackHostApp.logEvent', message);
        try {
            await this.createLog2({
                type: 'log',
                source: 'server',
                ip: context.getIp(),
                message: message,
                data: data,
            });
        } catch (err) {
            console.error(colors.red(err));
        }
    }

    static async createLog(cnn, values) {
        // console.log('BackHostApp.createLog', values);
        if (values.stack === undefined) values.stack = null;
        if (values.created === undefined) values.created = new Date();
        if (values.message && values.message.length > 255) {
            // throw new Error(`message to long: ${values.message.length}`);
            values.message = values.message.substr(0, 255);
        }
        await BkPostgreSqlDatabase.queryResult(
            cnn,
            'insert into log(created, type, source, ip, message, stack, data) values ({created}, {type}, {source}, {ip}, {message}, {stack}, {data})',
            values,
        );
    }

    async createLog2(values) {
        if (this.logPool) {
            await BackHostApp.createLog(this.logPool, {
                type: values.type,
                source: values.source,
                ip: values.ip,
                message: values.message,
                data: values.data ? JSON.stringify(values.data) : null,
            });
        } else if (this.logErrorUrl) {
            console.log(`fetch ${this.logErrorUrl}`);
            await fetch(this.logErrorUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: values.type,
                    source: values.source,
                    ip: values.ip,
                    message: values.message,
                    data: values.data,
                }),
            });
        }
    }

    async moduleGet(req: Request, res: Response, next) {
        // @ts-ignore
        console.log(colors.magenta.underline('BackHostApp.moduleGet'), req.params);
        let context: Context | null = null;
        try {
            if (req.params.module === 'viewer') {
                context = new Context({
                    req,
                    res,
                    domain: this.getDomainFromRequest(req),
                });
                const application = await this.createApplicationIfNotExists(context);
                context.setVersionHeaders(pkg.version, application.getVersion());
                if (application.isAvailable()) {
                    await this.viewerModule.handleViewerGet(context, application);
                } else {
                    next();
                }
            } else if (req.params.module === 'editor') {
                if (this.isDevelopment()) {
                    context = new Context({
                        req,
                        res,
                        domain: this.getDomainFromRequest(req),
                    });
                    await this.editorModule.handleEditorGet(req, res, context);
                } else {
                    next();
                }
            } else {
                next();
            }
        } catch (err) {
            next(err);
        } finally {
            if (context) {
                context.destroy();
            }
        }
    }

    async indexGet(req: Request, res: Response, next) {
        console.log(colors.magenta('indexGet'));
        try {
            const html = await this.indexModule.render();
            res.end(html);
        } catch (err) {
            next(err);
        }
    }

    async indexPost(req, res, next) {
        console.log(colors.magenta('indexPost'), req.params);
        try {
            const appInfos = await this.createApp(req);
            await res.json({
                appInfos: appInfos.map((appInfo) => ({
                    fullName: appInfo.fullName,
                    envs: appInfo.envs,
                })),
            });
        } catch (err) {
            next(err);
        }
    }

    async monitorGet(req, res, next) {
        console.log(colors.magenta('monitorGet'), req.headers);
        try {
            if (!this.params.monitor) {
                res.end('Please set monitor username/password in app params');
                return;
            }
            if (this.monitorModule.authorize(req)) {
                const html = this.monitorModule.render();
                res.end(html);
            } else {
                res.statusCode = 401;
                res.setHeader('WWW-Authenticate', 'Basic realm="My Realm"');
                res.end('Unauthorized');
            }
        } catch (err) {
            next(err);
        }
    }

    async modulePost(req: Request, res: Response, next) {
        // @ts-ignore
        console.log(colors.magenta.underline('BackHostApp.modulePost'), req.params, req.body);
        let context: Context | null = null;
        try {
            if (req.params.module === 'viewer') {
                context = new Context({
                    req,
                    res,
                    domain: this.getDomainFromRequest(req),
                });
                const application = await this.createApplicationIfNotExists(context);
                context.setVersionHeaders(pkg.version, application.getVersion());
                const time = await this.viewerModule.handleViewerPost(context, application);
                // await this.logRequest(req, context, time);
            } else if (req.params.module === 'editor') {
                if (this.isDevelopment()) {
                    context = new Context({
                        req,
                        res,
                        domain: this.getDomainFromRequest(req),
                    });
                    const time = await this.editorModule.handleEditorPost(req, res, context);
                    // await this.logRequest(req, context, time);
                } else {
                    next();
                }
            } else {
                next();
            }
        } catch (err) {
            next(err);
        } finally {
            if (context) {
                context.destroy();
            }
        }
    }

    async moduleGetFile(req: Request, res: Response, next) {
        if (process.env.NODE_ENV === 'development') {
            // @ts-ignore
            console.log(colors.magenta.underline('BackHostApp.moduleGetFile'), req.originalUrl);
        }
        if (req.params.module === 'viewer') {
            let context: Context | null = null;
            try {
                context = new Context({
                    req,
                    res,
                    domain: this.getDomainFromRequest(req),
                });
                const application = await this.createApplicationIfNotExists(context);
                context.setVersionHeaders(pkg.version, application.getVersion());
                await this.viewerModule.handleViewerGetFile(context, application, next);
            } catch (err) {
                err.message = `moduleGetFile error: ${err.message}`;
                next(err);
            } finally {
                if (context) {
                    context.destroy();
                }
            }
        } else {
            next();
        }
    }

    async _e404(req, res, next) {
        console.error(colors.magenta(req.method), 'error/404', req.originalUrl);
        next(
            new MyError({
                message: `${req.method} ${req.originalUrl} not found`,
                status: 404,
            }),
        );
    }

    async _e500(err, req, res, next) {
        console.log(colors.magenta('module.exports.e500:'), req.method, req.originalUrl);
        console.error(colors.red(err));
        const error = typeof err === 'string' ? new MyError({ message: err }) : err;
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
            res.render('error', {
                status: error.status,
                message:
                    this.isDevelopment() || error.status === 404
                        ? error.message
                        : 'Internal Software Error',
                stack: this.isDevelopment() && error.status !== 404 ? error.stack : null,
            });
        }
        await this.logError(error, req);
    }

    /*_getTest(req, res, next) {
        console.log('getTest');
        res.setHeader('Content-Type', 'text/plain;charset=utf-8');
        res.end('getTest');
    }*/

    /*_postTest(req, res, next) {
        console.log('postTest', req.body);
        res.json({foo: 'bar'});
    }*/

    createAndRunHttpServer(host, port): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                const httpServer = http.createServer(this.express);
                const tempErrorHandler = (err) => {
                    console.error('tempErrorHandler', err);
                    httpServer.off('error', tempErrorHandler);
                    reject(err);
                };
                httpServer.on('error', tempErrorHandler);
                httpServer.listen(port, host, () => {
                    resolve(httpServer);
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    async onProcessMessage(message) {
        console.log('BackHostApp.onProcessMessage');
        if (message === 'shutdown') {
            await this.shutdown();
            process.exit(0);
        }
    }

    async onProcessSIGINT() {
        console.log('BackHostApp.onProcessSIGINT');
        console.log('Received INT signal (Ctrl+C), shutting down gracefully...');
        await this.shutdown();
        process.exit(0);
    }

    onProcessSIGTERM() {
        console.log('BackHostApp.onProcessSIGTERM');
        console.log('Received SIGTERM (kill) signal, shutting down forcefully.');
        process.exit(1);
    }

    onProcessExit(code) {
        console.log('BackHostApp.onProcessExit', code);
        console.log('process.exit:', code);
    }

    async onUnhandledRejection(err) {
        console.error(colors.red('BackHostApp.onUnhandledRejection'), err);
        err.message = `unhandledRejection: ${err.message}`;
        await this.logError(err);
    }

    async shutdown() {
        console.log('BackHostApp.shutdown');
        const routes = Object.keys(this.applications);
        for (let i = 0; i < routes.length; i++) {
            const route = routes[i];
            console.log('route:', route);
            const application = this.applications[route];
            await application.deinit();
        }
    }

    onHttpServerError(err) {
        console.error(colors.red('BackHostApp.onHttpServerError'), err.code, err.message);
        /*if (err.code === 'EADDRINUSE') {
            console.error(`Address ${host}:${port} in use.`);
        } else {
            console.error(err);
        }*/
    }

    getDomainFromRequest(req: any): string | null {
        if (!req) throw new Error('need req param');
        const hostPort = req.headers.host;
        if (!hostPort) throw new Error('no host');
        const [host, port] = hostPort.split(':');
        const [domain] = host.split('.');
        if (!domain) throw new Error('trouble getting a domain');
        return domain;
    }

    async postError(req, res, next) {
        console.log(colors.blue('BackHostApp.postError'), req.body.message);
        if (this.logPool) {
            try {
                await BackHostApp.createLog(this.logPool, {
                    type: req.body.type,
                    source: req.body.source,
                    ip:
                        req.body.ip ||
                        req.headers['x-forwarded-for'] ||
                        req.connection.remoteAddress,
                    message: req.body.message,
                    stack: req.body.stack,
                    data: req
                        ? JSON.stringify(
                              {
                                  headers: req.headers,
                                  domain: this.getDomainFromRequest(req),
                                  ...req.body.data,
                              },
                              null,
                              4,
                          )
                        : null,
                });
                res.header('Access-Control-Allow-Origin', '*');
                res.end('ok');
            } catch (err) {
                next(err);
            }
        }
    }

    getFrontendDirPath() {
        return this.frontendDirPath;
    }
    initCustomRoutes() {}

    alias(
        method: string,
        path: string,
        [module, appDirName, appFileName, env, domain],
        cb: string,
        query?: any,
    ) {
        this.express[method](path, async (req, res, next) => {
            req.params.module = module;
            req.params.appDirName = appDirName;
            req.params.appFileName = appFileName;
            if (env) {
                req.params.env = env;
            }
            if (domain) {
                req.params.domain = domain;
            }
            if (query) {
                for (const name in query) {
                    req.query[name] = query[name] ? query[name] : req.params[name];
                }
            }
            await this[cb](req, res, next);
        });
    }

    getPostAlias(path, arr, query?) {
        this.alias('get', path, arr, 'moduleGet', query);
        this.alias('post', path, arr, 'modulePost', query);
    }

    getNodeEnv(): string | null {
        return process.env.NODE_ENV || null;
    }

    isDevelopment(): boolean {
        return this.getNodeEnv() === 'development';
    }

    isProduction(): boolean {
        return !this.isDevelopment();
    }

    getParams() {
        return this.params;
    }

    broadcastResult(sourceApplication: BkApplication, context: Context, result: Result) {
        console.log('BackHostApp.broadcastResult');
        for (const route in this.applications) {
            if (context.getRoute() === route && this.applications[route] === sourceApplication) {
                sourceApplication.broadcastDomesticResultToClients(context, result);
            } else {
                const application = this.applications[route];
                application.broadcastForeignResultToClients(context, result);
            }
        }
    }

    static test() {
        console.log('BackHostApp.test');
    }

    getDistDirPath(): string {
        return this.distDirPath;
    }
}
