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
    }
}
