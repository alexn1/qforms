import Context from "../Context";
import BackHostApp from '../BackHostApp';
import Application from "./Model/Application/Application";
declare class ViewerModule {
    backHostApp: BackHostApp;
    css: string[];
    js: string[];
    constructor(backHostApp: BackHostApp);
    init(): Promise<void>;
    getLinks(): string[];
    getScripts(): string[];
    handleViewerGet(req: any, res: any, context: Context, application: Application): Promise<void>;
    loginGet(req: any, res: any, context: Context, application: Application): Promise<void>;
}
export = ViewerModule;
