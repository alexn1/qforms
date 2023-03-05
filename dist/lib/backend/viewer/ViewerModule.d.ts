import { Context } from '../Context';
import { BackHostApp } from '../BackHostApp';
import { BkApplication } from './BkModel/BkApplication/BkApplication';
export declare class ViewerModule {
    hostApp: BackHostApp;
    css: string[];
    js: string[];
    constructor(hostApp: BackHostApp);
    init(): Promise<void>;
    getLinks(): string[];
    getScripts(): string[];
    handleViewerGet(context: Context, application: BkApplication): Promise<void>;
    renderApplicationView(data: any): string;
    render(version: any, application: any, context: any, data: any, links: any, scripts: any): string;
    loginGet(context: Context, application: BkApplication): Promise<void>;
    renderLogin(version: any, context: any, application: any, links: any, scripts: any, data: any): string;
    handleViewerPost(context: Context, application: BkApplication): Promise<any>;
    loginPost(context: Context, application: BkApplication): Promise<void>;
    page(context: Context, application: BkApplication): Promise<void>;
    select(context: Context, application: BkApplication): Promise<number>;
    insert(context: Context, application: BkApplication): Promise<void>;
    update(context: Context, application: BkApplication): Promise<void>;
    _delete(context: Context, application: BkApplication): Promise<void>;
    rpc(context: Context, application: BkApplication): Promise<void>;
    logout(context: Context, application: BkApplication): Promise<void>;
    test(context: Context, application: BkApplication): Promise<void>;
    handleViewerGetFile(context: Context, application: BkApplication, next: any): Promise<void>;
    getHostApp(): BackHostApp;
}
