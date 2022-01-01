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
    handleViewerGet(context: Context, application: Application): Promise<void>;
    loginGet(context: Context, application: Application): Promise<void>;
    handleViewerPost(context: Context, application: Application): Promise<any>;
    loginPost(context: Context, application: Application): Promise<void>;
    page(context: Context, application: Application): Promise<void>;
    select(context: Context, application: Application): Promise<number>;
    insert(context: Context, application: Application): Promise<void>;
    update(context: Context, application: Application): Promise<void>;
    _delete(context: Context, application: Application): Promise<void>;
    rpc(context: Context, application: Application): Promise<void>;
    logout(context: Context, application: Application): Promise<void>;
    test(context: Context, application: Application): Promise<void>;
}
export = ViewerModule;
