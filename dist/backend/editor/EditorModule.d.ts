import { Request, Response, NextFunction } from 'express';
import { Context } from '../Context';
import { BackHostApp } from '../BackHostApp';
export declare class EditorModule {
    hostApp: BackHostApp;
    css: string[];
    js: string[];
    constructor(hostApp: BackHostApp);
    init(): Promise<void>;
    getLinks(): string[];
    getScripts(): string[];
    get(req: Request, res: Response, next: NextFunction): Promise<void>;
    handleEditorGet(req: Request, res: Response, context: Context): Promise<void>;
    post(req: Request, res: Response, next: NextFunction): Promise<void>;
    handleEditorPost(req: Request, res: Response, context: Context): Promise<void>;
}
