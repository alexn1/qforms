const fs      = require('fs');
const path    = require('path');
const qforms  = require('./qforms');
const Test    = require('./test/Test');
const pkg     = require('../../package.json');
const Helper  = require('./Helper');
const PostgreSqlDatabase = require('./viewer/Model/Database/PostgreSqlDatabase/PostgreSqlDatabase');
const logConfig = require('./log.config.json');
const MonitorModel = require('./monitor/MonitorModel');
// const DataSource = require('./viewer/Model/DataSource/DataSource');
const JsonFile = require('../backend/JsonFile');

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

class HostApp {
    constructor(server) {
        // console.log('HostApp.constructor');
        this.server = server;
        this.applications = {};
        this.logCnn = null;
    }

    init() {
        const engineDirPath  = path.join(__dirname, '..');
        const backendDirPath = __dirname;
        const publicDirPath = path.join(engineDirPath,  'frontend');
        this.logCnn = PostgreSqlDatabase.createPool(logConfig);

        // environment
        const appsDirPath = Helper.getCommandLineParams().appsDirPath || pkg.config.appsDirPath;
        if (!fs.existsSync(appsDirPath)) {
            console.error(`Application folder '${path.resolve(appsDirPath)}' doesn't exist`);
            process.exit(1);
            return;
        }
        // vars
        // this.server.set('appsDirPath'    , appsDirPath);
        this.server.set('handleException', Helper.getCommandLineParams().handleException || true);
        this.server.set('view engine'    , 'ejs');
        this.server.set('views'          , backendDirPath);
        this.server.set('runtime'        , path.join(engineDirPath,  'runtime'));
        this.server.set('temp'           , path.join(engineDirPath,  'runtime/temp'));
        this.server.enable('strict routing');

        this.publicDirPath = publicDirPath;
        this.appsDirPath  = appsDirPath;

        // production by default to disable editor
        /*if (!process.env.NODE_ENV) {
            server.set('env', 'production');
        }
        this.nodeEnv       = this.server.get('env');*/


        // nodeEnv
        this.nodeEnv = process.env.NODE_ENV;
        if (!this.nodeEnv) {
            this.nodeEnv = 'production';
        }
    }

    async createApplicationIfNotExists(req, context) {
        // console.log(`HostApp.createApplicationIfNotExists debug: ${context.query.debug}, env: ${context.env}`);
        if (!context.route) throw new Error('no context.route');
        const route = context.route;
        const application = this.applications[route];
        if (application) {
            if (req.method === 'GET' && (context.query.debug === 1 || context.module === 'edit')) {
                await application.deinit();
                return this.applications[route] = await this.createApplication(this.getAppFilePath(context), context.env);
            }
            return application;
        }
        return this.applications[route] = await this.createApplication(this.getAppFilePath(context), context.env);
    }

    getApplication(context) {
        if (!context.route) throw new Error('no context.route');
        const application = this.applications[context.route];
        if (!application) throw new Error(`no application for route: ${context.route}`);
        return application;
    }

    getAppFilePath(context) {
        return path.join(this.appsDirPath, context.appDirName, context.appFileName + '.json');
    }

    async createApplication(appFilePath, env) {
        // console.log(`HostApp.createApplication: ${appFilePath}`);
        const application = await qforms.Application.create(appFilePath, this, env);
        await application.init();
        return application;
    }

    async handleViewerGet(req, res, context) {
        console.log('HostApp.handleViewerGet', context.query/*, Object.keys(context.query).map(name => typeof context.query[name])*/);
        await this.createApplicationIfNotExists(req, context);
        const application = this.getApplication(context);
        if (this.getApplication(context).isAuthentication() && !(req.session.user && req.session.user[context.route])) {
            this.loginGet(req, res, context);
        } else {
            const data = await this.fill(req, context);
            res.render('viewer/view', {
                version       : pkg.version,
                application   : application,
                title         : application.getTitle(context, data),
                debugApp      : context.query.debug,
                data          : data,
            });
        }
    }

