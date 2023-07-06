"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackHostApp = void 0;
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const safe_1 = __importDefault(require("colors/safe"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const WebSocketServer_1 = require("./WebSocketServer");
const BkHelper_1 = require("./BkHelper");
const Context_1 = require("./Context");
const BkApplication_1 = require("./viewer/BkModel/BkApplication/BkApplication");
const MonitorModule_1 = require("./monitor/MonitorModule");
const IndexModule_1 = require("./index/IndexModule");
const HttpError_1 = require("./HttpError");
const ViewerModule_1 = require("./viewer/ViewerModule");
const EditorModule_1 = require("./editor/EditorModule");
const FileSessionStore_1 = require("./FileSessionStore");
const ApplicationEditor_1 = require("./editor/Editor/ApplicationEditor/ApplicationEditor");
const BaseModel_1 = require("./BaseModel");
const EventLog_1 = require("./EventLog");
const EmptyPromise_1 = require("./EmptyPromise");
const pkg = require('../../package.json');
const BACKEND_DIR_PATH = __dirname;
const APPS_DIR_PATH = process.env.APPS_DIR_PATH || './apps';
const LISTEN_HOST = process.env.LISTEN_HOST || 'localhost';
const LISTEN_PORT = (process.env.LISTEN_PORT && parseInt(process.env.LISTEN_PORT)) || 7000;
const QFORMS_LOG_LEVEL = process.env.QFORMS_LOG_LEVEL || (process.env.NODE_ENV === 'development' ? 'debug' : 'log');
class BackHostApp {
    constructor(params = {}) {
        this.params = params;
        this.applications = {};
        this.createAppQueue = {};
        // console.debug('BackHostApp.constructor');
        this.startTime = new Date();
    }
    async run() {
        // console.debug(`${this.constructor.name}.run`);
        this.initConsole();
        this.initDirPaths();
        this.checkNodeVersion();
        this.checkApplicationFolder();
        this.createDirsIfNotExistsSync();
        this.createEventLog();
        this.initExpressServer();
        await this.initModules();
        await this.initHttpServer();
        this.initWebSocketServer();
        this.listenProcessEvents();
        console.log(this.composeStartMessage(this.getHost(), this.getPort()));
    }
    getHost() {
        return this.params.host || LISTEN_HOST;
    }
    getPort() {
        return this.params.port || LISTEN_PORT;
    }
    initConsole() {
        const levels = ['debug', 'log', 'warn', 'error'];
        const level = levels.indexOf(QFORMS_LOG_LEVEL);
        if (level > levels.indexOf('debug'))
            console.debug = () => { };
        if (level > levels.indexOf('log'))
            console.log = () => { };
        if (level > levels.indexOf('warn'))
            console.warn = () => { };
    }
    async initHttpServer() {
        this.httpServer = await this.createAndRunHttpServer(this.getHost(), this.getPort());
        this.httpServer.on('error', this.onHttpServerError.bind(this));
    }
    checkNodeVersion() {
        const [majorNodeVersion] = process.versions.node.split('.');
        // console.debug('majorNodeVersion', majorNodeVersion, typeof majorNodeVersion);
        const MIN_NODE_VERSION = 14;
        if (parseInt(majorNodeVersion) < MIN_NODE_VERSION) {
            throw new Error(`min node version required ${MIN_NODE_VERSION}, current ${majorNodeVersion}`);
        }
    }
    checkApplicationFolder() {
        if (!fs_1.default.existsSync(this.appsDirPath)) {
            throw new Error(`Application folder '${this.appsDirPath}' doesn't exist`);
        }
    }
    createDirsIfNotExistsSync() {
        BkHelper_1.BkHelper.createDirIfNotExistsSync(this.runtimeDirPath);
        BkHelper_1.BkHelper.createDirIfNotExistsSync(this.sessionDirPath);
    }
    createEventLog() {
        this.eventLog = new EventLog_1.EventLog(this.params.logger);
    }
    async initModules() {
        // indexModule
        this.indexModule = new IndexModule_1.IndexModule(this);
        await this.indexModule.init();
        // monitorModule
        this.monitorModule = new MonitorModule_1.MonitorModule(this);
        await this.monitorModule.init();
        // viewerModule
        this.viewerModule = new ViewerModule_1.ViewerModule(this);
        await this.viewerModule.init();
        // editorModule
        this.editorModule = new EditorModule_1.EditorModule(this);
        await this.editorModule.init();
    }
    initWebSocketServer() {
        this.wsServer = new WebSocketServer_1.WebSocketServer({
            hostApp: this,
            httpServer: this.httpServer,
        });
    }
    initDirPaths() {
        this.appsDirPath = path_1.default.resolve(this.params.appsDirPath || APPS_DIR_PATH);
        this.distDirPath = this.params.distDirPath || this.appsDirPath;
        this.runtimeDirPath = path_1.default.resolve(this.params.runtimeDirPath || './runtime');
        this.frontendDirPath = path_1.default.resolve(path_1.default.join(BACKEND_DIR_PATH, '../frontend'));
        this.sessionDirPath = path_1.default.join(this.runtimeDirPath, 'session');
    }
    composeStartMessage(host, port) {
        let message = '\n';
        message += `NODE_ENV=${process.env.NODE_ENV}\n`;
        message += `QFORMS_LOG_LEVEL=${QFORMS_LOG_LEVEL}\n`;
        message += '\n';
        message += `QForms server v${pkg.version} listening on http://${host}:${port}${this.isDevelopment() ? '/index2' : ''}\n`;
        message += `\tcwd: ${process.cwd()}\n`;
        message += `\tappsDirPath: ${this.appsDirPath}\n`;
        message += `\tdistDirPath: ${this.distDirPath}\n`;
        if (this.isDevelopment()) {
            message += `\tmonitor: http://${host}:${port}/monitor\n`;
        }
        message += `\tstarted at: ${new Date().toISOString()}\n`;
        return message;
    }
    listenProcessEvents() {
        process.on('message', this.onProcessMessage.bind(this));
        process.on('SIGINT', this.onProcessSIGINT.bind(this));
        process.on('SIGTERM', this.onProcessSIGTERM.bind(this));
        process.on('exit', this.onProcessExit.bind(this));
        process.on('uncaughtException', this.onUncaughtException.bind(this));
        process.on('unhandledRejection', this.onUnhandledRejection.bind(this));
    }
    getSecretSync() {
        const secretFilePath = path_1.default.join(this.runtimeDirPath, 'secret.txt');
        let secret;
        secret = BkHelper_1.BkHelper.getFileContentSync(secretFilePath);
        if (secret) {
            return secret;
        }
        secret = BkHelper_1.BkHelper.getRandomString(20);
        BkHelper_1.BkHelper.writeFileSync(secretFilePath, secret);
        return secret;
    }
    initExpressServer() {
        // create
        this.express = (0, express_1.default)();
        // init
        this.express.set('handleException', this.params.handleException || true);
        // this.express.set('view engine', 'ejs');
        // this.express.set('views', backendDirPath);
        this.express.enable('strict routing');
        // middlewares
        this.express.use(body_parser_1.default.json({
            limit: '20mb',
            reviver: BkHelper_1.BkHelper.dateTimeReviver,
        }));
        this.express.use(body_parser_1.default.urlencoded({ extended: false }));
        this.express.use((0, cookie_parser_1.default)());
        this.express.use((0, express_session_1.default)({
            store: new FileSessionStore_1.FileSessionStore(this.sessionDirPath),
            secret: this.getSecretSync(),
            // @ts-ignore
            key: 'sid',
            resave: false,
            saveUninitialized: false,
        }));
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
        this.express.get('/:module/:appDirName/:appFileName/:env/:domain/', this.moduleGet.bind(this));
        this.express.post('/:module/:appDirName/:appFileName/:env/:domain/', this.modulePost.bind(this));
        this.express.get('/:module/:appDirName/:appFileName/:env/:domain/*', this.moduleGetFile.bind(this));
        // handle static for index and monitor
        this.express.use(express_1.default.static(this.frontendDirPath));
        this.initCustomRoutes();
        // 404 and 500 error handlers
        this.express.use(this._e404.bind(this));
        this.express.use(this._e500.bind(this));
    }
    async createApplicationIfNotExists(context) {
        // console.debug(`BackHostApp.createApplicationIfNotExists debug: ${context.query.debug}, env: ${context.getEnv()}`);
        const application = this.applications[context.getRoute()];
        if (application) {
            /* if (req.method === 'GET' && (context.query.debug === '1' || context.getModule() === 'edit')) {
                await application.deinit();
                return this.applications[route] = await this.createApplication(context);
            } */
            return application;
        }
        // if creating application
        if (Array.isArray(this.createAppQueue[context.getRoute()])) {
            console.debug('application is creating:', context.getRoute());
            const promise = EmptyPromise_1.EmptyPromise.create();
            this.createAppQueue[context.getRoute()].push(promise);
            return promise;
        }
        this.createAppQueue[context.getRoute()] = [];
        try {
            const app = (this.applications[context.getRoute()] = await this.createApplication(context));
            console.debug('application created, start resolve loop', context.getRoute(), this.createAppQueue[context.getRoute()].length);
            for (const p of this.createAppQueue[context.getRoute()]) {
                p.resolve(app);
            }
            return app;
        }
        catch (err) {
            console.error('application not created, start reject loop', context.getRoute(), this.createAppQueue[context.getRoute()].length);
            for (const p of this.createAppQueue[context.getRoute()]) {
                p.reject(err);
            }
            throw err;
        }
        finally {
            this.createAppQueue[context.getRoute()] = null;
        }
    }
    getApplication(context) {
        const application = this.applications[context.getRoute()];
        if (!application)
            throw new Error(`no application for route: ${context.getRoute()}`);
        return application;
    }
    getApplicationByRoute(route) {
        return this.applications[route];
    }
    getAppFilePath(context) {
        return path_1.default.join(this.appsDirPath, context.getAppDirName(), context.getAppFileName() + '.json');
    }
    async createApplication(context) {
        console.debug(`BackHostApp.createApplication: ${context.getRoute()}`);
        const appFilePath = this.getAppFilePath(context);
        const distDirPath = this.makeDistDirPathForApp(appFilePath);
        const appInfo = await BkApplication_1.BkApplication.loadAppInfo(appFilePath, distDirPath);
        // ApplicationClass
        const ApplicationClass = this.getApplicationClass(appInfo);
        // application
        const application = new ApplicationClass(appInfo, this, context.getEnv());
        await application.init(context);
        return application;
    }
    getApplicationClass(appInfo) {
        // console.debug('BackHostApp.getApplicationClass', appInfo);
        const modelClass = BaseModel_1.BaseModel.getAttr(appInfo.appFile.data, 'modelClass');
        if (modelClass) {
            const CustomClass = global[modelClass];
            if (!CustomClass)
                throw new Error(`no class ${modelClass}`);
            return CustomClass;
        }
        return BkApplication_1.BkApplication;
    }
    async createApp(req) {
        console.debug('BackHostApp.createApp');
        if (!req.body.folder)
            throw new Error('folder required: ' + req.body.folder);
        if (!req.body.name)
            throw new Error('name required: ' + req.body.name);
        const folder = req.body.folder;
        const name = req.body.name;
        const appDirPath = path_1.default.join(this.appsDirPath, folder);
        const appFilePath = path_1.default.join(appDirPath, name + '.json');
        await BkHelper_1.BkHelper.createDirIfNotExists(appDirPath);
        await ApplicationEditor_1.ApplicationEditor.createAppFile(appFilePath, { name });
        const distDirPath = this.makeDistDirPathForApp(appFilePath);
        const appInfos = await BkApplication_1.BkApplication.getAppInfos(this.appsDirPath, distDirPath);
        return appInfos;
    }
    composeContextData(err, req) {
        const route = err instanceof HttpError_1.HttpError && err.context ? err.context.getRoute() : null;
        return {
            headers: req.headers,
            method: req.method,
            host: req.headers.host,
            originalUrl: req.originalUrl,
            uri: req.params['0'],
            platformVersion: pkg.version,
            appVersion: route ? this.applications[route].getVersion() : null,
            route: route,
            body: req.body,
            status: err instanceof HttpError_1.HttpError ? err.status || null : null,
            data: err instanceof HttpError_1.HttpError ? err.data || null : null,
        };
    }
    async logError(err, req) {
        console.log('BackHostApp.logError:', safe_1.default.red(err.message));
        try {
            await this.eventLog.log({
                type: 'error',
                source: 'server',
                message: err.message,
                stack: err.stack,
                data: req && JSON.stringify(this.composeContextData(err, req), null, 4),
                ip: req && Context_1.Context.getIpFromReq(req),
            });
        }
        catch (err) {
            console.error(safe_1.default.red(err));
        }
    }
    /* async logRequest(req: Request, context: Context, time) {
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
            await this.logger.createLog({
                type: 'log',
                source: 'server',
                ip: Context.getIpFromReq(req),
                message: message,
                data: JSON.stringify(req.body, null, 4),
            });
        } catch (err) {
            console.error(colors.red(err));
        }
    } */
    async logEvent(context, message, data) {
        console.log('BackHostApp.logEvent', message);
        try {
            await this.eventLog.log({
                type: 'log',
                source: 'server',
                message: message,
                data: data && JSON.stringify(data, null, 4),
                ip: context.getIp(),
            });
        }
        catch (err) {
            console.error(safe_1.default.red(err));
        }
    }
    async indexGet(req, res, next) {
        console.log(safe_1.default.magenta('indexGet'));
        try {
            const html = await this.indexModule.render();
            res.end(html);
        }
        catch (err) {
            next(err);
        }
    }
    async indexPost(req, res, next) {
        console.log(safe_1.default.magenta('indexPost'), req.params);
        try {
            const appInfos = await this.createApp(req);
            res.json({
                appInfos: appInfos.map((appInfo) => ({
                    fullName: appInfo.fullName,
                    envs: appInfo.envs,
                })),
            });
        }
        catch (err) {
            next(err);
        }
    }
    async monitorGet(req, res, next) {
        console.log(safe_1.default.magenta('monitorGet'), req.headers);
        try {
            if (!this.params.monitor) {
                res.end('Please set monitor username/password in app params');
                return;
            }
            if (this.monitorModule.authorize(req)) {
                const html = this.monitorModule.render();
                res.end(html);
            }
            else {
                res.statusCode = 401;
                res.setHeader('WWW-Authenticate', 'Basic realm="My Realm"');
                res.end('Unauthorized');
            }
        }
        catch (err) {
            next(err);
        }
    }
    async moduleGet(req, res, next) {
        // @ts-ignore
        // console.debug(colors.magenta.underline('BackHostApp.moduleGet'), req.params);
        // log request
        console.log(
        // @ts-ignore
        safe_1.default.magenta.underline('GET'), `${req.params.module}/${req.params.appDirName}/${req.params.appFileName}/${req.params.env}/${req.params.domain}`);
        let context = null;
        try {
            if (req.params.module === 'viewer') {
                context = new Context_1.Context({
                    req,
                    res,
                    domain: this.getDomainFromRequest(req),
                });
                const application = await this.createApplicationIfNotExists(context);
                if (application.isAvailable()) {
                    await this.viewerModule.handleGet(context, application);
                }
                else {
                    next();
                }
            }
            else if (req.params.module === 'editor' && this.isDevelopment()) {
                context = new Context_1.Context({
                    req,
                    res,
                    domain: this.getDomainFromRequest(req),
                });
                await this.editorModule.handleEditorGet(req, res, context);
            }
            else {
                next();
            }
        }
        catch (err) {
            next(err);
        }
        finally {
            if (context) {
                context.destroy();
            }
        }
    }
    async modulePost(req, res, next) {
        // @ts-ignore
        console.debug(safe_1.default.magenta.underline('BackHostApp.modulePost'), req.params, req.body);
        // log request
        console.log(
        // @ts-ignore
        safe_1.default.magenta.underline('POST'), `${req.params.module}/${req.params.appDirName}/${req.params.appFileName}/${req.params.env}/${req.params.domain}`, `${req.body.page}.${req.body.form}.${req.body.ds}.${req.body.action}`);
        let context = null;
        try {
            if (req.params.module === 'viewer') {
                context = new Context_1.Context({
                    req,
                    res,
                    domain: this.getDomainFromRequest(req),
                });
                const application = await this.createApplicationIfNotExists(context);
                await this.viewerModule.handlePost(context, application);
                // await this.logRequest(req, context, time);
            }
            else if (req.params.module === 'editor') {
                if (this.isDevelopment()) {
                    context = new Context_1.Context({
                        req,
                        res,
                        domain: this.getDomainFromRequest(req),
                    });
                    const time = await this.editorModule.handleEditorPost(req, res, context);
                    // await this.logRequest(req, context, time);
                }
                else {
                    next();
                }
            }
            else {
                next();
            }
        }
        catch (err) {
            next(err);
        }
        finally {
            if (context) {
                context.destroy();
            }
        }
    }
    async moduleGetFile(req, res, next) {
        // @ts-ignore
        console.debug(safe_1.default.magenta.underline('BackHostApp.moduleGetFile'), req.originalUrl);
        // @ts-ignore
        console.log(safe_1.default.magenta.underline('GET'), req.originalUrl);
        if (req.params.module === 'viewer') {
            let context = null;
            try {
                context = new Context_1.Context({
                    req,
                    res,
                    domain: this.getDomainFromRequest(req),
                });
                const application = await this.createApplicationIfNotExists(context);
                await this.viewerModule.handleGetFile(context, application, next);
            }
            catch (err) {
                err.message = `moduleGetFile error: ${err.message}`;
                next(err);
            }
            finally {
                if (context) {
                    context.destroy();
                }
            }
        }
        else {
            next();
        }
    }
    async _e404(req, res, next) {
        console.error(safe_1.default.magenta(req.method), 'error/404', req.originalUrl);
        next(new HttpError_1.HttpError({
            message: `${req.method} ${req.originalUrl} not found`,
            status: 404,
        }));
    }
    async _e500(err, req, res, next) {
        console.error(safe_1.default.magenta('module.exports.e500:'), req.method, req.originalUrl);
        console.error(safe_1.default.red(err));
        const error = typeof err === 'string' ? new HttpError_1.HttpError({ message: err }) : err;
        res.status(error.status || 500);
        if (req.headers['content-type'] &&
            req.headers['content-type'].indexOf('application/json') !== -1) {
            res.end(this.isDevelopment() || error.status === 404
                ? error.message
                : 'Internal Software Error');
        }
        else {
            const status = error.status || 500;
            const message = this.isDevelopment() || error.status === 404
                ? error.message
                : 'Internal Software Error';
            const stack = this.isDevelopment() && error.status !== 404 ? error.stack : '';
            res.end(`<!DOCTYPE html>
<html>
<title>${status} ${message}</title>
<body>
    <h1>${message}</h1>
    <h2>${status}</h2>
    <pre>${stack}</pre>
</body>
</html>`);
        }
        await this.logError(error, req);
    }
    /* _getTest(req, res, next) {
        console.debug('getTest');
        res.setHeader('Content-Type', 'text/plain;charset=utf-8');
        res.end('getTest');
    } */
    /* _postTest(req, res, next) {
        console.debug('postTest', req.body);
        res.json({foo: 'bar'});
    } */
    createAndRunHttpServer(host, port) {
        return new Promise((resolve, reject) => {
            try {
                const httpServer = http_1.default.createServer(this.express);
                const tempErrorHandler = (err) => {
                    console.error('tempErrorHandler', err);
                    httpServer.off('error', tempErrorHandler);
                    reject(err);
                };
                httpServer.on('error', tempErrorHandler);
                httpServer.listen(port, host, () => {
                    resolve(httpServer);
                });
            }
            catch (err) {
                reject(err);
            }
        });
    }
    async onProcessMessage(message) {
        console.log('BackHostApp.onProcessMessage');
        if (message === 'shutdown') {
            try {
                await this.shutdown();
            }
            catch (err) {
                console.error('shutdown error:', err.message);
            }
            process.exit(0);
        }
    }
    async onProcessSIGINT() {
        console.debug('BackHostApp.onProcessSIGINT');
        console.log('Received INT signal (Ctrl+C), shutting down gracefully...');
        try {
            await this.shutdown();
            process.exit(0);
        }
        catch (err) {
            console.error('shutdown error:', err.message);
            process.exit(1);
        }
    }
    async onProcessSIGTERM() {
        console.debug('BackHostApp.onProcessSIGTERM');
        console.log('Received SIGTERM (kill) signal, shutting down forcefully.');
        try {
            await this.shutdown();
            process.exit(0);
        }
        catch (err) {
            console.error('shutdown error:', err.message);
            process.exit(1);
        }
    }
    onProcessExit(code) {
        console.log('BackHostApp.onProcessExit:', code);
    }
    async onUncaughtException(err, origin) {
        console.error(safe_1.default.red('BackHostApp.onUncaughtException'), err);
        err.message = `uncaughtException: ${err.message}`;
        await this.logError(err);
    }
    async onUnhandledRejection(reason, promise) {
        console.error(safe_1.default.red('BackHostApp.onUnhandledRejection'), reason);
        reason.message = `unhandledRejection: ${reason.message}`;
        await this.logError(reason);
    }
    async shutdown() {
        console.debug('BackHostApp.shutdown');
        const routes = Object.keys(this.applications);
        for (let i = 0; i < routes.length; i++) {
            const route = routes[i];
            // console.debug('route:', route);
            const application = this.applications[route];
            await application.deinit();
        }
    }
    onHttpServerError(err) {
        console.error(safe_1.default.red('BackHostApp.onHttpServerError'), err.code, err.message);
        /* if (err.code === 'EADDRINUSE') {
            console.error(`Address ${host}:${port} in use.`);
        } else {
            console.error(err);
        } */
    }
    getDomainFromRequest(req) {
        if (!req)
            throw new Error('need req param');
        const hostPort = req.headers.host;
        if (!hostPort)
            throw new Error('no host');
        const [host, port] = hostPort.split(':');
        const [domain] = host.split('.');
        if (!domain)
            throw new Error('trouble getting a domain');
        return domain;
    }
    async postError(req, res, next) {
        console.log(safe_1.default.blue('BackHostApp.postError'), req.body.message);
        try {
            const data = JSON.stringify({
                headers: req.headers,
                domain: this.getDomainFromRequest(req),
            }, null, 4);
            await this.eventLog.log({
                type: req.body.type,
                source: req.body.source,
                message: req.body.message,
                stack: req.body.stack,
                data: `${req.body.data}\n${data}`,
                ip: req.body.ip || Context_1.Context.getIpFromReq(req),
            });
            res.header('Access-Control-Allow-Origin', '*');
            res.end('ok');
        }
        catch (err) {
            next(err);
        }
    }
    getFrontendDirPath() {
        return this.frontendDirPath;
    }
    initCustomRoutes() { }
    alias(method, path, [module, appDirName, appFileName, env, domain], cb, query) {
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
                    // @ts-ignore
                    req.query[name] = query[name] ? query[name] : req.params[name];
                }
            }
            // @ts-ignore
            await this[cb](req, res, next);
        });
    }
    getPostAlias(path, route, query) {
        this.alias('get', path, route, 'moduleGet', query);
        this.alias('post', path, route, 'modulePost', query);
    }
    getNodeEnv() {
        return process.env.NODE_ENV || null;
    }
    isDevelopment() {
        return this.getNodeEnv() === 'development';
    }
    isProduction() {
        return !this.isDevelopment();
    }
    getParams() {
        return this.params;
    }
    broadcastResult(sourceApplication, context, result) {
        console.debug('BackHostApp.broadcastResult');
        for (const route in this.applications) {
            if (context.getRoute() === route && this.applications[route] === sourceApplication) {
                sourceApplication.broadcastDomesticResultToClients(context, result);
            }
            else {
                const application = this.applications[route];
                application.broadcastForeignResultToClients(context, result);
            }
        }
    }
    static test() {
        console.debug('BackHostApp.test');
    }
    getDistDirPath() {
        return this.distDirPath;
    }
    makeDistDirPathForApp(appFilePath) {
        const dirName = path_1.default.basename(path_1.default.dirname(appFilePath));
        const distDirPath = path_1.default.join(this.getDistDirPath(), dirName);
        return distDirPath;
    }
    getLogger() {
        return this.eventLog;
    }
    getFrontLogUrl() {
        return this.params.frontLogUrl;
    }
}
exports.BackHostApp = BackHostApp;
