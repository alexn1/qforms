import { NextFunction, Request, Response } from 'express';
import { BackHostApp } from './BackHostApp';
export declare class Router {
    private hostApp;
    constructor(hostApp: BackHostApp);
    createRoutes(): void;
    moduleGet(req: Request, res: Response, next: NextFunction): Promise<void>;
}
