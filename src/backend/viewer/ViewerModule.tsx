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
import { debug } from '../../console';
import { pConsole } from '../../pConsole';
import {
    BaseDto,
    DeleteActionDto,
    InsertActionDto,
    LoginDto,
    PageActionDto,
    RpcActionDto,
    SelectActionDto,
    UpdateActionDto,
} from '../../types';
import { Session_deleteUser, Session_save } from '../Session';

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
    'insert', // insert     create
    'select', // select     read
    'update', // update     update
    '_delete', // delete    delete
    'page',
    'rpc',
    'logout',
    'test',
];

export class ViewerModule {
    private css: string[];
    private js: string[];

    constructor(private hostApp: BackHostApp) {}

    async init() {
        // debug('ViewerModule.init', 'getFrontendDirPath:', this.hostApp.getFrontendDirPath());
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
        debug('ViewerModule.css:', this.css);
        debug('ViewerModule.js:', this.js);
        if (!this.js.length) throw new Error('no qforms js');
    }

    getLinks(): string[] {
        return this.css;
    }

    getScripts(): string[] {
        return this.js;
    }

    async handleGet(context: Context, bkApplication: BkApplication): Promise<void> {
        pConsole.debug(
            'ViewerModule.handleGet',
            context.getDomain(),
            context.getReq()!.url,
            context.getReq()!.params,
            context.getQuery(),
            // Object.keys(context.query).map((name) => typeof context.query[name]),
        );

        const session = context.getSession();

        if (
            bkApplication.isAuthentication() &&
            !(session.user && session.user[context.getRoute()])
        ) {
            await this.loginGet(context, bkApplication);
        } else {
            context.setVersionHeaders(pkg.version, bkApplication.getVersion());

            // handle actions
            const { action } = context.getQuery();
            pConsole.debug('get action:', action);

            await this.index(context, bkApplication);
        }
    }

    async handlePost(context: Context, application: BkApplication): Promise<void> {
        // debug('ViewerModule.handlePost');
        const { action } = context.getBody() as BaseDto;
        if (action === 'login') {
            await this.loginPost(context, application);
        } else {
            const user = context.getUser();
            if (application.isAuthentication() && !user) {
                throw new HttpError({ message: 'Unauthorized', status: 401, context });
            }

            await this.handleAction(context, application);
        }
    }

    async handleAction(context: Context, application: BkApplication) {
        const { action } = context.getBody() as BaseDto;
        if (ACTIONS.indexOf(action) === -1) {
            throw new Error(`unknown action: ${action}`);
        }
        context.setVersionHeaders(pkg.version, application.getVersion());
        await (this as any)[action](context, application);
    }

