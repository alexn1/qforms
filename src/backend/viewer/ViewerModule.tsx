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
    Action,
    BaseDto,
    DeleteActionDto,
    InsertActionDto,
    LoginDto,
    Nullable,
    PageActionDto,
    PageActionQuery,
    PageActionResponse,
    RpcActionDto,
    SelectActionDto,
    SelectActionQuery,
    SelectActionResponse,
    UpdateActionDto,
} from '../../types';
import { Session_deleteUser, Session_save } from '../Session';
import { application } from 'express';
import { BkApplicationController } from './BkController/BkApplicationController';
import { BkPageController } from './BkController/BkPageController';

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
    private applicationController: BkApplicationController;
    private pageController: BkPageController;

    constructor(private hostApp: BackHostApp) {}

    async init() {
        // debug('ViewerModule.init', 'getFrontendDirPath:', this.hostApp.getFrontendDirPath());
        this.initControllers();
        await this.initCss();
        await this.initJs();
    }

    initControllers() {
        this.applicationController = new BkApplicationController(this);
        this.pageController = new BkPageController();
    }

    async initCss(): Promise<void> {
        this.css = (
            await BkHelper.getFilePaths(
                path.join(this.hostApp.getFrontendDirPath(), 'viewer/public'),
                'css',
            )
        ).map((path) => `/viewer/public/${path}`);
        debug('ViewerModule.css:', this.css);
    }

    async initJs() {
        this.js = (
            await BkHelper.getFilePaths(
                path.join(this.hostApp.getFrontendDirPath(), 'viewer/public'),
                'js',
            )
        ).map((path) => `/viewer/public/${path}`);
        if (!this.js.length) throw new Error('no qforms js');
        debug('ViewerModule.js:', this.js);
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
            await this.applicationController.loginGet(context, bkApplication);
        } else {
            context.setVersionHeaders(pkg.version, bkApplication.getVersion());

            // handle actions
            const action = context.getAction();
            if (action === 'page') {
                await this.pageController.page(context, bkApplication);
            } else if (action === 'select') {
                await this.select(context, bkApplication);
            } else {
                // await this.index(context, bkApplication);
                await this.applicationController.index(context, bkApplication);
            }
        }
    }

    async handlePost(context: Context, application: BkApplication): Promise<void> {
        // debug('ViewerModule.handlePost');
        const { action } = context.getBody() as BaseDto;
        if (action === 'login') {
            await this.applicationController.loginPost(context, application);
        } else {
            const user = context.getUser();
            if (application.isAuthentication() && !user) {
                throw new HttpError({ message: 'Unauthorized', status: 401, context });
            }

            await this.handleAction(context, application);
        }
    }

    async handlePatch(context: Context, application: BkApplication): Promise<void> {
        // debug('ViewerModule.handlePatch');
        const user = context.getUser();
        if (application.isAuthentication() && !user) {
            throw new HttpError({ message: 'Unauthorized', status: 401, context });
        }

        await this.handleAction(context, application);
    }

    async handleDelete(context: Context, application: BkApplication): Promise<void> {
        // debug('ViewerModule.handleDelete');
        const user = context.getUser();
        if (application.isAuthentication() && !user) {
            throw new HttpError({ message: 'Unauthorized', status: 401, context });
        }

        await this.handleAction(context, application);
    }

    async handleAction(context: Context, application: BkApplication) {
        const action = context.getAction();
        if (!action) throw new Error('no action');
        if (ACTIONS.indexOf(action) === -1) {
            throw new Error(`unknown action: ${action}`);
        }
        context.setVersionHeaders(pkg.version, application.getVersion());
        if (action === 'page') {
            await this.pageController.page(context, application);
        } else if (action === 'logout') {
            await this.applicationController.logout(context, application);
        } else {
            await (this as any)[action](context, application);
        }
    }

    // action
    async select(context: Context, application: BkApplication): Promise<void> {
        debug('ViewerModule.select', context.getBody().page);
        // const { page, form, ds } = context.getBody() as SelectActionDto;
        const { page, form, ds } = context.getQuery() as SelectActionQuery;
        const start = Date.now();
        const dataSource = await this.getDataSource(context, application, { page, form, ds });
        await dataSource.getDatabase().use(context, async (database) => {
            await application.initContext(context);
            const [rows, count] = await dataSource.read(context);
            const time = Date.now() - start;
            debug('select time:', time);
            const response: SelectActionResponse = { rows, count, time };
            context.getRes().json(response);
        });
    }

    async getDataSource(
        context: Context,
        application: BkApplication,
        { page, form, ds }: { page?: string; form?: string; ds: string },
    ): Promise<BkDataSource> {
        if (page) {
            const bkPage = await application.getPage(context, page);
            if (form) {
                return bkPage.getForm(form).getDataSource(ds);
            }
            return bkPage.getDataSource(ds);
        }
        return application.getDataSource(ds);
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
            context.getRes().status(201).json(result);
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
