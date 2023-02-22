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
    handleEditorGet(req: any, res: any, context: Context): Promise<void>;
    render(version: any, data: any, runAppLink: any, appDirName: any, appFileName: any, env: any, links: any, scripts: any): string;
    handleEditorPost(req: any, res: any, context: Context): Promise<void>;
}
