const fs         = require('fs');
const path       = require('path');
const bodyParser = require('body-parser');
const session    = require('express-session');
const express    = require('express');
const http       = require('http');
const colors     = require('colors/safe');

import Helper from './Helper';
import PostgreSqlDatabase from './viewer/Model/Database/PostgreSqlDatabase/PostgreSqlDatabase';
import JsonFile from '../backend/JsonFile';
import Context from '../backend/Context';
import Application from './viewer/Model/Application/Application';
import { AppInfo } from './AppInfo';
import Model from './viewer/Model/Model';
import MonitorModule from './monitor/MonitorModule';
import IndexModule from './index/IndexModule';
import MyError from './MyError';
import ViewerModule from './viewer/ViewerModule';
import EditorModule from './editor/EditorModule';
import CommonModule from './common/CommonModule';

const backend = require('./index');
const pkg     = require('../../package.json');
const ApplicationEditor = require('../backend/editor/Editor/ApplicationEditor/ApplicationEditor');
// const Test    = require('./test/Test');

// post actions
const ACTIONS = [
    'page',
    'select',        // select
    'selectSingle',
    'selectMultiple',
    'insert',       // insert
    'update',       // update
    '_delete',      // delete
    'rpc',
    'logout',
    'test',
];

const EDITOR_CONTROLLERS = [
    'Application',
    'Database'   ,
    'Param'      ,
    'Table',
    'Column',
    'DataSource' ,
    'KeyColumn'  ,
    'Page'       ,
    'PageLink'   ,
    'Form'       ,
    'Field'      ,
    'Action'     ,
];

const EDITOR_ACTIONS = [
    'save'             ,
    '_new'             ,
    'delete'           ,
    'getView'          ,
    'saveView'         ,
    'saveController'   ,
    'createView'       ,
    'createController' ,
    'get'              ,
    'getTableInfo'     ,
    'changeClass'      ,
    'moveUp'           ,
    'moveDown'         ,
    'createModelBackJs',
];

class BackHostApp {
    params: any;
    applications: any;          // application by route
    server: any;
    publicDirPath: string;
    appsDirPath: string;
    logPool: any;
    nodeEnv: any;
    commonModule: CommonModule;
    indexModule: IndexModule;
    monitorModule: MonitorModule;
    viewerModule: ViewerModule;
    editorModule: EditorModule;
    startTime: Date;
    logErrorUrl: string;

    constructor(params: any = {}) {
        // console.log('BackHostApp.constructor');
        this.params = params;
        this.applications = {};
        // this.server = null;
        // this.publicDirPath = null;
        // this.appsDirPath = null;
        // this.logPool = null;
        // this.nodeEnv = null;
    }

    run() {
        console.log(`${this.constructor.name}.run`);
        this.startTime = new Date();
        this.initProcess();

        // env
        this.appsDirPath      = path.resolve(this.params.appsDirPath || './apps');
        this.logErrorUrl      = this.params.logErrorUrl     || '/error';
        const handleException = this.params.handleException || true;
        const host            = this.params.host            || 'localhost';
        const port            = this.params.port            || 3000;
        const log             = this.params.log;

        if (!fs.existsSync(this.appsDirPath)) {
            console.error(colors.red(`Application folder '${this.appsDirPath}' doesn't exist`));
            process.exit(1);
            return;
        }

        // express server
        this.server = express();

        // path
        const backendDirPath = __dirname;
        const engineDirPath  = path.join(backendDirPath, '..');
        this.publicDirPath = path.join(engineDirPath,  'frontend');

        // logPool
        if (log) {
            this.logPool = PostgreSqlDatabase.createPool(log);
        }

        // options
        this.server.set('handleException', handleException);
        this.server.set('view engine'    , 'ejs');
        this.server.set('views'          , backendDirPath);
        this.server.enable('strict routing');

        // production by default to disable editor
        // nodeEnv
        this.nodeEnv = process.env.NODE_ENV;
        if (!this.nodeEnv) {
            this.nodeEnv = 'production';
        }

        // runtime & temp
        Helper.createDirIfNotExistsSync(path.join(engineDirPath,  'runtime'));
        Helper.createDirIfNotExistsSync(path.join(engineDirPath,  'runtime/temp'));

        this.initExpressServer();
        this.createAndRunHttpServer(host, port);

        // commonModule
        this.commonModule = new CommonModule(this);
        this.commonModule.init();

        // indexModule
        this.indexModule = new IndexModule(this);
        this.indexModule.init();

        // monitorModule
        this.monitorModule = new MonitorModule(this);
        this.monitorModule.init();

        // viewerModule
        this.viewerModule = new ViewerModule(this);
        this.viewerModule.init();

        // editorModule
        this.editorModule = new EditorModule(this);
        this.editorModule.init();
    }

