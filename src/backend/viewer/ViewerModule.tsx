import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { Context } from '../Context';
import { BkHelper } from '../BkHelper';
import { BackHostApp } from '../BackHostApp';
import { BkApplication } from './BkModel/BkApplication/BkApplication';
import { MyError } from '../MyError';
import { BkModel } from './BkModel/BkModel';
import { Result } from '../../Result';
import { BkDataSource } from './BkModel/BkDataSource/BkDataSource';
import { Links } from '../Links';
import { Scripts } from '../Scripts';
import { Application } from '../../frontend/viewer/Model/Application/Application';
import { ApplicationController } from '../../frontend/viewer/Controller/ModelController/ApplicationController/ApplicationController';
import { login } from './login';
import { FrontHostApp } from '../../frontend/common';

const pkg = require('../../../package.json');

// to compile without using
export {
    TableForm,
    NoSqlDataSource,
    TextBoxField,
    TableFormTextBoxFieldController,
    RowForm,
} from '../../frontend/viewer';

// post actions
const ACTIONS = [
    'page',
    'select', // select
    'insert', // insert
    'update', // update
    '_delete', // delete
    'rpc',
    'logout',
    'test',
];

export class ViewerModule {
    hostApp: BackHostApp;
    css: string[];
    js: string[];

    constructor(hostApp: BackHostApp) {
        this.hostApp = hostApp;
    }

    async init() {
        console.log('ViewerModule.init', 'getFrontendDirPath:', this.hostApp.getFrontendDirPath());
        this.css = (
            await BkHelper.getFilePaths(
                path.join(this.hostApp.getFrontendDirPath(), 'viewer/public'),
                'css',
            )
        ).map((path) => `/viewer/public/${path}`);
        this.js = (
            await BkHelper.getFilePaths(
                path.join(this.hostApp.getFrontendDirPath(), 'viewer/public'),
                'js',
            )
        ).map((path) => `/viewer/public/${path}`);
        console.log('ViewerModule.css:', this.css);
        console.log('ViewerModule.js:', this.js);
        if (!this.js.length) throw new Error('no qforms js');
    }

    getLinks() {
        return this.css;
    }

    getScripts() {
        return this.js;
    }

    async handleViewerGet(context: Context, bkApplication: BkApplication) {
        console.log(
            'ViewerModule.handleViewerGet',
            context.query,
            context.getReq().url,
            // Object.keys(context.query).map((name) => typeof context.query[name]),
        );

        if (
            bkApplication.isAuthentication() &&
            !(context.getReq().session.user && context.getReq().session.user[context.getRoute()])
        ) {
            await this.loginGet(context, bkApplication);
        } else {
            await bkApplication.connect(context);
            try {
                await bkApplication.initContext(context);
                const html = await this.renderHtml(bkApplication, context);
                context.getRes().end(html);
            } finally {
                await bkApplication.release(context);
            }
        }
    }

    async renderHtml(bkApplication: BkApplication, context: Context): Promise<string> {
        console.log('ViewerModule.renderHtml');

        const links = ReactDOMServer.renderToStaticMarkup(
            <Links links={[...this.getLinks(), ...bkApplication.links]} />,
        );
        const scripts = ReactDOMServer.renderToStaticMarkup(
            <Scripts scripts={[...this.getScripts(), ...bkApplication.scripts]} />,
        );
        const data = await bkApplication.fill(context);

        // frontHostApp
        const frontHostApp = new FrontHostApp({
            debug: context.isDebugMode(),
            url: context.getUrl(),
            cookies: context.getCookies(),
        });

        // application
        const application = new Application(data);
        application.init();

        // applicationController
        const applicationController = ApplicationController.create(application, frontHostApp);
        applicationController.init();

        const appViewHtml = ReactDOMServer.renderToString(
            React.createElement(applicationController.getViewClass(), {
                ctrl: applicationController,
                onCreate: (c) => {},
            } as any),
        );
        // console.log('appViewHtml:', appViewHtml);

        const html = bkApplication.renderIndexHtml(
            context,
            applicationController,
            pkg.version,
            links,
            scripts,
            data,
            appViewHtml,
        );

        return html;
    }

    async loginGet(context: Context, application: BkApplication) {
        console.log('ViewerModule.loginGet');
        const links = ReactDOMServer.renderToStaticMarkup(
            <Links links={[...this.getLinks(), ...application.links]} />,
        );
        const scripts = ReactDOMServer.renderToStaticMarkup(
            <Scripts scripts={[...this.getScripts(), ...application.scripts]} />,
        );
        const html = login(pkg.version, context, application, links, scripts, {
            name: application.getName(),
            text: application.getText(),
            title: application.getTitle(context),
            errMsg: null,
            username: context.query.username,
        });
        context.getRes().end(html);
    }

    async handleViewerPost(context: Context, application: BkApplication) {
        // console.log('ViewerModule.handleViewerPost');
        if (context.getReq().body.action === 'login') {
            await this.loginPost(context, application);
        } else {
            if (
                application.isAuthentication() &&
                !(
                    context.getReq().session.user &&
                    context.getReq().session.user[context.getRoute()]
                )
            ) {
                throw new MyError({ message: 'Unauthorized', status: 401, context });
            }
            if (ACTIONS.indexOf(context.getReq().body.action) === -1) {
                throw new Error(`unknown action: ${context.getReq().body.action}`);
            }
            return await this[context.getReq().body.action](context, application);
        }
    }

