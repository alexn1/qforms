import { Request, Response, NextFunction } from 'express';
import { BackHostApp } from '../BackHostApp';
export declare class IndexModule {
    hostApp: BackHostApp;
    css: string[];
    js: string[];
    constructor(hostApp: BackHostApp);
    init(): Promise<void>;
    get(req: Request, res: Response, next: NextFunction): Promise<void>;
    post(req: Request, res: Response, next: NextFunction): Promise<void>;
    fill(): Promise<{
        nodeEnv: import("../..").Nullable<string>;
        appInfos: {
            fullName: string;
            envs: string[];
        }[];
    }>;
    getLinks(): string[];
    getScripts(): string[];
    render(): Promise<string>;
}