    initProcess() {
        process.on('message'           , this.onProcessMessage.bind(this));
        process.on('SIGINT'            , this.onProcessSIGINT.bind(this));
        process.on('SIGTERM'           , this.onProcessSIGTERM.bind(this));
        process.on('exit'              , this.onProcessExit.bind(this));
        process.on('unhandledRejection', this.onUnhandledRejection.bind(this));
    }

    initExpressServer() {
        // middlewares
        // server.use(morgan('dev'));
        // server.use(serverRequest);
        this.server.use(bodyParser.json({limit: '10mb'}));
        this.server.use(bodyParser.urlencoded({ extended: false }));
        // server.use(multipartHandler);
        this.server.use(session({
            secret            : 'qforms',
            key               : 'sid',
            resave            : false,
            saveUninitialized : false
        }));

        // test
        // this.server.get( '/test', this._getTest.bind(this));
        // this.server.post('/test', this._postTest.bind(this));

        // error logger
        this.server.options('/error', (req, res, next) => {
            console.log('options /error');
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length');
            res.end();
        });
        this.server.post('/error', this.postError.bind(this));

        // index module
        if (this.isDevelopment()) {
            this.server.get( '/index' , this.indexGet.bind(this));
            this.server.post('/index' , this.indexPost.bind(this));
            // this.server.get( '/index/*', this.indexGetFile.bind(this));
        }

        // monitor module
        if (this.isDevelopment()) {
            this.server.get('/monitor' , this.monitorGet.bind(this));
            // this.server.get('/monitor/*', this.monitorGetFile.bind(this));
        }

        // viewer/editor module
        this.server.get( '/:module/:appDirName/:appFileName/:env/' , this.appGet.bind(this));
        this.server.post('/:module/:appDirName/:appFileName/:env/' , this.appPost.bind(this));
        this.server.get( '/:module/:appDirName/:appFileName/:env/*', this.appGetFile.bind(this));

        // handle static for index and monitor
        this.server.use(express.static(this.publicDirPath));

        this.initCustomRoutes();

        // 404 and 500 error handlers
        this.server.use(this._e404.bind(this));
        this.server.use(this._e500.bind(this));
    }

    async createApplicationIfNotExists(req, context: Context) {
        // console.log(`BackHostApp.createApplicationIfNotExists debug: ${context.query.debug}, env: ${context.env}`);
        if (!context.route) throw new Error('no context.route');
        const route = context.route;
        const application = this.applications[route];
        if (application) {
            /*if (req.method === 'GET' && (context.query.debug === 1 || context.module === 'edit')) {
                await application.deinit();
                return this.applications[route] = await this.createApplication(this.getAppFilePath(context), context);
            }*/
            return application;
        }
        return this.applications[route] = await this.createApplication(this.getAppFilePath(context), context);
    }

    getApplication(context: Context): Application {
        if (!context.route) throw new Error('no context.route');
        const application = this.applications[context.route];
        if (!application) throw new Error(`no application for route: ${context.route}`);
        return application;
    }

    getAppFilePath(context: Context) {
        return path.join(this.appsDirPath, context.appDirName, context.appFileName + '.json');
    }

    async createApplication(appFilePath, context: Context): Promise<Application> {
        // console.log(`BackHostApp.createApplication: ${appFilePath}`);
        // const application = await Application.create(appFilePath, this, env);
        const appInfo = await Application.getAppInfo(appFilePath, context.env);

        // ApplicationClass
        const ApplicationClass = await this.getApplicationClass(appInfo);

        // application
        const json = await Helper.readTextFile(appInfo.filePath);
        const data = JSON.parse(json);
        const application = new ApplicationClass(data, appInfo, this, context);
        await application.init(context);
        return application;
    }

