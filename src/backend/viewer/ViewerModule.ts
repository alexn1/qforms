import Context from "../Context";

const path = require('path');
const pkg     = require('../../../package.json');

import Helper from "../Helper";
import BackHostApp from '../BackHostApp';
import Application from "./Model/Application/Application";
import MyError from "../MyError";
import Model from "./Model/Model";
import Result from "../Result";

// post actions
const ACTIONS = [
    'page',
    'select',       // select
    'insert',       // insert
    'update',       // update
    '_delete',      // delete
    'rpc',
    'logout',
    'test',
];

class ViewerModule {
    backHostApp: BackHostApp;
    css: string[];
    js : string[];
    constructor(backHostApp: BackHostApp) {
        this.backHostApp = backHostApp;
    }
    async init() {
        this.css = (await Helper.getFilePaths(path.join(this.backHostApp.getFrontendDirPath(), 'viewer'), 'css')).map(path => `/viewer/${path}`);
        this.js  = (await Helper.getFilePaths(path.join(this.backHostApp.getFrontendDirPath(), 'viewer'), 'js' )).map(path => `/viewer/${path}`);
        // console.log('viewer.css:', this.css);
        // console.log('viewer.js:' , this.js);
    }
    getLinks() {
        return [
            ...(this.backHostApp.commonModule.css),
            ...(this.css)
        ];
    }
    getScripts() {
        return [
            // '/lib/react/react.development.js',
            // '/lib/react/react-dom.development.js',
            '/lib/react/react.production.min.js',
            '/lib/react/react-dom.production.min.js',
            ...(this.backHostApp.commonModule.js),
            ...(this.js)
        ];
    }
    async handleViewerGet(context: Context, application: Application) {
        console.log('ViewerModule.handleViewerGet', context.query/*, Object.keys(context.query).map(name => typeof context.query[name])*/);
        if (application.isAuthentication() && !(context.getReq().session.user && context.getReq().session.user[context.getRoute()])) {
            await this.loginGet(context, application);
        } else {
            await application.connect(context);
            try {
                await application.initContext(context);
                const response =  await application.fill(context);
                context.getRes().render('viewer/index', {
                    version       : pkg.version,
                    application   : application,
                    context       : context,
                    response      : response,
                    links         : [
                        ...this.getLinks(),
                        ...application.links
                    ],
                    scripts       : [
                        ...this.getScripts(),
                        ...application.scripts
                    ]
                });
            } finally {
                application.release(context);
            }
        }
    }
    async loginGet(context: Context, application: Application) {
        console.log('ViewerModule.loginGet');
        // const application = this.getApplication(context);
        // const users = await application.getUsers(context);
        context.getRes().render('viewer/login', {
            version    : pkg.version,
            context    : context,
            application: application,
            links      : [
                ...this.getLinks(),
                ...application.links
            ],
            scripts: [
                ...this.getScripts(),
                ...application.scripts
            ],
            data: {
                name  : application.getName(),
                text  : application.getText(),
                title : application.getTitle(context),
                errMsg: null,
            }
        });
    }
    async handleViewerPost(context: Context, application: Application) {
        // console.log('ViewerModule.handleViewerPost');
        if (context.getReq().body.action === 'login') {
            await this.loginPost(context, application);
        } else {
            if (application.isAuthentication() && !(context.getReq().session.user && context.getReq().session.user[context.getRoute()])) {
                throw new MyError({message: 'Unauthorized', status: 401, context});
            }
            if (ACTIONS.indexOf(context.getReq().body.action) === -1) {
                throw new Error(`unknown action: ${context.getReq().body.action}`);
            }
            return await this[context.getReq().body.action](context.getReq(), context.getRes(), context, application);
        }
    }
    async loginPost(context: Context, application: Application): Promise<void> {
        console.log('ViewerModule.loginPost');
        const req = context.getReq();
        const res = context.getRes();
        if (req.body.tzOffset === undefined) throw new Error('no tzOffset');
        if (req.body.username === undefined) throw new Error('no username');
        if (req.body.password === undefined) throw new Error('no password');
        // const application = this.getApplication(context);
        await application.connect(context);
        try {
            const user = await application.authenticate(context, req.body.username, req.body.password);
            if (user) {
                if (!user.id)   throw new Error('no user id');
                if (!user.name) throw new Error('no user name');
                if (req.session.user === undefined) {
                    req.session.user = {};
                }
                req.session.ip       = context.getIp();
                req.session.tzOffset = JSON.parse(req.body.tzOffset);
                req.session.user[context.getRoute()] = user;
                res.redirect(req.url);
            } else {
                // const users = await application.getUsers(context);
                res.render('viewer/login', {
                    version    : pkg.version,
                    context    : context,
                    application: application,
                    links         : [
                        ...this.getLinks(),
                        ...application.links
                    ],
                    scripts       : [
                        ...this.getScripts(),
                        ...application.scripts
                    ],
                    data: {
                        name  : application.getName(),
                        text  : application.getText(),
                        title : application.getTitle(context),
                        errMsg: application.getText().login.WrongUsernameOrPassword,
                        username: req.body.username,
                        password: req.body.password,
                    }
                });
            }
        } finally {
            application.release(context);
        }
    }

