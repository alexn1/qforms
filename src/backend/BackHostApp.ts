

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
import AppModule from './app/AppModule';
import MyError from './MyError';
import ViewerModule from './viewer/ViewerModule';
import EditorModule from './editor/EditorModule';

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
    'test'
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
    'save'            ,
    '_new'            ,
    'delete'          ,
    'getView'         ,
    'saveView'        ,
    'saveController'  ,
    // 'createView'      ,
    'createController',
    'get'             ,
    'getTableInfo'    ,
    'changeClass'     ,
    'moveUp'          ,
    'moveDown'
];



class BackHostApp {
    params: any;
    applications: any;          // application by route
    server: any;
    publicDirPath: string;
    appsDirPath: string;
    logCnn: any;
    nodeEnv: any;
    viewerModule: ViewerModule;
    editorModule: EditorModule;

    constructor(params: any = {}) {
        // console.log('BackHostApp.constructor');
        this.params = params;
        this.applications = {};
        // this.server = null;
        // this.publicDirPath = null;
        // this.appsDirPath = null;
        // this.logCnn = null;
        // this.nodeEnv = null;
    }

    run() {
        this.initProcess();

        // env
        const appsDirPath     = this.params.appsDirPath     || './apps';
        const handleException = this.params.handleException || true;
        const host            = this.params.host            || 'localhost';
        const port            = this.params.port            || 3000;
        const log             = this.params.log;


        if (!fs.existsSync(appsDirPath)) {
            console.error(colors.red(`Application folder '${path.resolve(appsDirPath)}' doesn't exist`));
            process.exit(1);
            return;
        }

        // express server
        this.server = express();

        // path
        const backendDirPath = __dirname;
        const engineDirPath  = path.join(backendDirPath, '..');
        this.appsDirPath  = appsDirPath;
        this.publicDirPath = path.join(engineDirPath,  'frontend');

        // logCnn
        if (log) {
            this.logCnn = PostgreSqlDatabase.createPool(log);
        }


        // options
        this.server.set('handleException', handleException);
        this.server.set('view engine'    , 'ejs');
        this.server.set('views'          , path.join(backendDirPath, 'ejs'));
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

        this.viewerModule = new ViewerModule(this);
        this.editorModule = new EditorModule(this);
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
        this.server.get( '/test', this._getTest.bind(this));
        this.server.post('/test', this._postTest.bind(this));

        // app
        this.server.get( '/app', this._appGet.bind(this));
        this.server.post('/app', this._appPost.bind(this));

        // monitor
        this.server.get('/monitor', this._monitorGet.bind(this));

        // moduleGet
        this.server.get('/:module/:appDirName/:appFileName/:env/', this._moduleGet.bind(this));

        // modulePost
        this.server.post('/:module/:appDirName/:appFileName/:env/', this._modulePost.bind(this));

        // moduleFile
        this.server.get('/:module/:appDirName/:appFileName/:env/*', this._moduleFile.bind(this));

        // favicon.ico
        this.server.get('/favicon.ico', this._favicon.bind(this));

        // handle static for app and monitor
        this.server.use(express.static(this.publicDirPath));

        // catch 404 and forward to error handler
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
            const response =  await application.fill(context);
            res.render('viewer/index', {
                version       : pkg.version,
                application   : application,
                context       : context,
                response      : response,
                links         : [
                    ...this.viewerModule.getLinks(),
                    ...await application.getLinks()
                ],
                scripts       : [
                    ...this.viewerModule.getScripts(),
                    ...await application.getScripts()
                ]
            });
        }
    }

    async handleViewerPost(req, res, context: Context) {
        // console.log('BackHostApp.handleViewerPost');
        await this.createApplicationIfNotExists(req, context);
        if (req.body.action === 'login') {
            await this.loginPost(req, res, context);
        } else {
            if (this.getApplication(context).isAuthentication() && !(req.session.user && req.session.user[context.route])) {
                throw new Error('not authenticated');
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
            users         : users
        });
    }

    async loginPost(req, res, context: Context) {
        console.log('BackHostApp.loginPost');
        if (!context.route) throw new Error('no context.route');
        const route = context.route;
        const application = this.getApplication(context);
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
                users      : users
            });
        }
    }

    // fill application
    /*async fill(req, context: Context) {
        console.log('BackHostApp.fill', this.getApplication(context).getName());
        const application = this.getApplication(context);
        return await application.fill(context);
    }*/

    // action (fill page)
    async page(req, res, context: Context) {
        console.log('BackHostApp.page', req.body.page);
        const application = this.getApplication(context);
        await application.initContext(context);
        const page = await application.getPage(context, req.body.page);
        const response = await page.fill(context);
        if (response === undefined) throw new Error('page action: response is undefined');
        await res.json({page: response});
    }

    // action
    async update(req, res, context: Context) {
        console.log('BackHostApp.update', req.body.page);
        const application = this.getApplication(context);
        await application.initContext(context);
        const page = await application.getPage(context, req.body.page);
        const form = page.getForm(req.body.form);
        const result = await form.update(context);
        if (result === undefined) throw new Error('action update: result is undefined');
        await res.json(result);
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
        const [rows, count] = await dataSource.select(context);
        const time = Date.now() - start;
        console.log('select time:', time);
        await res.json({rows, count, time});
        return time;
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
        const row = await dataSource.selectSingle(context);
        const time = Date.now() - start;
        console.log('select time:', time);
        if (row === undefined) throw new Error('selectSingle action: row is undefined');
        await res.json({row, time});
        return time;
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
        const [rows, count] = await dataSource.selectMultiple(context);
        const time = Date.now() - start;
        console.log('select time:', time);
        if (rows === undefined) throw new Error('selectMultiple action: rows are undegined');
        await res.json({rows, count, time});
        return time;
    }

    // action
    async insert(req, res, context: Context) {
        console.log('BackHostApp.insert', req.body.page);
        const application = this.getApplication(context);
        await application.initContext(context);
        const page = await application.getPage(context, req.body.page);
        const dataSource = page.getForm(req.body.form).getDataSource('default');
        const cnn = await dataSource.getDatabase().getConnection(context);
        try {
            await dataSource.getDatabase().beginTransaction(cnn);
            const result = await dataSource.insert(context, context.params);
            if (result === undefined) throw new Error('insert action: result is undefined');
            await dataSource.getDatabase().commit(cnn);
            await res.json(result);
        } catch (err) {
            await dataSource.getDatabase().rollback(cnn, err);
            throw err;
        }
    }

    // action
    async _delete(req, res, context: Context) {
        console.log('BackHostApp._delete', req.body.page);
        const application = this.getApplication(context);
        await application.initContext(context);
        const page = await application.getPage(context, req.body.page);
        const dataSource = page.getForm(req.body.form).getDataSource('default');
        const cnn = await dataSource.getDatabase().getConnection(context);
        try {
            await dataSource.getDatabase().beginTransaction(cnn);
            const result = await dataSource.delete(context);
            await dataSource.getDatabase().commit(cnn);
            if (result === undefined) throw new Error('delete result is undefined');
            await res.json(result);
        } catch (err) {
            await dataSource.getDatabase().rollback(cnn, err);
            throw err;
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

    async appFile(req, context: Context, application: Application) {
        // console.log('BackHostApp.appFile', context.uri);
        const filePath = path.join(application.getBuildDirPath(), context.uri);
        // console.log('filePath:', filePath);
        const ext = path.extname(filePath);
        if (['.css', '.js', '.map'].includes(ext)) {
            const exists = await Helper.exists(filePath);
            if (exists) {
                return [await Helper.readTextFile(filePath), ext];
            }
        }
        if (['.ttf', '.otf', '.png', '.jpg'].includes(ext)) {
            const exists = await Helper.exists(filePath);
            if (exists) {
                return [await Helper.readBinaryFile(filePath), ext];
            }
        }
        return null;
    }

    async staticFile(req, res, context: Context) {
        // console.log('BackHostApp.staticFile');
        const application = this.getApplication(context);
        const content = await this.appFile(req, context, application);
        if (content !== null) {
            if (content[1] === '.css') {
                res.setHeader('content-type', 'text/css');
            }
            if (content[1] === '.js') {
                res.setHeader('content-type', 'text/javascript');
            }
            if (content[1] === '.map') {
                res.setHeader('content-type', 'application/json');
            }
            if (content[1] === '.ttf') {
                res.setHeader('content-type', 'font/ttf');
            }
            if (content[1] === '.otf') {
                res.setHeader('content-type', 'font/opentype');
            }
            if (content[1] === '.png') {
                res.setHeader('content-type', 'image/png');
            }
            if (content[1] === '.jpg') {
                res.setHeader('content-type', 'image/jpeg');
            }
            res.send(content[0]);
        } else {
            const filePath = path.join(this.publicDirPath, context.uri);
            const exists = await Helper.exists(filePath);
            if (!exists) throw new Error(`file not found: ${context.uri}`);
            res.sendFile(filePath);
        }
    }

    async handleEditorGet(req, res, context: Context) {
        console.log('BackHostApp.handleEditorGet');
        const application = await this.createApplicationIfNotExists(req, context);
        const appFile = new JsonFile(application.appInfo.filePath);
        await appFile.read();
        const app = JSON.parse(appFile.content);
        app.env = this.nodeEnv;

        res.render('editor/index', {
            version        : pkg.version,
            app            : app,
            runAppLink     : `/view/${context.appDirName}/${context.appFileName}/${context.env}/?debug=1`,
            appDirName     : context.appDirName,
            appFileName    : context.appFileName,
            env            : context.env
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

    async appPost(req, res) {
        console.log('BackHostApp.appPost');
        const appInfos = await this.createApp(req);
        await res.json({appInfos: appInfos.map(appInfo => ({
            fullName: appInfo.fullName,
            envs    : appInfo.envs
        }))});
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

    async appGet(req, res) {
        console.log('BackHostApp.appGet');
        const module = new AppModule(this);
        const data = await module.fill();
        res.render('app/index', {
            // req           : req,
            hostApp: this,
            version: pkg.version,
            data   : data
        });
    }

    async monitorGet(req, res) {
        console.log('BackHostApp.monitorGet');
        const module = new MonitorModule(this);
        const response = module.fill();
        res.render('monitor/index', {
            version : pkg.version,
            response: response
        });
    }
    async logError(req, err) {
        console.log('BackHostApp.logError:', colors.red(err));
        if (!this.logCnn) return;
        try {
            await BackHostApp.createLog(this.logCnn, {
                type   : 'error',
                source : 'server',
                ip     : req ? req.headers['x-forwarded-for'] || req.connection.remoteAddress : null,
                message: err.message,
                stack  : err.stack.toString(),
                data   : req ? JSON.stringify({
                    route: err.context ? err.context.route : null,
                    body : req.body
                }, null, 4) : null
            });
        } catch (err) {
            console.error(colors.red(err));
        }
    }

    async logRequest(req, context: Context, time) {
        if (!this.logCnn) return;
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
            await BackHostApp.createLog(this.logCnn, {
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

    async _moduleGet(req, res, next) {
        console.warn(colors.magenta.underline('BackHostApp.moduleGet'), req.params);
        let context = null;
        try {
            context = new Context(req, this.getDomain(req));
            if (context.module === 'view') {
                await this.handleViewerGet(req, res, context);
            } else if (context.module === 'edit') {
                await this.handleEditorGet(req, res, context);
            } else {
                throw new Error(`unknown module: ${context.module}`);
            }
        } catch (err) {
            next(err);
        } finally {
            context.destroy();
        }
    }

    async _appGet(req, res, next) {
        console.warn(colors.magenta('appGet'));
        try {
            await this.appGet(req, res);
        } catch (err) {
            next(err);
        }
    }

    async _appPost(req, res, next) {
        console.warn(colors.magenta('appPost'), req.params);
        try {
            await this.appPost(req, res);
        } catch (err) {
            next(err);
        }
    }

    async _monitorGet(req, res, next) {
        console.warn(colors.magenta('monitorGet'));
        try {

            if (this.nodeEnv === 'development') {
                await this.monitorGet(req, res);
            } else {
                next();
            }
        } catch (err) {
            next(err);
        }
    }

    async _modulePost(req, res, next)  {
        console.warn(colors.magenta.underline('BackHostApp._modulePost'), req.params, req.body);
        let context = null;
        try {
            context = new Context(req, this.getDomain(req));
            if (context.module === 'view') {
                const time = await this.handleViewerPost(req, res, context);
                // await this.logRequest(req, context, time);
            } else if (context.module === 'edit') {
                const time = await this.handleEditorPost(req, res, context);
                // await this.logRequest(req, context, time);
            }
        } catch (err) {
            next(err);
        } finally {
            context.destroy();
        }
    }

    async _moduleFile(req, res, next) {
        // console.warn(colors.magenta.underline('BackHostApp._moduleFile'), req.originalUrl);
        let context = null;
        try {
            context = new Context(req, this.getDomain(req));
            await this.staticFile(req, res, context);
        } catch (err) {
            err.message = `_moduleFile error: ${err.message}`;
            next(err);
        } finally {
            context.destroy();
        }
    }

    _favicon(req, res, next) {
        //console.log('/favicon.ico');
        res.end();
    }

    async _e404(req, res, next) {
        console.warn(colors.magenta(req.method), 'error/404');
        const err = new MyError(`${req.method} ${req.originalUrl} page not found`);
        err.status = 404;
        next(err);
    }

    async _e500(err, req, res, next) {
        console.warn(colors.magenta('module.exports.e500:'), req.method, req.originalUrl);
        console.error(colors.red(err));
        res.status(err.status || 500);
        if (req.headers['content-type'] && req.headers['content-type'].indexOf('application/json') !== -1) {
            res.end(typeof err === 'string' ? err : err.message);
        } else {
            res.render('error', {
                message: err.message,
                error  : req.app.get('env') === 'development' ? err : {}
            });
        }
        await this.logError(req, err);
    }

    _getTest(req, res, next) {
        console.log('getTest');
        res.setHeader('Content-Type', 'text/plain;charset=utf-8');
        res.end('getTest');
    }

    _postTest(req, res, next) {
        console.log('postTest', req.body);
        res.json({foo: 'bar'});
    }

    createAndRunHttpServer(host, port) {
        const httpServer = http.createServer(this.server);
        httpServer.on('error', this.onHttpServerError.bind(this));
        httpServer.listen(port, host, () => {
            if (process.send) {
                process.send('online');
            }
            const appsDirPath = path.resolve(this.appsDirPath);
            console.log(`QForms server v${pkg.version} listening on http://${host}:${port}/app\n\tprocess.env.NODE_ENV: ${process.env.NODE_ENV}\n\tappsDirPath: ${appsDirPath}\n\tmonitor: http://${host}:${port}/monitor`);
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

}

export = BackHostApp;