    async getApplicationClass(appInfo: AppInfo) {
        // console.log('BackHostApp.getApplicationClass', appInfo);
        /*const customClassFilePath = path.join(appInfo.dirPath, 'Model.back.js');
        const exists = await Helper.exists(customClassFilePath);
        return exists ? require(customClassFilePath) : Application;*/
        return Application;
    }

    async handleViewerGet(req, res, context: Context) {
        console.log('BackHostApp.handleViewerGet', context.query/*, Object.keys(context.query).map(name => typeof context.query[name])*/);
        await this.createApplicationIfNotExists(req, context);
        const application = this.getApplication(context);
        if (this.getApplication(context).isAuthentication() && !(req.session.user && req.session.user[context.route])) {
            await this.loginGet(req, res, context);
        } else {
            await application.initContext(context);
            await application.connect(context);
            try {
                const response =  await application.fill(context);
                res.render('viewer/index', {
                    version       : pkg.version,
                    application   : application,
                    context       : context,
                    response      : response,
                    links         : [
                        ...this.viewerModule.getLinks(),
                        ...application.links
                    ],
                    scripts       : [
                        ...this.viewerModule.getScripts(),
                        ...application.scripts
                    ]
                });
            } finally {
                application.release(context);
            }
        }
    }

    async handleViewerPost(req, res, context: Context) {
        // console.log('BackHostApp.handleViewerPost');
        await this.createApplicationIfNotExists(req, context);
        if (req.body.action === 'login') {
            await this.loginPost(req, res, context);
        } else {
            if (this.getApplication(context).isAuthentication() && !(req.session.user && req.session.user[context.route])) {
                throw new MyError({message: 'not authenticated', context});
            }
            if (ACTIONS.indexOf(req.body.action) === -1) {
                throw new Error(`unknown action: ${req.body.action}`);
            }
            return await this[req.body.action](req, res, context);
        }
    }

    async loginGet(req, res, context: Context) {
        console.log('BackHostApp.loginGet');
        const application = this.getApplication(context);
        const users = await application.getUsers(context);
        res.render('viewer/login', {
            version       : pkg.version,
            application   : application,
            REQUEST_URI   : req.url,
            errMsg        : null,
            username      : null,
            users         : users,
            links         : this.viewerModule.getLinks(),
            scripts       : this.viewerModule.getScripts()
        });
    }

    async loginPost(req, res, context: Context) {
        console.log('BackHostApp.loginPost');
        if (!context.route) throw new Error('no context.route');
        const route = context.route;
        const application = this.getApplication(context);
        await application.connect(context);
        try {
            const user = await application.authenticate(context, req.body.username, req.body.password);
            if (user) {
                if (!user.id)   throw new Error('no user id');
                if (!user.name) throw new Error('no user name');
                if (req.session.user === undefined) {
                    req.session.user = {};
                }
                req.session.user[route] = user;
                res.redirect(req.url);
            } else {
                const users = await application.getUsers(context);
                res.render('viewer/login', {
                    version    : pkg.version,
                    application: application,
                    caption    : application.getAttr('caption'),
                    REQUEST_URI: req.url,
                    errMsg     : application.getText().login.WrongUsernameOrPassword,
                    username   : req.body.username,
                    users      : users,
                    links      : this.viewerModule.getLinks(),
                    scripts    : this.viewerModule.getScripts()
                });
            }
        } finally {
            application.release(context);
        }
    }

    // action (fill page)
    async page(req, res, context: Context) {
        console.log('BackHostApp.page', req.body.page);
        const application = this.getApplication(context);
        await application.initContext(context);
        const page = await application.getPage(context, req.body.page);
        await application.connect(context);
        try {
            const response = await page.fill(context);
            if (response === undefined) throw new Error('page action: response is undefined');
            await res.json({page: response});
        } finally {
            application.release(context);
        }
    }