    // action (fill page)
    async page(req, res, context: Context, application: Application) {
        console.log('ViewerModule.page', req.body.page);
        await application.connect(context);
        try {
            await application.initContext(context);
            const page = await application.getPage(context, req.body.page);
            const response = await page.fill(context);
            if (response === undefined) throw new Error('page action: response is undefined');
            await res.json({page: response});
        } finally {
            application.release(context);
        }
    }

    // action
    async select(req, res, context: Context, application: Application) {
        console.log('ViewerModule.select', req.body.page);
        const start = Date.now();
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
            await application.initContext(context);
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
    async insert(req, res, context: Context, application: Application) {
        console.log('ViewerModule.insert', req.body.page);
        // const application = this.getApplication(context);
        const page = await application.getPage(context, req.body.page);
        const form = page.getForm(req.body.form);
        const dataSource = form.getDataSource('default');
        const database = dataSource.getDatabase();
        await database.connect(context);
        try {
            await application.initContext(context);
            await database.begin(context);
            try {
                const result = await dataSource.insert(context);
                if (result === undefined) throw new Error('insert action: result is undefined');
                await database.commit(context);
                await res.json(result);
                this.backHostApp.broadcastResult(application, context, result);
            } catch (err) {
                await database.rollback(context, err);
                throw err;
            }
        } finally {
            database.release(context);
        }
    }

    // action
    async update(req, res, context: Context, application: Application) {
        console.log('ViewerModule.update', req.body.page);
        // const application = this.getApplication(context);
        const page = await application.getPage(context, req.body.page);
        const form = page.getForm(req.body.form);
        const dataSource = form.getDataSource('default');
        const database = dataSource.getDatabase();
        await database.connect(context);
        try {
            await application.initContext(context);
            await database.begin(context);
            try {
                const result = await dataSource.update(context);
                if (result === undefined) throw new Error('action update: result is undefined');
                await database.commit(context);
                await res.json(result);
                this.backHostApp.broadcastResult(application, context, result);
            } catch (err) {
                await database.rollback(context, err);
                throw err;
            }
        } finally {
            database.release(context);
        }
    }

    // action
    async _delete(req, res, context: Context, application: Application) {
        console.log('ViewerModule._delete', req.body.page);
        // const application = this.getApplication(context);
        const page = await application.getPage(context, req.body.page);
        const form = page.getForm(req.body.form);
        const dataSource = form.getDataSource('default');
        const database = dataSource.getDatabase();
        await database.connect(context);
        try {
            await application.initContext(context);
            await database.begin(context);
            try {
                const result = await dataSource.delete(context);
                if (result === undefined) throw new Error('delete result is undefined');
                await database.commit(context);
                await res.json(result);
                this.backHostApp.broadcastResult(application, context, result);
            } catch (err) {
                await database.rollback(context, err);
                throw err;
            }
        } finally {
            database.release(context);
        }
    }

    // action
    async rpc(req, res, context: Context, application: Application) {
        console.log('ViewerModule.rpc', req.body);
        // const application = this.getApplication(context);
        // await application.initContext(context);
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
            if (Array.isArray(result)) {
                const [response, _result] = result;
                await res.json(response);
                if (!(_result instanceof Result)) {
                    throw new Error('_result is not Result');
                }
                this.backHostApp.broadcastResult(application, context, _result);
            } else {
                await res.json(result);
                if (result instanceof Result) {
                    this.backHostApp.broadcastResult(application, context, result);
                }
            }
        } catch (err) {
            const errorMessage = err.message;
            err.message = `rpc error ${req.body.name}: ${err.message}`;
            err.context = context;
            await this.backHostApp.logError(err, req);
            await res.json({errorMessage});
        }
    }

    // action
    async logout(req, res, context: Context, application: Application) {
        console.log('ViewerModule.logout');
        if (!req.session.user || !req.session.user[context.getRoute()]) {
            throw new Error(`no user for route ${context.getRoute()}`);
        }
        delete req.session.user[context.getRoute()];
        await Helper.Session_save(req.session);
        await res.json(null);
    }

    // action
    async test(req, res, context: Context, application: Application) {
        console.log('ViewerModule.test', req.body);
        // const result = await Test[req.body.name](req, res, context, application);
        // if (result === undefined) throw new Error('test action: result is undefined');
        await res.json(null);
    }

}
export = ViewerModule;
