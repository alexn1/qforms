"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const WebSocketServer_1 = __importDefault(require("./WebSocketServer"));
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const express = require('express');
const http = require('http');
const colors = require('colors/safe');
const Helper_1 = __importDefault(require("./Helper"));
const PostgreSqlDatabase_1 = __importDefault(require("./viewer/Model/Database/PostgreSqlDatabase/PostgreSqlDatabase"));
const Context_1 = __importDefault(require("../backend/Context"));
const Application_1 = __importDefault(require("./viewer/Model/Application/Application"));
const MonitorModule_1 = __importDefault(require("./monitor/MonitorModule"));
const IndexModule_1 = __importDefault(require("./index/IndexModule"));
const MyError_1 = __importDefault(require("./MyError"));
const ViewerModule_1 = __importDefault(require("./viewer/ViewerModule"));
const EditorModule_1 = __importDefault(require("./editor/EditorModule"));
const CommonModule_1 = __importDefault(require("./common/CommonModule"));
const FileSessionStore_1 = __importDefault(require("./FileSessionStore"));
const Result_1 = __importDefault(require("./Result"));
const backend = require('./index');
const pkg = require('../../package.json');
const ApplicationEditor = require('../backend/editor/Editor/ApplicationEditor/ApplicationEditor');
// const Test    = require('./test/Test');
// post actions
const ACTIONS = [
    'page',
    'select',
    'insert',
    'update',
    '_delete',
    'rpc',
    'logout',
    'test',
];
const EDITOR_CONTROLLERS = [
    'Application',
    'Database',
    'Param',
    'Table',
    'Column',
    'DataSource',
    'KeyColumn',
    'Page',
    'PageLink',
    'Form',
    'Field',
    'Action',
];
const EDITOR_ACTIONS = [
    'save',
    '_new',
    'delete',
    'getView',
    'saveView',
    'saveController',
    'createView',
    'createStyle',
    'createController',
    'get',
    'getTableInfo',
    'changeClass',
    'moveUp',
    'moveDown',
    'createModelBackJs',
];
class BackHostApp {
    constructor(params = {}) {
        // console.log('BackHostApp.constructor');
        this.params = params;
        this.applications = {};
    }
    async run() {
        // console.log(`${this.constructor.name}.run`);
        this.startTime = new Date();
        this.initProcess();
        this.appsDirPath = path.resolve(this.params.appsDirPath || './apps');
        this.runtimeDirPath = path.resolve(this.params.runtimeDirPath || './runtime');
        this.logErrorUrl = this.params.logErrorUrl || '/error';
        const handleException = this.params.handleException || true;
        const host = this.params.host || 'localhost';
        const port = this.params.port || 3000;
        const log = this.params.log;
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
        Helper_1.default.createDirIfNotExistsSync(this.runtimeDirPath);
        Helper_1.default.createDirIfNotExistsSync(this.sessionDirPath);
        // logPool
        if (log) {
            this.logPool = PostgreSqlDatabase_1.default.createPool(log);
        }
        // express server
        this.express = express();
        this.express.set('handleException', handleException);
        this.express.set('view engine', 'ejs');
        this.express.set('views', backendDirPath);
        this.express.enable('strict routing');
        this.initExpressServer();
        // commonModule
        this.commonModule = new CommonModule_1.default(this);
        await this.commonModule.init();
        // indexModule
        this.indexModule = new IndexModule_1.default(this);
        await this.indexModule.init();
        // monitorModule
        this.monitorModule = new MonitorModule_1.default(this);
        await this.monitorModule.init();
        // viewerModule
        this.viewerModule = new ViewerModule_1.default(this);
        await this.viewerModule.init();
        // editorModule
        this.editorModule = new EditorModule_1.default(this);
        await this.editorModule.init();
        // http
        this.httpServer = this.createAndRunHttpServer(host, port);
        // ws
        this.wsServer = new WebSocketServer_1.default({
            backHostApp: this,
            httpServer: this.httpServer
        });
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
        secret = Helper_1.default.getFileContentSync(secretFilePath);
        if (secret) {
            return secret;
        }
        secret = Helper_1.default.getRandomString(20);
        Helper_1.default.writeFileSync(secretFilePath, secret);
        return secret;
    }
    initExpressServer() {
        // middlewares
        // server.use(morgan('dev'));
        // server.use(serverRequest);
        this.express.use(bodyParser.json({
            limit: '10mb',
            reviver: Helper_1.default.dateTimeReviver
        }));
        this.express.use(bodyParser.urlencoded({ extended: false }));
        // server.use(multipartHandler);
        this.express.use(session({
            store: new FileSessionStore_1.default(this.sessionDirPath),
            secret: this.getSecretSync(),
            key: 'sid',
            resave: false,
            saveUninitialized: false
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
            this.express.get('/index', this.indexGet.bind(this));
            this.express.post('/index', this.indexPost.bind(this));
            // this.express.get( '/index/*', this.indexGetFile.bind(this));
        }
        // monitor module
        this.express.get('/monitor', this.monitorGet.bind(this));
        // this.express.get('/monitor/*', this.monitorGetFile.bind(this));
        // viewer/editor module
        this.express.get('/:module/:appDirName/:appFileName/:env/', this.appGet.bind(this));
        this.express.post('/:module/:appDirName/:appFileName/:env/', this.appPost.bind(this));
        this.express.get('/:module/:appDirName/:appFileName/:env/*', this.appGetFile.bind(this));
        // handle static for index and monitor
        this.express.use(express.static(this.frontendDirPath));
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
        return this.applications[context.getRoute()] = await this.createApplication(context);
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
        return path.join(this.appsDirPath, context.getAppDirName(), context.getAppFileName() + '.json');
    }
    async createApplication(context) {
        console.log(`BackHostApp.createApplication: ${this.getAppFilePath(context)}`);
        const appInfo = await Application_1.default.loadAppInfo(this.getAppFilePath(context));
        // ApplicationClass
        const ApplicationClass = this.getApplicationClass(appInfo);
        // application
        const application = new ApplicationClass(appInfo.appFile.data, appInfo, this, context);
        await application.init(context);
        return application;
    }
    getApplicationClass(appInfo) {
        // console.log('BackHostApp.getApplicationClass', appInfo);
        return Application_1.default;
    }
    async handleViewerGet(req, res, context) {
        console.log('BackHostApp.handleViewerGet', context.query /*, Object.keys(context.query).map(name => typeof context.query[name])*/);
        const application = this.getApplication(context);
        if (application.isAuthentication() && !(req.session.user && req.session.user[context.getRoute()])) {
            await this.loginGet(req, res, context);
        }
        else {
            await application.connect(context);
            try {
                await application.initContext(context);
                const response = await application.fill(context);
                res.render('viewer/index', {
                    version: pkg.version,
                    application: application,
                    context: context,
                    response: response,
                    links: [
                        ...this.viewerModule.getLinks(),
                        ...application.links
                    ],
                    scripts: [
                        ...this.viewerModule.getScripts(),
                        ...application.scripts
                    ]
                });
            }
            finally {
                application.release(context);
            }
        }
    }
    async handleViewerPost(req, res, context) {
        // console.log('BackHostApp.handleViewerPost');
        await this.createApplicationIfNotExists(context);
        if (req.body.action === 'login') {
            await this.loginPost(req, res, context);
        }
        else {
            if (this.getApplication(context).isAuthentication() && !(req.session.user && req.session.user[context.getRoute()])) {
                throw new MyError_1.default({ message: 'Unauthorized', status: 401, context });
            }
            if (ACTIONS.indexOf(req.body.action) === -1) {
                throw new Error(`unknown action: ${req.body.action}`);
            }
            return await this[req.body.action](req, res, context);
        }
    }
    async loginGet(req, res, context) {
        console.log('BackHostApp.loginGet');
        const application = this.getApplication(context);
        // const users = await application.getUsers(context);
        res.render('viewer/login', {
            version: pkg.version,
            context: context,
            application: application,
            links: [
                ...this.viewerModule.getLinks(),
                ...application.links
            ],
            scripts: [
                ...this.viewerModule.getScripts(),
                ...application.scripts
            ],
            data: {
                name: application.getName(),
                text: application.getText(),
                title: application.getTitle(context),
                errMsg: null,
            }
        });
    }
    async loginPost(req, res, context) {
        console.log('BackHostApp.loginPost');
        if (req.body.tzOffset === undefined)
            throw new Error('no tzOffset');
        if (req.body.username === undefined)
            throw new Error('no username');
        if (req.body.password === undefined)
            throw new Error('no password');
        const application = this.getApplication(context);
        await application.connect(context);
        try {
            const user = await application.authenticate(context, req.body.username, req.body.password);
            if (user) {
                if (!user.id)
                    throw new Error('no user id');
                if (!user.name)
                    throw new Error('no user name');
                if (req.session.user === undefined) {
                    req.session.user = {};
                }
                req.session.ip = context.getIp();
                req.session.tzOffset = JSON.parse(req.body.tzOffset);
                req.session.user[context.getRoute()] = user;
                res.redirect(req.url);
            }
            else {
                // const users = await application.getUsers(context);
                res.render('viewer/login', {
                    version: pkg.version,
                    context: context,
                    application: application,
                    links: [
                        ...this.viewerModule.getLinks(),
                        ...application.links
                    ],
                    scripts: [
                        ...this.viewerModule.getScripts(),
                        ...application.scripts
                    ],
                    data: {
                        name: application.getName(),
                        text: application.getText(),
                        title: application.getTitle(context),
                        errMsg: application.getText().login.WrongUsernameOrPassword,
                        username: req.body.username,
                        password: req.body.password,
                    }
                });
            }
        }
        finally {
            application.release(context);
        }
    }
    // action (fill page)
    async page(req, res, context) {
        console.log('BackHostApp.page', req.body.page);
        const application = this.getApplication(context);
        await application.connect(context);
        try {
            await application.initContext(context);
            const page = await application.getPage(context, req.body.page);
            const response = await page.fill(context);
            if (response === undefined)
                throw new Error('page action: response is undefined');
            await res.json({ page: response });
        }
        finally {
            application.release(context);
        }
    }
    // action
    async select(req, res, context) {
        console.log('BackHostApp.select', req.body.page);
        const start = Date.now();
        const application = this.getApplication(context);
        let dataSource;
        if (req.body.page) {
            const page = await application.getPage(context, req.body.page);
            if (req.body.form) {
                dataSource = page.getForm(req.body.form).getDataSource(req.body.ds);
            }
            else {
                dataSource = page.getDataSource(req.body.ds);
            }
        }
        else {
            dataSource = application.getDataSource(req.body.ds);
        }
        await dataSource.getDatabase().connect(context);
        try {
            await application.initContext(context);
            const [rows, count] = await dataSource.select(context);
            const time = Date.now() - start;
            console.log('select time:', time);
            await res.json({ rows, count, time });
            return time;
        }
        finally {
            await dataSource.getDatabase().release(context);
        }
    }
    // action
    async insert(req, res, context) {
        console.log('BackHostApp.insert', req.body.page);
        const application = this.getApplication(context);
        const page = await application.getPage(context, req.body.page);
        const form = page.getForm(req.body.form);
        const dataSource = form.getDataSource('default');
        await dataSource.getDatabase().connect(context);
        try {
            await application.initContext(context);
            await dataSource.getDatabase().begin(context);
            try {
                const result = await dataSource.insert(context);
                if (result === undefined)
                    throw new Error('insert action: result is undefined');
                await dataSource.getDatabase().commit(context);
                await res.json(result);
                application.broadcastResultToClients(context, result);
            }
            catch (err) {
                await dataSource.getDatabase().rollback(context, err);
                throw err;
            }
        }
        finally {
            dataSource.getDatabase().release(context);
        }
    }
    // action
    async update(req, res, context) {
        console.log('BackHostApp.update', req.body.page);
        const application = this.getApplication(context);
        const page = await application.getPage(context, req.body.page);
        const form = page.getForm(req.body.form);
        const dataSource = form.getDataSource('default');
        await dataSource.getDatabase().connect(context);
        try {
            await application.initContext(context);
            await dataSource.getDatabase().begin(context);
            try {
                const result = await dataSource.update(context);
                if (result === undefined)
                    throw new Error('action update: result is undefined');
                await dataSource.getDatabase().commit(context);
                await res.json(result);
                application.broadcastResultToClients(context, result);
            }
            catch (err) {
                await dataSource.getDatabase().rollback(context, err);
                throw err;
            }
        }
        finally {
            dataSource.getDatabase().release(context);
        }
    }
    // action
    async _delete(req, res, context) {
        console.log('BackHostApp._delete', req.body.page);
        const application = this.getApplication(context);
        const page = await application.getPage(context, req.body.page);
        const form = page.getForm(req.body.form);
        const dataSource = form.getDataSource('default');
        await dataSource.getDatabase().connect(context);
        try {
            await application.initContext(context);
            await dataSource.getDatabase().begin(context);
            try {
                const result = await dataSource.delete(context);
                if (result === undefined)
                    throw new Error('delete result is undefined');
                await dataSource.getDatabase().commit(context);
                await res.json(result);
                application.broadcastResultToClients(context, result);
            }
            catch (err) {
                await dataSource.getDatabase().rollback(context, err);
                throw err;
            }
        }
        finally {
            dataSource.getDatabase().release(context);
        }
    }
    // action
    async rpc(req, res, context) {
        console.log('BackHostApp.rpc', req.body);
        const application = this.getApplication(context);
        // await application.initContext(context);
        let model;
        if (req.body.page) {
            if (req.body.form) {
                const page = await application.getPage(context, req.body.page);
                model = page.getForm(req.body.form);
            }
            else {
                model = await application.getPage(context, req.body.page);
            }
        }
        else {
            model = application;
        }
        try {
            const result = await model.rpc(req.body.name, context);
            if (result === undefined)
                throw new Error('rpc action: result is undefined');
            await res.json(result);
            if (result instanceof Result_1.default) {
                application.broadcastResultToClients(context, result);
            }
        }
        catch (err) {
            const errorMessage = err.message;
            err.message = `rpc error ${req.body.name}: ${err.message}`;
            err.context = context;
            await this.logError(err, req);
            await res.json({ errorMessage });
        }
    }
    // action
    async logout(req, res, context) {
        console.log('BackHostApp.logout');
        if (!req.session.user || !req.session.user[context.getRoute()]) {
            throw new Error(`no user for route ${context.getRoute()}`);
        }
        delete req.session.user[context.getRoute()];
        await Helper_1.default.Session_save(req.session);
        await res.json(null);
    }
    // action
    async test(req, res, context) {
        console.log('BackHostApp.test', req.body);
        // const result = await Test[req.body.name](req, res, context, this.getApplication(context));
        // if (result === undefined) throw new Error('test action: result is undefined');
        await res.json(null);
    }
    async handleEditorGet(req, res, context) {
        console.log('BackHostApp.handleEditorGet');
        const appInfo = await Application_1.default.loadAppInfo(this.getAppFilePath(context));
        // data
        const data = {
            app: appInfo.appFile.data,
            nodeEnv: this.getNodeEnv(),
            logErrorUrl: this.logErrorUrl
        };
        res.render('editor/index', {
            version: pkg.version,
            data: data,
            runAppLink: `/viewer/${context.getAppDirName()}/${context.getAppFileName()}/${context.getEnv()}/?debug=1`,
            appDirName: context.getAppDirName(),
            appFileName: context.getAppFileName(),
            env: context.getEnv(),
            links: this.editorModule.getLinks(),
            scripts: this.editorModule.getScripts()
        });
    }
    async handleEditorPost(req, res, context) {
        console.log('BackHostApp.handleEditorPost', req.body);
        if (EDITOR_CONTROLLERS.indexOf(req.body.controller) === -1) {
            throw new Error(`unknown controller: ${req.body.controller}`);
        }
        if (EDITOR_ACTIONS.indexOf(req.body.action) === -1) {
            throw new Error(`unknown action ${req.body.action}`);
        }
        const editorControllerClassName = `${req.body.controller}EditorController`;
        const ControllerClass = backend[editorControllerClassName];
        if (!ControllerClass)
            throw new Error(`no class with name ${editorControllerClassName}`);
        const appInfo = await Application_1.default.loadAppInfo(this.getAppFilePath(context));
        const ctrl = new ControllerClass(appInfo, this, null);
        await ctrl.init(context);
        const method = req.body.action;
        if (!ctrl[method])
            throw new Error(`no method: ${editorControllerClassName}.${method}`);
        const result = await ctrl[method](context.params);
        // console.log('json result:', result);
        if (result === undefined)
            throw new Error('handleEditorPost: result is undefined');
        await res.json(result);
    }
    async createApp(req) {
        console.log('createApp');
        if (!req.body.folder)
            throw new Error('folder required: ' + req.body.folder);
        if (!req.body.name)
            throw new Error('name required: ' + req.body.name);
        const folder = req.body.folder;
        const name = req.body.name;
        const appDirPath = path.join(this.appsDirPath, folder);
        const appFilePath = path.join(appDirPath, name + '.json');
        await Helper_1.default.createDirIfNotExists(appDirPath);
        await ApplicationEditor.createAppFile(appFilePath, { name });
        const appInfos = await Application_1.default.getAppInfos(this.appsDirPath);
        return appInfos;
    }
    async logError(err, req = null) {
        console.log('BackHostApp.logError:', colors.red(err));
        if (!this.logPool)
            return;
        try {
            const route = err.context ? err.context.getRoute() : null;
            let appVersion = null;
            if (route) {
                appVersion = this.applications[route].getVersion();
            }
            await BackHostApp.createLog(this.logPool, {
                type: 'error',
                source: 'server',
                ip: req ? req.headers['x-forwarded-for'] || req.connection.remoteAddress : null,
                message: err.message,
                stack: err.stack.toString(),
                data: req ? JSON.stringify({
                    headers: req.headers,
                    method: req.method,
                    host: req.headers.host,
                    originalUrl: req.originalUrl,
                    uri: req.params['0'],
                    platformVersion: pkg.version,
                    appVersion: appVersion,
                    route: route,
                    body: req.body,
                    status: err.status || null,
                    data: err.data || null
                }, null, 4) : null
            });
        }
        catch (err) {
            console.error(colors.red(err));
        }
    }
    async logRequest(req, context, time) {
        if (!this.logPool)
            return;
        try {
            const application = this.getApplication(context);
            let args = '';
            if (req.body.params) {
                args = Object.keys(req.body.params).map(name => `${name}: ${req.body.params[name]}`).join(', ');
            }
            else if (req.body.row) {
                args = Object.keys(req.body.row).map(name => `${name}: ${req.body.row[name]}`).join(', ');
            }
            let message = [
                application.getName(),
                ...(req.body.page ? [req.body.page] : []),
                ...(req.body.form ? [req.body.form] : []),
                ...(req.body.ds ? [req.body.ds] : []),
                `${req.body.action}(${args})`
            ].join('.');
            if (time) {
                message += `, time: ${time}`;
            }
            await BackHostApp.createLog(this.logPool, {
                type: 'log',
                source: 'server',
                ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                message: message,
                data: JSON.stringify(req.body, null, 4)
            });
        }
        catch (err) {
            console.error(colors.red(err));
        }
    }
    static async createLog(cnn, values) {
        // console.log('BackHostApp.createLog', values);
        if (values.stack === undefined)
            values.stack = null;
        if (values.created === undefined)
            values.created = new Date();
        if (values.message && values.message.length > 255) {
            // throw new Error(`message to long: ${values.message.length}`);
            values.message = values.message.substr(0, 255);
        }
        await PostgreSqlDatabase_1.default.queryResult(cnn, 'insert into log(created, type, source, ip, message, stack, data) values ({created}, {type}, {source}, {ip}, {message}, {stack}, {data})', values);
    }
    async appGet(req, res, next) {
        console.log(colors.magenta.underline('BackHostApp.appGet'), req.params);
        let context = null;
        try {
            if (req.params.module === 'viewer') {
                context = new Context_1.default({ req, domain: this.getDomain(req) });
                const application = await this.createApplicationIfNotExists(context);
                if (application.isAvailable()) {
                    await this.handleViewerGet(req, res, context);
                }
                else {
                    next();
                }
            }
            else if (req.params.module === 'editor') {
                if (this.isDevelopment()) {
                    context = new Context_1.default({ req, domain: this.getDomain(req) });
                    await this.handleEditorGet(req, res, context);
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
        console.log(colors.magenta('indexGet'));
        try {
            const data = await this.indexModule.fill();
            res.render('index/index', {
                hostApp: this,
                version: pkg.version,
                data: data,
                links: this.indexModule.getLinks(),
                scripts: this.indexModule.getScripts(),
            });
        }
        catch (err) {
            next(err);
        }
    }
    async indexPost(req, res, next) {
        console.log(colors.magenta('indexPost'), req.params);
        try {
            const appInfos = await this.createApp(req);
            await res.json({ appInfos: appInfos.map(appInfo => ({
                    fullName: appInfo.fullName,
                    envs: appInfo.envs
                })) });
        }
        catch (err) {
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
                const response = this.monitorModule.fill();
                res.render('monitor/index', {
                    version: pkg.version,
                    response: response,
                    links: this.monitorModule.getLinks(),
                    scripts: this.monitorModule.getScripts(),
                });
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
    async appPost(req, res, next) {
        console.log(colors.magenta.underline('BackHostApp.appPost'), req.params, req.body);
        let context = null;
        try {
            if (req.params.module === 'viewer') {
                context = new Context_1.default({ req, domain: this.getDomain(req) });
                const time = await this.handleViewerPost(req, res, context);
                // await this.logRequest(req, context, time);
            }
            else if (req.params.module === 'editor') {
                if (this.isDevelopment()) {
                    context = new Context_1.default({ req, domain: this.getDomain(req) });
                    const time = await this.handleEditorPost(req, res, context);
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
    async appGetFile(req, res, next) {
        console.log(colors.magenta.underline('BackHostApp.appGetFile'), req.originalUrl);
        if (req.params.module !== 'viewer') {
            next();
            return;
        }
        let context = null;
        try {
            context = new Context_1.default({ req, domain: this.getDomain(req) });
            if (!this.applications[context.getRoute()]) {
                next();
                return;
            }
            const application = this.getApplication(context);
            /*if (application.isAuthentication() && !(req.session.user && req.session.user[context.getRoute()])) {
                throw new MyError({message: 'not authenticated', context});
            }*/
            const filePath = path.join(application.getFrontendDirPath(), context.getUri());
            if (!await Helper_1.default.exists(filePath)) {
                next();
                return;
            }
            res.sendFile(filePath);
        }
        catch (err) {
            err.message = `appGetFile error: ${err.message}`;
            next(err);
        }
        finally {
            if (context) {
                context.destroy();
            }
        }
    }
    async _e404(req, res, next) {
        console.error(colors.magenta(req.method), 'error/404', req.originalUrl);
        next(new MyError_1.default({
            message: `${req.method} ${req.originalUrl} not found`,
            status: 404
        }));
    }
    async _e500(err, req, res, next) {
        console.log(colors.magenta('module.exports.e500:'), req.method, req.originalUrl);
        console.error(colors.red(err));
        const error = typeof err === 'string' ? new MyError_1.default({ message: err }) : err;
        res.status(error.status || 500);
        if (req.headers['content-type'] && req.headers['content-type'].indexOf('application/json') !== -1) {
            res.end(this.isDevelopment() || error.status === 404 ? error.message : 'Internal Software Error');
        }
        else {
            res.render('error', {
                status: error.status,
                message: this.isDevelopment() || error.status === 404 ? error.message : 'Internal Software Error',
                stack: this.isDevelopment() && error.status !== 404 ? error.stack : null
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
    createAndRunHttpServer(host, port) {
        const httpServer = http.createServer(this.express);
        httpServer.on('error', this.onHttpServerError.bind(this));
        httpServer.listen(port, host, () => {
            if (process.send) {
                process.send('online');
            }
            let msg = `QForms server v${pkg.version} listening on http://${host}:${port}${this.isDevelopment() ? '/index' : ''}\n`;
            msg += `\tprocess.env.NODE_ENV: ${process.env.NODE_ENV}\n`;
            msg += `\tappsDirPath: ${this.appsDirPath}\n`;
            if (this.isDevelopment()) {
                msg += `\tmonitor: http://${host}:${port}/monitor\n`;
            }
            msg += `\tstarted at: ${new Date().toISOString()}\n`;
            console.log(msg);
        });
        return httpServer;
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
    getDomain(req) {
        const hostPort = req.headers.host;
        if (!hostPort)
            throw new Error('no host');
        const [host, port] = hostPort.split(':');
        return host;
    }
    async postError(req, res, next) {
        console.log(colors.red('BackHostApp.postError'), colors.red(req.body));
        if (this.logPool) {
            try {
                await BackHostApp.createLog(this.logPool, {
                    type: 'error',
                    source: 'client',
                    ip: req ? req.headers['x-forwarded-for'] || req.connection.remoteAddress : null,
                    message: req.body.message,
                    stack: req.body.stack,
                    data: req ? JSON.stringify({
                        headers: req.headers,
                        domain: this.getDomain(req),
                        body: req.body
                    }, null, 4) : null
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
    initCustomRoutes() {
    }
    alias(method, path, [module, appDirName, appFileName, env], cb, query) {
        this.express[method](path, async (req, res, next) => {
            req.params.module = module;
            req.params.appDirName = appDirName;
            req.params.appFileName = appFileName;
            req.params.env = env;
            if (query) {
                for (const name in query) {
                    req.query[name] = query[name] ? query[name] : req.params[name];
                }
            }
            await this[cb](req, res, next);
        });
    }
    getPostAlias(path, arr, query) {
        this.alias('get', path, arr, 'appGet', query);
        this.alias('post', path, arr, 'appPost', query);
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
}
module.exports = BackHostApp;
