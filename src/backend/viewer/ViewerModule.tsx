import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { Context } from '../Context';
import { BackHostApp } from '../BackHostApp';
import { BkApplication } from './BkModel/BkApplication/BkApplication';
import { HttpError } from '../HttpError';
import { debug } from '../../console';
import { pConsole } from '../../pConsole';
import { Nullable, Action } from '../../types';
import { BkApplicationController } from './BkController/BkApplicationController';
import { BkPageController } from './BkController/BkPageController';
import { BkDataSourceController } from './BkController/BkDataSourceController';
import { getFilePaths } from '../file-helper';
import { BaseDto } from '../../frontend';

// to compile without using
/* export {
    TableForm,
    NoSqlDataSource,
    TextBoxField,
    TableFormTextBoxFieldController,
    RowForm,
} from '../../frontend/viewer'; */

export class ViewerModule {
    private css: string[];
    private js: string[];
    private applicationController: BkApplicationController;
    private pageController: BkPageController;
    private dataSourceController: BkDataSourceController;

    constructor(private hostApp: BackHostApp) {}

    async init() {
        // debug('ViewerModule.init', 'getFrontendDirPath:', this.hostApp.getFrontendDirPath());
        await this.initCss();
        await this.initJs();
        this.initControllers();
    }

    async initCss(): Promise<void> {
        this.css = (
            await getFilePaths(path.join(this.hostApp.getFrontendDirPath(), 'viewer/public'), 'css')
        ).map((path: string) => `/viewer/public/${path}`);
        debug('ViewerModule.css:', this.css);
    }

    async initJs() {
        this.js = (
            await getFilePaths(path.join(this.hostApp.getFrontendDirPath(), 'viewer/public'), 'js')
        ).map((path: string) => `/viewer/public/${path}`);
        if (!this.js.length) throw new Error('no qforms js');
        debug('ViewerModule.js:', this.js);
    }

    initControllers() {
        this.applicationController = new BkApplicationController(this);
        this.pageController = new BkPageController();
        this.dataSourceController = new BkDataSourceController(this);
    }

    async get(req: Request, res: Response, next: NextFunction): Promise<void> {
        let context: Nullable<Context> = null;
        try {
            context = new Context({
                req,
                res,
                domain: this.hostApp.getDomain(req),
            });
            const application = await this.hostApp.createApplicationIfNotExists(context);
            if (application.isAvailable()) {
                await this.handleGet(context, application);
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

    async getFile(req: Request, res: Response, next: NextFunction): Promise<void> {
        let context: Nullable<Context> = null;
        try {
            context = new Context({
                req,
                res,
                domain: this.hostApp.getDomain(req),
            });
            const application = await this.hostApp.createApplicationIfNotExists(context);
            await this.handleGetFile(context, application, next);
        } catch (err) {
            err.message = `getFile error: ${err.message}`;
            next(err);
        } finally {
            if (context) {
                context.destroy();
            }
        }
    }

    async handleGet(context: Context, application: BkApplication): Promise<void> {
        pConsole.debug(
            'ViewerModule.handleGet',
            context.getDomain(),
            context.getReq()!.url,
            context.getReq()!.params,
            context.getQuery(),
        );
        const action = context.getAction();
        if (action === Action.page) {
            this.checkAuthorization(context, application);
            context.setVersionHeaders(this.hostApp.getPlatformVersion(), application.getVersion());
            await this.pageController.page(context, application);
        } else if (action === Action.read) {
            this.checkAuthorization(context, application);
            context.setVersionHeaders(this.hostApp.getPlatformVersion(), application.getVersion());
            await this.dataSourceController.select(context, application);
        } else {
            context.setVersionHeaders(this.hostApp.getPlatformVersion(), application.getVersion());
            if (application.isAuthentication() && !context.getUser()) {
                await this.applicationController.loginGet(context, application);
            } else {
                await this.applicationController.index(context, application);
            }
        }
    }

    async post(req: Request, res: Response, next: NextFunction): Promise<void> {
        let context: Nullable<Context> = null;
        try {
            context = new Context({
                req,
                res,
                domain: this.hostApp.getDomain(req),
            });
            const application = await this.hostApp.createApplicationIfNotExists(context);
            await this.handlePost(context, application);
        } catch (err) {
            next(err);
        } finally {
            if (context) {
                context.destroy();
            }
        }
    }

    async handlePost(context: Context, application: BkApplication): Promise<void> {
        // debug('ViewerModule.handlePost');
        const { action } = context.getBody() as BaseDto;
        if (action === Action.login) {
            await this.applicationController.loginPost(context, application);
        } else {
            this.checkAuthorization(context, application);
            context.setVersionHeaders(this.hostApp.getPlatformVersion(), application.getVersion());
            if (action === Action.logout) {
                await this.applicationController.logout(context, application);
            } else if (action === Action.rpc) {
                await this.applicationController.rpc(context, application);
            } else if (action === Action.create) {
                await this.dataSourceController.insert(context, application);
            } else {
                throw new Error(`unknown action: ${action}`);
            }
        }
    }
    async patch(req: Request, res: Response, next: NextFunction): Promise<void> {
        let context: Nullable<Context> = null;
        try {
            context = new Context({
                req,
                res,
                domain: this.hostApp.getDomain(req),
            });
            const application = await this.hostApp.createApplicationIfNotExists(context);
            await this.handlePatch(context, application);
        } catch (err) {
            next(err);
        } finally {
            if (context) {
                context.destroy();
            }
        }
    }

    async handlePatch(context: Context, application: BkApplication): Promise<void> {
        // debug('ViewerModule.handlePatch');
        const action = context.getAction();
        if (!action) throw new Error('no action');
        if (action === Action.update) {
            this.checkAuthorization(context, application);
            context.setVersionHeaders(this.hostApp.getPlatformVersion(), application.getVersion());
            await this.dataSourceController.update(context, application);
        } else {
            throw new Error(`unknown action: ${action}`);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        let context: Nullable<Context> = null;
        try {
            context = new Context({
                req,
                res,
                domain: this.hostApp.getDomain(req),
            });
            const application = await this.hostApp.createApplicationIfNotExists(context);
            await this.handleDelete(context, application);
        } catch (err) {
            next(err);
        } finally {
            if (context) {
                context.destroy();
            }
        }
    }

    async handleDelete(context: Context, application: BkApplication): Promise<void> {
        // debug('ViewerModule.handleDelete');
        const action = context.getAction();
        if (!action) throw new Error('no action');
        if (action === Action.delete) {
            this.checkAuthorization(context, application);
            context.setVersionHeaders(this.hostApp.getPlatformVersion(), application.getVersion());
            await this.dataSourceController.delete(context, application);
        } else {
            throw new Error(`unknown action: ${action}`);
        }
    }

    async handleGetFile(context: Context, application: BkApplication, next: NextFunction) {
        await application.handleGetFile(context, next);
    }

    checkAuthorization(context: Context, application: BkApplication): void {
        if (application.isAuthentication() && !context.getUser()) {
            throw new HttpError({
                message: 'Unauthorized',
                status: 401,
                route: context.getRoute(),
            });
        }
    }

    getHostApp() {
        return this.hostApp;
    }

    getLinks(): string[] {
        return this.css;
    }

    getScripts(): string[] {
        return this.js;
    }
}