    // action
    async select(req, res, context: Context) {
        console.log('BackHostApp.select', req.body.page);
        const start = Date.now();
        const application = this.getApplication(context);
        await application.initContext(context);
        let dataSource;
        if (req.body.page) {
            const page = await application.getPage(context, req.body.page);
            if (req.body.form) {
                dataSource = page.getForm(req.body.form).getDataSource(req.body.ds);
            } else {
                dataSource = page.getDataSource(req.body.ds);
            }
        } else {
            dataSource = application.getDataSource(req.body.ds);
        }
        await dataSource.getDatabase().connect(context);
        try {
            const [rows, count] = await dataSource.select(context);
            const time = Date.now() - start;
            console.log('select time:', time);
            await res.json({rows, count, time});
            return time;
        } finally {
            await dataSource.getDatabase().release(context);
        }
    }

    // action
    async selectSingle(req, res, context: Context) {
        console.log('BackHostApp.selectSingle', req.body.page);
        const start = Date.now();
        const application = this.getApplication(context);
        await application.initContext(context);
        let dataSource;
        if (req.body.page) {
            const page = await application.getPage(context, req.body.page);
            if (req.body.form) {
                dataSource = page.getForm(req.body.form).getDataSource(req.body.ds);
            } else {
                dataSource = page.getDataSource(req.body.ds);
            }
        } else {
            dataSource = application.getDataSource(req.body.ds);
        }
        await dataSource.getDatabase().connect(context);
        try {
            const row = await dataSource.selectSingle(context);
            const time = Date.now() - start;
            console.log('select time:', time);
            if (row === undefined) throw new Error('selectSingle action: row is undefined');
            await res.json({row, time});
            return time;
        } finally {
            await dataSource.getDatabase().release(context);
        }
    }

    // action
    async selectMultiple(req, res, context: Context) {
        console.log('BackHostApp.selectMultiple', req.body.page);
        const start = Date.now();
        const application = this.getApplication(context);
        await application.initContext(context);
        let dataSource;
        if (req.body.page) {
            const page = await application.getPage(context, req.body.page);
            if (req.body.form) {
                dataSource = page.getForm(req.body.form).getDataSource(req.body.ds);
            } else {
                dataSource = page.getDataSource(req.body.ds);
            }
        } else {
            dataSource = application.getDataSource(req.body.ds);
        }
        await dataSource.getDatabase().connect(context);
        try {
            const [rows, count] = await dataSource.selectMultiple(context);
            const time = Date.now() - start;
            console.log('select time:', time);
            if (rows === undefined) throw new Error('selectMultiple action: rows are undegined');
            await res.json({rows, count, time});
            return time;
        } finally {
            await dataSource.getDatabase().release(context);
        }
    }

    // action
    async insert(req, res, context: Context) {
        console.log('BackHostApp.insert', req.body.page);
        const application = this.getApplication(context);
        await application.initContext(context);
        const page = await application.getPage(context, req.body.page);
        const form = page.getForm(req.body.form);
        const dataSource = form.getDataSource('default');
        await dataSource.getDatabase().connect(context);
        try {
            await dataSource.getDatabase().begin(context);
            const result = await dataSource.insert(context);
            if (result === undefined) throw new Error('insert action: result is undefined');
            await dataSource.getDatabase().commit(context);
            await res.json(result);
        } catch (err) {
            await dataSource.getDatabase().rollback(context, err);
            throw err;
        } finally {
            dataSource.getDatabase().release(context);
        }
    }

    // action
    async update(req, res, context: Context) {
        console.log('BackHostApp.update', req.body.page);
        const application = this.getApplication(context);
        await application.initContext(context);
        const page = await application.getPage(context, req.body.page);
        const form = page.getForm(req.body.form);
        const dataSource = form.getDataSource('default');
        await dataSource.getDatabase().connect(context);
        try {
            await dataSource.getDatabase().begin(context);
            const result = await dataSource.update(context);
            if (result === undefined) throw new Error('action update: result is undefined');
            await dataSource.getDatabase().commit(context);
            await res.json(result);
        } catch (err) {
            await dataSource.getDatabase().rollback(context, err);
            throw err;
        } finally {
            dataSource.getDatabase().release(context);
        }
    }