    async handleViewerPost(req, res, context) {
        // console.log('HostApp.handleViewerPost');
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

    async loginGet(req, res, context) {
        console.log('HostApp.loginGet');
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

    async loginPost(req, res, context) {
        console.log('HostApp.loginPost');
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
    async fill(req, context) {
        console.log('HostApp.fill', this.getApplication(context).getName());
        const application = this.getApplication(context);
        const start = Date.now();
        await application.initContext(context);
        const data = await application.fill(context);
        data.time = Date.now() - start;
        return data;
    }

    // action (fill page)
    async page(req, res, context) {
        console.log('HostApp.page', req.body.page);
        const application = this.getApplication(context);
        await application.initContext(context);
        const page = await application.getPage(context, req.body.page);
        const response = await page.fill(context);
        if (response === undefined) throw new Error('page action: response is undefined');
        await res.json({page: response});
    }

    // action
    async update(req, res, context) {
        console.log('HostApp.update', req.body.page);
        const application = this.getApplication(context);
        await application.initContext(context);
        const page = await application.getPage(context, req.body.page);
        const form = page.getForm(req.body.form);
        const result = await form.update(context);
        if (result === undefined) throw new Error('action update: result is undefined');
        await res.json(result);
    }

    // action
    async select(req, res, context) {
        console.log('HostApp.select', req.body.page);
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
    async selectSingle(req, res, context) {
        console.log('HostApp.selectSingle', req.body.page);
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
    async selectMultiple(req, res, context) {
        console.log('HostApp.selectMultiple', req.body.page);
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
    async insert(req, res, context) {
        console.log('HostApp.insert', req.body.page);
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
    async _delete(req, res, context) {
        console.log('HostApp._delete', req.body.page);
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
    async rpc(req, res, context) {
        console.log('HostApp.rpc', req.body);
        const application = this.getApplication(context);
        await application.initContext(context);
        let model;
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
        const result = await model.rpc(req.body.name, context);
        if (result === undefined) throw new Error('rpc action: result is undefined');
        await res.json(result);
    }

    // action
    async logout(req, res, context) {
        console.log('HostApp.logout');
        if (!context.route) throw new Error('no context.route');
        if (!req.session.user || !req.session.user[context.route]) {
            throw new Error(`no user for route ${context.route}`);
        }
        delete req.session.user[context.route];
        await res.json(null);
    }

    // action
    async test(req, res, context) {
        console.log('HostApp.test', req.body);
        const result = await Test[req.body.name](req, res, context, this.getApplication(context));
        if (result === undefined) throw new Error('test action: result is undefined');
        await res.json(result);
    }

    async appFile(req, context, application) {
        // console.log('HostApp.appFile', context.uri);
        const filePath = path.join(application.appInfo.dirPath, 'build', context.uri);
        // console.log('filePath:', filePath);
        const ext = path.extname(filePath);
        if (['.css', '.js', '.map'].includes(ext)) {
            const exists = await qforms.Helper.exists(filePath);
            if (exists) {
                return [await qforms.Helper.readTextFile(filePath), ext];
            }
        }
        if (['.ttf', '.otf', '.png', '.jpg'].includes(ext)) {
            const exists = await qforms.Helper.exists(filePath);
            if (exists) {
                return [await qforms.Helper.readBinaryFile(filePath), ext];
            }
        }
        return null;
    }

    async viewerFile(req, res, context) {
        // console.log('HostApp.viewerFile');
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
            // console.error('file not found: ', req.originalUrl);
            // const base = `/view/${context.route}`;
            // const uri = req.originalUrl.replace(base, '');
            // console.log('uri', uri);
            const filePath = path.join(this.publicDirPath, context.uri);
            res.sendFile(filePath);
        }
    }

    async editorFile(req, res, context) {
        // console.log('HostApp.editorFile', context.uri);
        const application = this.getApplication(context);
        const content = await this.appFile(req, context, application);
        if (content !== null) {
            res.setHeader('content-type', 'text/css');
            res.send(content);
        } else {
            //console.error('file not found: ', req.originalUrl);
            // const base = `/edit/${context.route}`;
            // const uri = req.originalUrl.replace(base, '');
            const filePath = path.join(this.publicDirPath, context.uri);
            res.sendFile(filePath);
        }
    }

    async handleEditorGet(req, res, context) {
        console.log('HostApp.handleEditorGet');
        const application = await this.createApplicationIfNotExists(req, context);
        const appFile = new JsonFile(application.appInfo.filePath);
        await appFile.read();
        const app = JSON.parse(appFile.content);
        app.env = this.nodeEnv;

        res.render('editor/view', {
            version        : pkg.version,
            app            : app,
            runAppLink     : `/view/${application.appInfo.route}/?debug=1`,
            appDirName     : context.appDirName,
            appName        : appFile.getAttr('name'),
            env            : application.getEnv()
        });
    }

    async handleEditorPost(req, res, context) {
        console.log('HostApp.handleEditorPost', context.params);
        const application = await this.createApplicationIfNotExists(req, context);
        const appInfo = application.appInfo;
        if (EDITOR_CONTROLLERS.indexOf(req.body.controller) === -1) {
            throw new Error(`unknown controller: ${req.body.controller}`);
        }
        if (EDITOR_ACTIONS.indexOf(req.body.action) === -1) {
            throw new Error(`unknown action ${req.body.action}`);
        }
        const controllerClassName = `qforms.${req.body.controller}EditorController`;
        const ControllerClass = eval(controllerClassName);
        if (!ControllerClass) throw new Error(`no class with name ${controllerClassName}`);
        const method = req.body.action;
        const ctrl = new ControllerClass(appInfo, this, application);
        if (!ctrl[method]) throw new Error(`no method: ${controllerClassName}.${method}`);
        const result = await ctrl[method](context.params);
        // console.log('json result:', result);
        if (result === undefined) throw new Error('handleEditorPost: result is undefined');
        await res.json(result);
    }

    async appPost(req, res) {
        console.log('HostApp.appPost');
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
        await qforms.Helper.createDirIfNotExists(appDirPath);
        await qforms.ApplicationEditor.createAppFile(appFilePath, {name});
        const appInfos = await qforms.Helper.getAppInfos(this.appsDirPath);
        return appInfos;
    }

    async appGet(req, res) {
        console.log('HostApp.appGet');
        const appInfos = await qforms.Helper.getAppInfos(this.appsDirPath);
        // console.log('appInfos:', appInfos);
        res.render('app/view', {
            // req           : req,
            hostApp       : this,
            version       : pkg.version,
            data          : {
                nodeEnv : this.nodeEnv,
                appInfos: appInfos.map(appInfo => ({
                    fullName: appInfo.fullName,
                    envs    : appInfo.envs
                }))
            }
        });
    }

    async monitorGet(req, res) {
        console.log('HostApp.monitorGet');
        const model = new MonitorModel(this);
        const dump = model.dump();
        res.render('monitor/view', {
            version     : pkg.version,
            dump        : dump
        });
    }
    async logError(req, err) {
        console.log('HostApp.logError:', err.message);
        try {
            await HostApp.createLog(this.logCnn, {
                type   : 'error',
                source : 'server',
                ip     : req ? req.headers['x-forwarded-for'] || req.connection.remoteAddress : null,
                message: err.message,
                stack  : err.stack.toString(),
                data   : req ? JSON.stringify(req.body, null, 4) : null
            });
        } catch (err) {
            console.error(err);
        }
    }

    async logRequest(req, context, time) {
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
            await HostApp.createLog(this.logCnn, {
                type   : 'log',
                source : 'server',
                ip     : req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                message: message,
                data   : JSON.stringify(req.body, null, 4)
            });
        } catch (err) {
            console.error(err);
        }
    }

    static async createLog(cnn, values) {
        // console.log('HostApp.createLog', values);
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

}

module.exports = HostApp;
