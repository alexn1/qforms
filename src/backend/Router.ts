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
            this.hostApp.getExpress().get('/index2', this.indexGet.bind(this));
            this.hostApp.getExpress().post('/index2', this.indexPost.bind(this));
        }
    }

    async indexGet(req: Request, res: Response, next: NextFunction): Promise<void> {
        pConsole.log(colors.magenta('indexGet'));
        try {
            const html = await this.hostApp.indexModule.render();
            res.setHeader('Content-Type', 'text/html; charset=utf-8').end(html);
        } catch (err) {
            next(err);
        }
    }

    async indexPost(req: Request, res: Response, next: NextFunction): Promise<void> {
        pConsole.log(colors.magenta('indexPost'), req.params);
        try {
            const appInfos = await this.hostApp.createAppInfos(req);
            res.json({
                appInfos: appInfos.map((appInfo) => ({
                    fullName: appInfo.fullName,
                    envs: appInfo.envs,
                })),
            });
        } catch (err) {
            next(err);
        }
    }
}
