import { NextFunction, Request, Response } from 'express';
import colors from 'colors/safe';
import { BackHostApp } from './BackHostApp';
import { pConsole } from '../pConsole';

export class Router {
    constructor(private hostApp: BackHostApp) {}

    createRoutes() {
        if (this.hostApp.isDevelopment()) {
            // google chrome always redirect from /index to /index/ even with disabled cache
            // so we use /index2
            this.hostApp.getExpress().get('/index2', this.hostApp.indexModule.get.bind(this));
            this.hostApp.getExpress().post('/index2', this.hostApp.indexModule.post.bind(this));
        }

        // monitor module
        this.hostApp.getExpress().get('/monitor', this.hostApp.monitorModule.get.bind(this));

        // GET
        this.hostApp
            .getExpress()
            .get('/:module/:appDirName/:appFileName/:env/:domain/', this.moduleGet.bind(this));

        // POST
        this.hostApp
            .getExpress()
            .post('/:module/:appDirName/:appFileName/:env/:domain/', this.modulePost.bind(this));
    }

    async moduleGet(req: Request, res: Response, next: NextFunction): Promise<void> {
        // @ts-ignore
        // debug(colors.magenta.underline('Router.moduleGet'), req.params);
        pConsole.log(
            // @ts-ignore
            colors.magenta.underline('GET'),
            `${req.params.module}/${req.params.appDirName}/${req.params.appFileName}/${req.params.env}/${req.params.domain}`,
        );
        if (req.params.module === 'viewer') {
            await this.hostApp.viewerModule.get(req, res, next);
        } else if (req.params.module === 'editor' && this.hostApp.isDevelopment()) {
            await this.hostApp.editorModule.get(req, res, next);
        } else {
            next();
        }
    }

    async modulePost(req: Request, res: Response, next: NextFunction): Promise<void> {
        // @ts-ignore
        debug(colors.magenta.underline('Router.modulePost'), req.params, req.body);

        // log request
        pConsole.log(
            // @ts-ignore
            colors.magenta.underline('POST'),
            `${req.params.module}/${req.params.appDirName}/${req.params.appFileName}/${req.params.env}/${req.params.domain}`,
            `${req.body.page}.${req.body.form}.${req.body.ds}.${req.body.action}`,
        );

        if (req.params.module === 'viewer') {
            await this.hostApp.viewerModule.post(req, res, next);
        } else if (req.params.module === 'editor' && this.hostApp.isDevelopment()) {
            await this.hostApp.editorModule.post(req, res, next);
        } else {
            next();
        }
    }
}