    async loginPost(context: Context, application: BkApplication): Promise<void> {
        console.log('ViewerModule.loginPost');
        const req = context.getReq();
        const res = context.getRes();
        if (req.body.tzOffset === undefined) throw new Error('no tzOffset');
        if (req.body.username === undefined) throw new Error('no username');
        if (req.body.password === undefined) throw new Error('no password');
        // const application = this.getApplication(context);
        await application.connect(context);
        try {
            const user = await application.authenticate(
                context,
                req.body.username,
                req.body.password,
            );
            if (user) {
                if (!user.id) throw new Error('no user id');
                if (!user.name) throw new Error('no user name');
                if (req.session.user === undefined) {
                    req.session.user = {};
                }
                req.session.ip = context.getIp();
                req.session.tzOffset = JSON.parse(req.body.tzOffset);
                req.session.user[context.getRoute()] = user;
                res.redirect(req.url);
                this.getHostApp().logEvent(
                    context,
                    `login ${application.getName()}/${context.getDomain()} ${user.name}`,
                );
            } else {
                // const users = await application.getUsers(context);
                const links = ReactDOMServer.renderToStaticMarkup(
                    <Links links={[...this.getLinks(), ...application.links]} />,
                );
                const scripts = ReactDOMServer.renderToStaticMarkup(
                    <Scripts scripts={[...this.getScripts(), ...application.scripts]} />,
                );
                const html = login(pkg.version, context, application, links, scripts, {
                    name: application.getName(),
                    text: application.getText(),
                    title: application.getTitle(context),
                    errMsg: application.getText().login.WrongUsernameOrPassword,
                    username: req.body.username,
                    password: req.body.password,
                });
                res.end(html);
            }
        } finally {
            await application.release(context);
        }
    }

    // action (fill page)
    async page(context: Context, application: BkApplication) {
        console.log('ViewerModule.page', context.getReq().body.page);
        const req = context.getReq();
        const res = context.getRes();
        await application.connect(context);
        try {
            await application.initContext(context);
            const page = await application.getPage(context, req.body.page);
            const response = await page.fill(context);
            if (response === undefined) throw new Error('page action: response is undefined');
            await res.json({ page: response });
        } finally {
            await application.release(context);
        }
    }

    // action
    async select(context: Context, application: BkApplication) {
        console.log('ViewerModule.select', context.getReq().body.page);
        const req = context.getReq();
        const res = context.getRes();
        const start = Date.now();
        let dataSource: BkDataSource;
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
            const [rows, count] = await dataSource.read(context);
            const time = Date.now() - start;
            console.log('select time:', time);
            await res.json({ rows, count, time });
            return time;
        } finally {
            await dataSource.getDatabase().release(context);
        }
    }

    // action
    async insert(context: Context, application: BkApplication) {
        console.log('ViewerModule.insert', context.getReq().body.page);
        const req = context.getReq();
        const res = context.getRes();
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
                const result = await dataSource.create(context);
                if (result === undefined) throw new Error('insert action: result is undefined');
                await database.commit(context);
                await res.json(result);
                this.hostApp.broadcastResult(application, context, result);
            } catch (err) {
                await database.rollback(context, err);
                throw err;
            }
        } finally {
            await database.release(context);
        }
    }

    // action
    async update(context: Context, application: BkApplication) {
        console.log('ViewerModule.update', context.getReq().body.page);
        const req = context.getReq();
        const res = context.getRes();
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
                this.hostApp.broadcastResult(application, context, result);
            } catch (err) {
                await database.rollback(context, err);
                throw err;
            }
        } finally {
            await database.release(context);
        }
    }

    // action
    async _delete(context: Context, application: BkApplication) {
        console.log('ViewerModule._delete', context.getReq().body.page);
        const req = context.getReq();
        const res = context.getRes();
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
                this.hostApp.broadcastResult(application, context, result);
            } catch (err) {
                await database.rollback(context, err);
                throw err;
            }
        } finally {
            await database.release(context);
        }
    }

    // action
    async rpc(context: Context, application: BkApplication) {
        console.log('ViewerModule.rpc', context.getReq().body);
        const req = context.getReq();
        const res = context.getRes();
        // const application = this.getApplication(context);
        // await application.initContext(context);
        let model: BkModel;
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
                this.hostApp.broadcastResult(application, context, _result);
            } else {
                await res.json(result);
                if (result instanceof Result) {
                    this.hostApp.broadcastResult(application, context, result);
                }
            }
        } catch (err) {
            const errorMessage = err.message;
            err.message = `rpc error ${req.body.name}: ${err.message}`;
            err.context = context;
            await this.hostApp.logError(err, req);
            await res.json({ errorMessage });
        }
    }

    // action
    async logout(context: Context, application: BkApplication) {
        console.log('ViewerModule.logout');
        const req = context.getReq();
        const res = context.getRes();
        if (!req.session.user || !req.session.user[context.getRoute()]) {
            throw new Error(`no user for route ${context.getRoute()}`);
        }
        delete req.session.user[context.getRoute()];
        await BkHelper.Session_save(req.session);
        await res.json(null);
    }

    // action
    async test(context: Context, application: BkApplication) {
        console.log('ViewerModule.test', context.getReq().body);
        const req = context.getReq();
        const res = context.getRes();
        // const result = await Test[req.body.name](req, res, context, application);
        // if (result === undefined) throw new Error('test action: result is undefined');
        await res.json(null);
    }

    async handleViewerGetFile(context: Context, application: BkApplication, next) {
        await application.handleGetFile(context, next);
    }

    getHostApp() {
        return this.hostApp;
    }
}