    async renderHtml(bkApplication: BkApplication, context: Context): Promise<string> {
        debug('ViewerModule.renderHtml');

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

        const element = React.createElement(applicationController.getViewClass(), {
            ctrl: applicationController,
        });

        const appViewHtml = ReactDOMServer.renderToString(element);
        // debug('appViewHtml:', appViewHtml);

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
        debug('ViewerModule.loginGet');
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
            username: context.getQuery().username,
        });
        context.getRes().end(html);
    }

    async loginPost(context: Context, application: BkApplication): Promise<void> {
        debug('ViewerModule.loginPost');
        const { tzOffset, username, password } = context.getBody() as LoginDto;
        if (tzOffset === undefined) throw new Error('no tzOffset');
        if (username === undefined) throw new Error('no username');
        if (password === undefined) throw new Error('no password');

        const req = context.getReq()!;
        const res = context.getRes();

        await application.connect(context);
        try {
            const user = await application.authenticate(context, username, password);
            if (user) {
                if (!user.id) throw new Error('no user id');
                if (!user.name) throw new Error('no user name');
                const session = context.getSession();
                if (session.user === undefined) session.user = {};
                session.user[context.getRoute()] = user;
                session.ip = context.getIp();
                session.tzOffset = JSON.parse(tzOffset);

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
                    username: username,
                    password: password,
                });
                res.status(401).end(html);
            }
        } finally {
            await application.release(context);
        }
    }

    // action (index page, action by default for GET request)
    async index(context: Context, bkApplication: BkApplication): Promise<void> {
        debug('ViewerModule.index');
        const res = context.getRes();
        await bkApplication.connect(context);
        try {
            await bkApplication.initContext(context);
            const html = await this.renderHtml(bkApplication, context);
            res.setHeader('Content-Type', 'text/html; charset=utf-8').end(html);
        } finally {
            await bkApplication.release(context);
        }
    }

    // action (fill page)
    async page(context: Context, application: BkApplication): Promise<void> {
        debug('ViewerModule.page', context.getReq()!.body.page);
        const body = context.getBody() as PageActionDto;
        await application.connect(context);
        try {
            await application.initContext(context);
            const page = await application.getPage(context, body.page);
            const response = await page.fill(context);
            if (response === undefined) throw new Error('page action: response is undefined');
            context.getRes().json({ page: response });
        } finally {
            await application.release(context);
        }
    }

    // action
    async select(context: Context, application: BkApplication): Promise<void> {
        debug('ViewerModule.select', context.getReq()!.body.page);
        const body = context.getBody() as SelectActionDto;
        const start = Date.now();
        let dataSource: BkDataSource;
        if (body.page) {
            const page = await application.getPage(context, body.page);
            if (body.form) {
                dataSource = page.getForm(body.form).getDataSource(body.ds);
            } else {
                dataSource = page.getDataSource(body.ds);
            }
        } else {
            dataSource = application.getDataSource(body.ds);
        }

        await dataSource.getDatabase().use(context, async (database) => {
            await application.initContext(context);
            const [rows, count] = await dataSource.read(context);
            const time = Date.now() - start;
            debug('select time:', time);
            context.getRes().json({ rows, count, time });
        });
    }

    // action
    async insert(context: Context, application: BkApplication): Promise<void> {
        debug('ViewerModule.insert', context.getReq()!.body.page);
        const body = context.getBody() as InsertActionDto;
        const page = await application.getPage(context, body.page);
        const form = page.getForm(body.form);
        const dataSource = form.getDataSource('default');
        await dataSource.getDatabase().use(context, async (database) => {
            await application.initContext(context);
            const result = await database.transaction<Result>(context, async () => {
                const result = await dataSource.create(context);
                if (result === undefined) throw new Error('insert action: result is undefined');
                return result;
            });
            context.getRes().json(result);
            this.hostApp.broadcastResult(application, context, result);
        });
    }

    // action
    async update(context: Context, application: BkApplication): Promise<void> {
        debug('ViewerModule.update', context.getReq()!.body.page);
        const body = context.getBody() as UpdateActionDto;
        const page = await application.getPage(context, body.page);
        const form = page.getForm(body.form);
        const dataSource = form.getDataSource('default');
        await dataSource.getDatabase().use(context, async (database) => {
            await application.initContext(context);
            const result = await database.transaction<Result>(context, async () => {
                const result = await dataSource.update(context);
                if (result === undefined) throw new Error('action update: result is undefined');
                return result;
            });
            context.getRes().json(result);
            this.hostApp.broadcastResult(application, context, result);
        });
    }

    // action
    async _delete(context: Context, application: BkApplication): Promise<void> {
        debug('ViewerModule._delete', context.getReq()!.body.page);
        const body = context.getBody() as DeleteActionDto;
        const page = await application.getPage(context, body.page);
        const form = page.getForm(body.form);
        const dataSource = form.getDataSource('default');
        await dataSource.getDatabase().use(context, async (database) => {
            await application.initContext(context);
            const result = await database.transaction<Result>(context, async () => {
                const result = await dataSource.delete(context);
                if (result === undefined) throw new Error('delete result is undefined');
                return result;
            });
            context.getRes().json(result);
            this.hostApp.broadcastResult(application, context, result);
        });
    }

    static async getModel(context: Context, application: BkApplication): Promise<BkModel> {
        const body = context.getBody() as RpcActionDto;
        if (body.page) {
            const page = await application.getPage(context, body.page);
            if (body.form) {
                return page.getForm(body.form);
            }
            return page;
        }
        return application;
    }

    // action
    async rpc(context: Context, application: BkApplication): Promise<void> {
        debug('ViewerModule.rpc', context.getReq()!.body);
        const dto = context.getBody() as RpcActionDto;
        const res = context.getRes();
        const model = await ViewerModule.getModel(context, application);
        try {
            const result = await model.rpc(dto.name, context);
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
            err.message = `rpc error ${dto.name}: ${err.message}`;
            err.context = context;
            await this.hostApp.logError(err, context.getReq());
            res.json({ errorMessage });
        }
    }

    // action
    async logout(context: Context, application: BkApplication): Promise<void> {
        debug('ViewerModule.logout');
        const user = context.getUser();
        const route = context.getRoute();
        if (!user) {
            throw new Error(`no user for route ${route}`);
        }
        const session = context.getSession();
        Session_deleteUser(session, route);
        await Session_save(session);
        context.getRes().json(null);
    }

    // action
    async test(context: Context, application: BkApplication) {
        debug('ViewerModule.test', context.getReq()!.body);
        // const result = await Test[req.body.name](context, application);
        // if (result === undefined) throw new Error('test action: result is undefined');
        context.getRes().json(null);
    }

    async handleGetFile(context: Context, application: BkApplication, next: NextFunction) {
        await application.handleGetFile(context, next);
    }

    getHostApp() {
        return this.hostApp;
    }
}