    // action
    async _delete(req, res, context: Context) {
        console.log('BackHostApp._delete', req.body.page);
        const application = this.getApplication(context);
        await application.initContext(context);
        const page = await application.getPage(context, req.body.page);
        const form = page.getForm(req.body.form);
        const dataSource = form.getDataSource('default');
        await dataSource.getDatabase().connect(context);
        try {
            await dataSource.getDatabase().begin(context);
            const result = await dataSource.delete(context);
            if (result === undefined) throw new Error('delete result is undefined');
            await dataSource.getDatabase().commit(context);
            await res.json(result);
        } catch (err) {
            await dataSource.getDatabase().rollback(context, err);
            throw err;
        } finally {
            dataSource.getDatabase().release(context);
        }
    }

    // action
    async rpc(req, res, context: Context) {
        console.log('BackHostApp.rpc', req.body);
        const application = this.getApplication(context);
        await application.initContext(context);
        let model: Model;
        if (req.body.page) {
            if (req.body.form) {
                const page = await application.getPage(context, req.body.page);
                model = page.getForm(req.body.form);
            } else {
                model = await application.getPage(context, req.body.page);
            }
        } else {
            model = application;
        }
        try {
            const result = await model.rpc(req.body.name, context);
            if (result === undefined) throw new Error('rpc action: result is undefined');
            await res.json(result);
        } catch (err) {
            const errorMessage = err.message;
            err.message = `rpc error ${req.body.name}: ${err.message}`;
            err.context = context;
            await this.logError(req, err);
            await res.json({errorMessage});
        }
    }

    // action
    async logout(req, res, context: Context) {
        console.log('BackHostApp.logout');
        if (!context.route) throw new Error('no context.route');
        if (!req.session.user || !req.session.user[context.route]) {
            throw new Error(`no user for route ${context.route}`);
        }
        delete req.session.user[context.route];
        await res.json(null);
    }

    // action
    async test(req, res, context: Context) {
        console.log('BackHostApp.test', req.body);
        // const result = await Test[req.body.name](req, res, context, this.getApplication(context));
        // if (result === undefined) throw new Error('test action: result is undefined');
        await res.json(null);
    }

    async handleEditorGet(req, res, context: Context) {
        console.log('BackHostApp.handleEditorGet');
        const application = await this.createApplicationIfNotExists(req, context);
        const appFile = new JsonFile(application.appInfo.filePath);
        await appFile.read();
        const app = JSON.parse(appFile.content);
        const data = {
            app        : app,
            env        : this.nodeEnv,
            logErrorUrl: this.logErrorUrl
        };
        res.render('editor/index', {
            version    : pkg.version,
            data       : data,
            runAppLink : `/viewer/${context.appDirName}/${context.appFileName}/${context.env}/?debug=1`,
            appDirName : context.appDirName,
            appFileName: context.appFileName,
            env        : context.env,
            links      : this.editorModule.getLinks(),
            scripts    : this.editorModule.getScripts()
        });
    }

    async handleEditorPost(req, res, context: Context) {
        console.log('BackHostApp.handleEditorPost', context.params);
        const application = await this.createApplicationIfNotExists(req, context);
        const appInfo = application.appInfo;
        if (EDITOR_CONTROLLERS.indexOf(req.body.controller) === -1) {
            throw new Error(`unknown controller: ${req.body.controller}`);
        }
        if (EDITOR_ACTIONS.indexOf(req.body.action) === -1) {
            throw new Error(`unknown action ${req.body.action}`);
        }
        const editorControllerClassName = `${req.body.controller}EditorController`;
        const ControllerClass = backend[editorControllerClassName];
        if (!ControllerClass) throw new Error(`no class with name ${editorControllerClassName}`);
        const method = req.body.action;
        const ctrl = new ControllerClass(appInfo, this, application);
        if (!ctrl[method]) throw new Error(`no method: ${editorControllerClassName}.${method}`);
        const result = await ctrl[method](context.params);
        // console.log('json result:', result);
        if (result === undefined) throw new Error('handleEditorPost: result is undefined');
        await res.json(result);
    }

    async createApp(req) {
        console.log('createApp');
        if (!req.body.folder) throw new Error('folder required: ' + req.body.folder);
        if (!req.body.name) throw new Error('name required: ' + req.body.name);
        const folder = req.body.folder;
        const name = req.body.name;
        const appDirPath  = path.join(this.appsDirPath, folder);
        const appFilePath = path.join(appDirPath, name + '.json');
        await Helper.createDirIfNotExists(appDirPath);
        await ApplicationEditor.createAppFile(appFilePath, {name});
        const appInfos = await Application.getAppInfos(this.appsDirPath);
        return appInfos;
    }

