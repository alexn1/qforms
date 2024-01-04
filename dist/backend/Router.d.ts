import { NextFunction, Request, Response } from 'express';
import { BackHostApp } from './BackHostApp';
import { Nullable, Scalar, Route } from '../types';
export type ExpressMethod = 'get' | 'post' | 'patch' | 'delete';
export type CustomRoute = [
    path: string | RegExp,
    route: Route,
    options?: Record<string, Nullable<Scalar>> | ((req: Request) => void)
];
export declare class Router {
    private hostApp;
    constructor(hostApp: BackHostApp);
    createRoutes(): void;
    moduleGet(req: Request, res: Response, next: NextFunction): Promise<void>;
    moduleGetFile(req: Request, res: Response, next: NextFunction): Promise<void>;
    modulePost(req: Request, res: Response, next: NextFunction): Promise<void>;
    modulePatch(req: Request, res: Response, next: NextFunction): Promise<void>;
    moduleDelete(req: Request, res: Response, next: NextFunction): Promise<void>;
    alias(method: ExpressMethod, path: string | RegExp, [module, appDirName, appFileName, env, domain]: Route, fn: 'moduleGet' | 'modulePost' | 'modulePatch' | 'moduleDelete' | 'moduleGetFile', optionsOrCallback?: Record<string, Nullable<Scalar>> | ((req: Request) => void)): void;
    static logRequestWithBody(req: Request): void;
}
