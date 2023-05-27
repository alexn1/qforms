"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackHostApp = void 0;
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const safe_1 = __importDefault(require("colors/safe"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const WebSocketServer_1 = require("./WebSocketServer");
const BkHelper_1 = require("./BkHelper");
const BkPostgreSqlDatabase_1 = require("./viewer/BkModel/BkDatabase/BkSqlDatabase/BkPostgreSqlDatabase/BkPostgreSqlDatabase");
const Context_1 = require("./Context");
const BkApplication_1 = require("./viewer/BkModel/BkApplication/BkApplication");
const MonitorModule_1 = require("./monitor/MonitorModule");
const IndexModule_1 = require("./index/IndexModule");
const MyError_1 = require("./MyError");
const ViewerModule_1 = require("./viewer/ViewerModule");
const EditorModule_1 = require("./editor/EditorModule");
const FileSessionStore_1 = require("./FileSessionStore");
const ApplicationEditor_1 = require("./editor/Editor/ApplicationEditor/ApplicationEditor");
const BaseModel_1 = require("./BaseModel");
const Logger_1 = require("./Logger");
const pkg = require('../../package.json');
class BackHostApp {
    constructor(params = {}) {
        this.params = params;
        this.applications = {}; // application by route
        this.createAppQueue = {};
        // console.log('BackHostApp.constructor');
        this.checkVersion();
    }
    checkVersion() {
        const [majorNodeVersion] = process.versions.node.split('.');
        // console.log('majorNodeVersion', majorNodeVersion, typeof majorNodeVersion);
        const MIN_NODE_VERSION = 14;
        if (parseInt(majorNodeVersion) < MIN_NODE_VERSION) {
            throw new Error(`min node version required ${MIN_NODE_VERSION}, current ${majorNodeVersion}`);
        }
    }
    async run() {
        // console.log(`${this.constructor.name}.run`);
        this.startTime = new Date();
        this.appsDirPath = path_1.default.resolve(this.params.appsDirPath || process.env.APPS_DIR_PATH || './apps');
        this.distDirPath = this.params.distDirPath || this.appsDirPath;
        this.runtimeDirPath = path_1.default.resolve(this.params.runtimeDirPath || './runtime');
        const handleException = this.params.handleException || true;
        const host = this.params.host || process.env.LISTEN_HOST || 'localhost';
        const port = this.params.port || process.env.LISTEN_PORT || 7000;
        if (!fs_1.default.existsSync(this.appsDirPath)) {
            console.error(safe_1.default.red(`Application folder '${this.appsDirPath}' doesn't exist`));
            return 1;
        }
        // path
        const backendDirPath = __dirname;
        this.frontendDirPath = path_1.default.resolve(path_1.default.join(backendDirPath, '../frontend'));
        this.sessionDirPath = path_1.default.join(this.runtimeDirPath, 'session');
        // runtime & temp
        BkHelper_1.BkHelper.createDirIfNotExistsSync(this.runtimeDirPath);
        BkHelper_1.BkHelper.createDirIfNotExistsSync(this.sessionDirPath);
        this.logErrorUrl = this.params.logErrorUrl || null;
        // logPool
        const { log } = this.params;
        if (log) {
            this.logPool = BkPostgreSqlDatabase_1.BkPostgreSqlDatabase.createPool(log);
        }
        this.logger = new Logger_1.Logger(this.logErrorUrl, this.logPool);
        // express server
        this.express = (0, express_1.default)();
        this.express.set('handleException', handleException);
        this.express.set('view engine', 'ejs');
        this.express.set('views', backendDirPath);
        this.express.enable('strict routing');
        this.initExpressServer();
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
        // http
        this.httpServer = await this.createAndRunHttpServer(host, port);
        this.httpServer.on('error', this.onHttpServerError.bind(this));
        if (process.send) {
            process.send('online');
        }
        let msg = `QForms server v${pkg.version} listening on http://${host}:${port}${this.isDevelopment() ? '/index2' : ''}\n`;
        msg += `\tprocess.env.NODE_ENV: ${process.env.NODE_ENV}\n`;
        msg += `\tappsDirPath: ${this.appsDirPath}\n`;
        msg += `\tdistDirPath: ${this.distDirPath}\n`;
        if (this.isDevelopment()) {
            msg += `\tmonitor: http://${host}:${port}/monitor\n`;
        }
        msg += `\tstarted at: ${new Date().toISOString()}\n`;
        console.log(msg);
        // ws
        this.wsServer = new WebSocketServer_1.WebSocketServer({
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
        if (Array.isArray(this.createAppQueue[context.getRoute()])) {
            console.log('application is creating:', context.getRoute());
            const promise = BkHelper_1.BkHelper.createEmptyPromise();
            this.createAppQueue[context.getRoute()].push(promise);
            return promise;
        }
        this.createAppQueue[context.getRoute()] = [];
        try {
            const app = (this.applications[context.getRoute()] = await this.createApplication(context));
            console.log('application created, start resolve loop', context.getRoute(), this.createAppQueue[context.getRoute()].length);
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
        console.log(`BackHostApp.createApplication: ${context.getRoute()}`);
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
        // console.log('BackHostApp.getApplicationClass', appInfo);
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
        console.log('createApp');
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
    async logError(err, req) {
        var _a, _b;
        console.log('BackHostApp.logError:', safe_1.default.red(err.message));
        try {
            const route = err instanceof MyError_1.MyError && err.context ? err.context.getRoute() : null;
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
                    status: err instanceof MyError_1.MyError ? err.status || null : null,
                    data: err instanceof MyError_1.MyError ? err.data || null : null,
                }
                : null;
            if (this.logPool) {
                await this.logger.createLog({
                    type: 'error',
                    source: 'server',
                    ip: req ? Context_1.Context.getIpFromReq(req) : null,
                    message: err.message,
                    stack: (_a = err.stack) === null || _a === void 0 ? void 0 : _a.toString(),
                    data: data ? JSON.stringify(data, null, 4) : null,
                });
            }
            else if (this.logErrorUrl) {
                console.log(`fetch ${this.logErrorUrl}`);
                await (0, node_fetch_1.default)(this.logErrorUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        type: 'error',
                        source: 'server',
                        ip: req ? Context_1.Context.getIpFromReq(req) : null,
                        message: err.message,
                        stack: (_b = err.stack) === null || _b === void 0 ? void 0 : _b.toString(),
                        data: data,
                    }),
                });
            }
        }
        catch (err) {
            console.error(safe_1.default.red(err));
        }
    }
    async logRequest(req, context, time) {
        if (!this.logPool)
            return;
        try {
            const application = this.getApplication(context);
            let args = '';
            if (req.body.params) {
                args = Object.keys(req.body.params)
                    .map((name) => `${name}: ${req.body.params[name]}`)
                    .join(', ');
            }
            else if (req.body.row) {
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
                ip: Context_1.Context.getIpFromReq(req),
                message: message,
                data: JSON.stringify(req.body, null, 4),
            });
        }
        catch (err) {
            console.error(safe_1.default.red(err));
        }
    }
    async logEvent(context, message, data = null) {
        console.log('BackHostApp.logEvent', message);
        try {
            await this.createLog2({
                type: 'log',
                source: 'server',
                ip: context.getIp(),
                message: message,
                data: data,
            });
        }
        catch (err) {
            console.error(safe_1.default.red(err));
        }
    }
    async createLog2(values) {
        if (this.logPool) {
            await this.logger.createLog({
                type: values.type,
                source: values.source,
                ip: values.ip,
                message: values.message,
                data: values.data ? JSON.stringify(values.data) : null,
            });
        }
        else if (this.logErrorUrl) {
            console.log(`fetch ${this.logErrorUrl}`);
            await (0, node_fetch_1.default)(this.logErrorUrl, {
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
    async moduleGet(req, res, next) {
        // @ts-ignore
        console.log(safe_1.default.magenta.underline('BackHostApp.moduleGet'), req.params);
        let context = null;
        try {
            if (req.params.module === 'viewer') {
                context = new Context_1.Context({
                    req,
                    res,
                    domain: this.getDomainFromRequest(req),
                });
                const application = await this.createApplicationIfNotExists(context);
                context.setVersionHeaders(pkg.version, application.getVersion());
                if (application.isAvailable()) {
                    await this.viewerModule.handleViewerGet(context, application);
                }
                else {
                    next();
                }
            }
            else if (req.params.module === 'editor') {
                if (this.isDevelopment()) {
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
            await res.json({
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
    async modulePost(req, res, next) {
        // @ts-ignore
        console.log(safe_1.default.magenta.underline('BackHostApp.modulePost'), req.params, req.body);
        let context = null;
        try {
            if (req.params.module === 'viewer') {
                context = new Context_1.Context({
                    req,
                    res,
                    domain: this.getDomainFromRequest(req),
                });
                const application = await this.createApplicationIfNotExists(context);
                context.setVersionHeaders(pkg.version, application.getVersion());
                const time = await this.viewerModule.handleViewerPost(context, application);
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
        if (process.env.NODE_ENV === 'development') {
            // @ts-ignore
            console.log(safe_1.default.magenta.underline('BackHostApp.moduleGetFile'), req.originalUrl);
        }
        if (req.params.module === 'viewer') {
            let context = null;
            try {
                context = new Context_1.Context({
                    req,
                    res,
                    domain: this.getDomainFromRequest(req),
                });
                const application = await this.createApplicationIfNotExists(context);
                context.setVersionHeaders(pkg.version, application.getVersion());
                await this.viewerModule.handleViewerGetFile(context, application, next);
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
        next(new MyError_1.MyError({
            message: `${req.method} ${req.originalUrl} not found`,
            status: 404,
        }));
    }
    async _e500(err, req, res, next) {
        console.log(safe_1.default.magenta('module.exports.e500:'), req.method, req.originalUrl);
        console.error(safe_1.default.red(err));
        const error = typeof err === 'string' ? new MyError_1.MyError({ message: err }) : err;
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
            const stack = this.isDevelopment() && error.status !== 404 ? error.stack : null;
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
    /*_getTest(req, res, next) {
        console.log('getTest');
        res.setHeader('Content-Type', 'text/plain;charset=utf-8');
        res.end('getTest');
    }*/
    /*_postTest(req, res, next) {
        console.log('postTest', req.body);
        res.json({foo: 'bar'});
    }*/
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
        console.error(safe_1.default.red('BackHostApp.onUnhandledRejection'), err);
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
        console.error(safe_1.default.red('BackHostApp.onHttpServerError'), err.code, err.message);
        /*if (err.code === 'EADDRINUSE') {
            console.error(`Address ${host}:${port} in use.`);
        } else {
            console.error(err);
        }*/
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
        if (this.logPool) {
            try {
                await this.logger.createLog({
                    type: req.body.type,
                    source: req.body.source,
                    ip: req.body.ip || Context_1.Context.getIpFromReq(req),
                    message: req.body.message,
                    stack: req.body.stack,
                    data: req
                        ? JSON.stringify(Object.assign({ headers: req.headers, domain: this.getDomainFromRequest(req) }, req.body.data), null, 4)
                        : null,
                });
                res.header('Access-Control-Allow-Origin', '*');
                res.end('ok');
            }
            catch (err) {
                next(err);
            }
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
                    req.query[name] = query[name] ? query[name] : req.params[name];
                }
            }
            await this[cb](req, res, next);
        });
    }
    getPostAlias(path, arr, query) {
        this.alias('get', path, arr, 'moduleGet', query);
        this.alias('post', path, arr, 'modulePost', query);
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
        console.log('BackHostApp.broadcastResult');
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
        console.log('BackHostApp.test');
    }
    getDistDirPath() {
        return this.distDirPath;
    }
    makeDistDirPathForApp(appFilePath) {
        const dirName = path_1.default.basename(path_1.default.dirname(appFilePath));
        const distDirPath = path_1.default.join(this.getDistDirPath(), dirName);
        return distDirPath;
    }
}
exports.BackHostApp = BackHostApp;
