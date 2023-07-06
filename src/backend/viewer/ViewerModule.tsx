import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { Context } from '../Context';
import { BkHelper } from '../BkHelper';
import { BackHostApp } from '../BackHostApp';
import { BkApplication } from './BkModel/BkApplication/BkApplication';
import { HttpError } from '../HttpError';
import { BkModel } from './BkModel/BkModel';
import { Result } from '../../Result';
import { BkDataSource } from './BkModel/BkDataSource/BkDataSource';
import { Links } from '../Links';
import { Scripts } from '../Scripts';
import { Application } from '../../frontend/viewer/Model/Application/Application';
import { ApplicationController } from '../../frontend/viewer/Controller/ModelController/ApplicationController/ApplicationController';
import { login } from './login';
import { FrontHostApp } from '../../frontend/common';
import { NextFunction } from 'connect';

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
    private css: string[];
    private js: string[];

    constructor(private hostApp: BackHostApp) {}

    async init() {
        console.debug(
            'ViewerModule.init',
            'getFrontendDirPath:',
            this.hostApp.getFrontendDirPath(),
        );
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
        console.debug('ViewerModule.css:', this.css);
        console.debug('ViewerModule.js:', this.js);
        if (!this.js.length) throw new Error('no qforms js');
    }

    getLinks() {
        return this.css;
    }

    getScripts() {
        return this.js;
    }

    async handleGet(context: Context, bkApplication: BkApplication): Promise<void> {
        console.debug(
            'ViewerModule.handleGet',
            context.getDomain(),
            context.query,
            context.getReq()!.url,
            // Object.keys(context.query).map((name) => typeof context.query[name]),
        );

        const req = context.getReq()!;

        if (
            bkApplication.isAuthentication() &&
            !(req.session.user && req.session.user[context.getRoute()])
        ) {
            await this.loginGet(context, bkApplication);
        } else {
            context.setVersionHeaders(pkg.version, bkApplication.getVersion());
            await this.index(context, bkApplication);
        }
    }

    async handlePost(context: Context, application: BkApplication): Promise<void> {
        // console.debug('ViewerModule.handlePost');
        const req = context.getReq()!;
        if (req.body.action === 'login') {
            await this.loginPost(context, application);
        } else {
            if (
                application.isAuthentication() &&
                !(req.session.user && req.session.user[context.getRoute()])
            ) {
                throw new HttpError({ message: 'Unauthorized', status: 401, context });
            }

            await this.handleAction(context, application);
        }
    }

    async handleAction(context: Context, application: BkApplication) {
        const req = context.getReq()!;

        if (ACTIONS.indexOf(req.body.action) === -1) {
            throw new Error(`unknown action: ${req.body.action}`);
        }
        context.setVersionHeaders(pkg.version, application.getVersion());
        await this[req.body.action](context, application);
    }

    async renderHtml(bkApplication: BkApplication, context: Context): Promise<string> {
        console.debug('ViewerModule.renderHtml');

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
        // console.debug('appViewHtml:', appViewHtml);

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
        console.debug('ViewerModule.loginGet');
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

    async loginPost(context: Context, application: BkApplication): Promise<void> {
        console.debug('ViewerModule.loginPost');
        const req = context.getReq()!;
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

    // action (index page, action by default for GET request)
    async index(context: Context, bkApplication: BkApplication): Promise<void> {
        console.debug('ViewerModule.index');
        const res = context.getRes();
        await bkApplication.connect(context);
        try {
            await bkApplication.initContext(context);
            const html = await this.renderHtml(bkApplication, context);
            res.end(html);
        } finally {
            await bkApplication.release(context);
        }
    }

    // action (fill page)
    async page(context: Context, application: BkApplication): Promise<void> {
        console.debug('ViewerModule.page', context.getReq()!.body.page);
        const req = context.getReq()!;
        const res = context.getRes();
        await application.connect(context);
        try {
            await application.initContext(context);
            const page = await application.getPage(context, req.body.page);
            const response = await page.fill(context);
            if (response === undefined) throw new Error('page action: response is undefined');
            res.json({ page: response });
        } finally {
            await application.release(context);
        }
    }

    // action
    async select(context: Context, application: BkApplication): Promise<void> {
        console.debug('ViewerModule.select', context.getReq()!.body.page);
        const req = context.getReq()!;
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
            console.debug('select time:', time);
            res.json({ rows, count, time });
        } finally {
            await dataSource.getDatabase().release(context);
        }
    }

    // action
    async insert(context: Context, application: BkApplication): Promise<void> {
        console.debug('ViewerModule.insert', context.getReq()!.body.page);
        const req = context.getReq()!;
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
                res.json(result);
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
    async update(context: Context, application: BkApplication): Promise<void> {
        console.debug('ViewerModule.update', context.getReq()!.body.page);
        const req = context.getReq()!;
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
                res.json(result);
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
    async _delete(context: Context, application: BkApplication): Promise<void> {
        console.debug('ViewerModule._delete', context.getReq()!.body.page);
        const req = context.getReq()!;
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
                const result = await dataSource!.delete(context);
                if (result === undefined) throw new Error('delete result is undefined');
                await database.commit(context);
                res.json(result);
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
    async rpc(context: Context, application: BkApplication): Promise<void> {
        console.debug('ViewerModule.rpc', context.getReq()!.body);
        const req = context.getReq()!;
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
                res.json(response);
                if (!(_result instanceof Result)) {
                    throw new Error('_result is not Result');
                }
                this.hostApp.broadcastResult(application, context, _result);
            } else {
                res.json(result);
                if (result instanceof Result) {
                    this.hostApp.broadcastResult(application, context, result);
                }
            }
        } catch (err: any) {
            const errorMessage = err.message;
            err.message = `rpc error ${req.body.name}: ${err.message}`;
            err.context = context;
            await this.hostApp.logError(err, req);
            res.json({ errorMessage });
        }
    }

    // action
    async logout(context: Context, application: BkApplication): Promise<void> {
        console.debug('ViewerModule.logout');
        const req = context.getReq()!;
        const res = context.getRes();
        if (!req.session.user || !req.session.user[context.getRoute()]) {
            throw new Error(`no user for route ${context.getRoute()}`);
        }
        delete req.session.user[context.getRoute()];
        await BkHelper.Session_save(req.session);
        res.json(null);
    }

    // action
    async test(context: Context, application: BkApplication) {
        console.debug('ViewerModule.test', context.getReq()!.body);
        const req = context.getReq();
        const res = context.getRes();
        // const result = await Test[req.body.name](req, res, context, application);
        // if (result === undefined) throw new Error('test action: result is undefined');
        res.json(null);
    }

    async handleGetFile(context: Context, application: BkApplication, next: NextFunction) {
        await application.handleGetFile(context, next);
    }

    getHostApp() {
        return this.hostApp;
    }
}
