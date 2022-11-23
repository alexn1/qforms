import Context = require("../Context");
import BackHostApp = require('../BackHostApp');
import Application = require("./Model/Application/Application");
declare class ViewerModule {
    hostApp: BackHostApp;
    css: string[];
    js: string[];
    constructor(hostApp: BackHostApp);
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
    handleViewerGetFile(context: Context, application: Application, next: any): Promise<void>;
    getHostApp(): BackHostApp;
}
export = ViewerModule;
