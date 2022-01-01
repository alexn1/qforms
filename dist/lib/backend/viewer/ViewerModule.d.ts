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
    handleViewerPost(req: any, res: any, context: Context, application: Application): Promise<any>;
    loginPost(req: any, res: any, context: Context, application: Application): Promise<void>;
    page(req: any, res: any, context: Context, application: Application): Promise<void>;
    select(req: any, res: any, context: Context, application: Application): Promise<number>;
    insert(req: any, res: any, context: Context, application: Application): Promise<void>;
    update(req: any, res: any, context: Context, application: Application): Promise<void>;
    _delete(req: any, res: any, context: Context, application: Application): Promise<void>;
    rpc(req: any, res: any, context: Context, application: Application): Promise<void>;
    logout(req: any, res: any, context: Context, application: Application): Promise<void>;
    test(req: any, res: any, context: Context, application: Application): Promise<void>;
}
export = ViewerModule;
