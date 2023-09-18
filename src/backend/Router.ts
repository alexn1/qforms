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
        this.hostApp.getExpress().get('/monitor', this.monitorGet.bind(this));
    }

    async monitorGet(req: Request, res: Response, next: NextFunction): Promise<void> {
        pConsole.log(colors.magenta('monitorGet') /* , req.headers */);
        try {
            if (!this.hostApp.getParams().monitor) {
                res.end('Please set monitor username/password in app params');
                return;
            }
            if (this.hostApp.monitorModule.authorize(req)) {
                const html = this.hostApp.monitorModule.render();
                res.end(html);
            } else {
                res.setHeader('WWW-Authenticate', 'Basic realm="My Realm"')
                    .status(401)
                    .end('Unauthorized');
            }
        } catch (err) {
            next(err);
        }
    }
}