    async logError(req, err) {
        console.log('BackHostApp.logError:', colors.red(err));
        if (!this.logPool) return;
        try {
            const route = err.context ? err.context.route : null;
            let appVersion = null;
            if (route) {
                appVersion = this.applications[route].getVersion();
            }
            await BackHostApp.createLog(this.logPool, {
                type   : 'error',
                source : 'server',
                ip     : req ? req.headers['x-forwarded-for'] || req.connection.remoteAddress : null,
                message: err.message,
                stack  : err.stack.toString(),
                data   : req ? JSON.stringify({
                    method         : req.method,
                    host           : req.headers.host,
                    originalUrl    : req.originalUrl,
                    uri            : req.params['0'],
                    platformVersion: pkg.version,
                    appVersion     : appVersion,
                    route          : route,
                    body           : req.body,
                    status         : err.status || null,
                    data           : err.data || null
                }, null, 4) : null
            });
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
                args = Object.keys(req.body.params).map(name => `${name}: ${req.body.params[name]}`).join(', ');
            } else if (req.body.row) {
                args = Object.keys(req.body.row).map(name => `${name}: ${req.body.row[name]}`).join(', ');
            }
            let message = [
                application.getName(),
                ...(req.body.page ? [req.body.page] : []),
                ...(req.body.form ? [req.body.form] : []),
                ...(req.body.ds   ? [req.body.ds  ] : []),
                `${req.body.action}(${args})`
            ].join('.');
            if (time) {
                message += `, time: ${time}`;
            }
            await BackHostApp.createLog(this.logPool, {
                type   : 'log',
                source : 'server',
                ip     : req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                message: message,
                data   : JSON.stringify(req.body, null, 4)
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
        await PostgreSqlDatabase.queryResult(
            cnn,
            'insert into log(created, type, source, ip, message, stack, data) values ({created}, {type}, {source}, {ip}, {message}, {stack}, {data})',
            values
        );
    }

    async appGet(req, res, next) {
        console.log(colors.magenta.underline('BackHostApp.appGet'), req.params);
        let context = null;
        try {
            if (req.params.module === 'viewer') {
                context = new Context({req, domain: this.getDomain(req)});
                await this.handleViewerGet(req, res, context);
            } else if (req.params.module === 'editor') {
                if (this.isDevelopment()) {
                    context = new Context({req, domain: this.getDomain(req)});
                    await this.handleEditorGet(req, res, context);
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

    async indexGet(req, res, next) {
        console.log(colors.magenta('indexGet'));
        try {
            const data = await this.indexModule.fill();
            res.render('index/index', {
                hostApp: this,
                version: pkg.version,
                data   : data,
                links  : this.indexModule.getLinks(),
                scripts: this.indexModule.getScripts(),
            });
        } catch (err) {
            next(err);
        }
    }

    async indexPost(req, res, next) {
        console.log(colors.magenta('indexPost'), req.params);
        try {
            const appInfos = await this.createApp(req);
            await res.json({appInfos: appInfos.map(appInfo => ({
                    fullName: appInfo.fullName,
                    envs    : appInfo.envs
                }))});
        } catch (err) {
            next(err);
        }
    }

    async monitorGet(req, res, next) {
        console.log(colors.magenta('monitorGet'));
        try {
            const response = this.monitorModule.fill();
            res.render('monitor/index', {
                version : pkg.version,
                response: response,
                links   : this.monitorModule.getLinks(),
                scripts : this.monitorModule.getScripts(),
            });
        } catch (err) {
            next(err);
        }
    }

    async appPost(req, res, next)  {
        console.log(colors.magenta.underline('BackHostApp.appPost'), req.params, req.body);
        let context = null;
        try {
            if (req.params.module === 'viewer') {
                context = new Context({req, domain: this.getDomain(req)});
                const time = await this.handleViewerPost(req, res, context);
                // await this.logRequest(req, context, time);
            } else if (req.params.module === 'editor') {
                if (this.isDevelopment()) {
                    context = new Context({req, domain: this.getDomain(req)});
                    const time = await this.handleEditorPost(req, res, context);
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

    async appGetFile(req, res, next) {
        console.log(colors.magenta.underline('BackHostApp.appGetFile'), req.originalUrl);
        let context = null;
        try {
            context = new Context({req, domain: this.getDomain(req)});
            if (this.applications[context.route]) {
                const application = this.getApplication(context);
                if (application.isAuthentication() && !(req.session.user && req.session.user[context.route])) {
                    throw new MyError({message: 'not authenticated', context});
                }
                const filePath = path.join(application.getBuildDirPath(), context.uri);
                if (await Helper.exists(filePath)) {
                    res.sendFile(filePath);
                } else {
                    next();
                }
            } else {
                next();
            }
        } catch (err) {
            err.message = `appGetFile error: ${err.message}`;
            next(err);
        } finally {
            if (context) {
                context.destroy();
            }
        }
    }

    async _e404(req, res, next) {
        console.error(colors.magenta(req.method), 'error/404', req.originalUrl);
        next(new MyError({
            message: `${req.method} ${req.originalUrl} not found`,
            status : 404
        }));
    }

    async _e500(err, req, res, next) {
        console.log(colors.magenta('module.exports.e500:'), req.method, req.originalUrl);
        console.error(colors.red(err));
        const error = typeof err === 'string' ? new MyError({message: err}) : err;
        res.status(error.status || 500);
        if (req.headers['content-type'] && req.headers['content-type'].indexOf('application/json') !== -1) {
            res.end(this.isDevelopment() || error.status === 404 ? error.message : 'Internal Software Error');
        } else {
            res.render('error', {
                status : error.status,
                message: this.isDevelopment() || error.status === 404 ? error.message : 'Internal Software Error',
                stack  : this.isDevelopment() && error.status !== 404 ? error.stack : null
            });
        }
        await this.logError(req, error);
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
        const httpServer = http.createServer(this.server);
        httpServer.on('error', this.onHttpServerError.bind(this));
        httpServer.listen(port, host, () => {
            if (process.send) {
                process.send('online');
            }
            let msg = `QForms server v${pkg.version} listening on http://${host}:${port}${this.isDevelopment() ? '/index' : ''}\n`;
            msg += `\tprocess.env.NODE_ENV: ${process.env.NODE_ENV}\n`;
            msg += `\tappsDirPath: ${this.appsDirPath}\n`;
            if (this.isDevelopment()) {
                msg += `\tmonitor: http://${host}:${port}/monitor`;
            }
            console.log(msg);
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
        await this.logError(null, err);
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

    getDomain(req: any): string {
        const hostPort = req.get('host');
        const [host, port] = hostPort.split(':');
        return host;
    }

    async postError(req, res, next) {
        console.log(colors.red('BackHostApp.postError'), colors.red(req.body));
        if (this.logPool) {
            try {
                await BackHostApp.createLog(this.logPool, {
                    type   : 'error',
                    source : 'client',
                    ip     : req ? req.headers['x-forwarded-for'] || req.connection.remoteAddress : null,
                    message: req.body.message,
                    stack  : req.body.stack.toString(),
                    data   : req ? JSON.stringify({
                        domain: this.getDomain(req),
                        body  : req.body
                    }, null, 4) : null
                });
            } catch (err) {
                console.error(colors.red(err));
            }
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.end('');
    }

    getPublicDirPath() {
        return this.publicDirPath;
    }
    initCustomRoutes() {

    }

    alias(
        method: string,
        path: string,
        [module, appDirName, appFileName, env],
        cb: string,
        query?: any
    ) {
        this.server[method](path, async (req, res, next) => {
            req.params.module      = module;
            req.params.appDirName  = appDirName;
            req.params.appFileName = appFileName;
            req.params.env         = env;
            if (query) {
                for (const name in query) {
                    req.query[name] = Helper.encodeValue(query[name] ? query[name] : req.params[name]);
                }
            }
            await this[cb](req, res, next);
        });
    }

    getPostAlias(path, arr, query) {
        this.alias('get' , path , arr, 'appGet' , query);
        this.alias('post', path , arr, 'appPost', query);
    }

    isDevelopment() {
        return this.nodeEnv === 'development';
    }

}

export = BackHostApp;
