import { NextFunction, Request, Response } from 'express';
import { BackHostApp } from './BackHostApp';
import { Nullable, Scalar } from '../types';
export type Route = [
    module: 'viewer' | 'editor',
    appDirName: string,
    appFileName: string,
    env: string,
    domain?: string
];
export declare class Router {
    private hostApp;
    constructor(hostApp: BackHostApp);
    createRoutes(): void;
    moduleGet(req: Request, res: Response, next: NextFunction): Promise<void>;
    modulePost(req: Request, res: Response, next: NextFunction): Promise<void>;
    modulePatch(req: Request, res: Response, next: NextFunction): Promise<void>;
    moduleDelete(req: Request, res: Response, next: NextFunction): Promise<void>;
    alias(method: 'get' | 'post' | 'patch' | 'delete', path: string | RegExp, [module, appDirName, appFileName, env, domain]: Route, fn: 'moduleGet' | 'modulePost' | 'modulePatch' | 'moduleDelete', query?: Record<string, Nullable<Scalar>>): void;
}
