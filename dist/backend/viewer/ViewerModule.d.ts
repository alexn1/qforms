import { Context } from '../Context';
import { BackHostApp } from '../BackHostApp';
import { BkApplication } from './BkModel/BkApplication/BkApplication';
import { NextFunction } from 'connect';
export { TableForm, NoSqlDataSource, TextBoxField, TableFormTextBoxFieldController, RowForm, } from '../../frontend/viewer';
export declare class ViewerModule {
    private hostApp;
    private css;
    private js;
    constructor(hostApp: BackHostApp);
    init(): Promise<void>;
    getLinks(): string[];
    getScripts(): string[];
    handleGet(context: Context, bkApplication: BkApplication): Promise<void>;
    handlePost(context: Context, application: BkApplication): Promise<any>;
    renderHtml(bkApplication: BkApplication, context: Context): Promise<string>;
    loginGet(context: Context, application: BkApplication): Promise<void>;
    loginPost(context: Context, application: BkApplication): Promise<void>;
    page(context: Context, application: BkApplication): Promise<void>;
    select(context: Context, application: BkApplication): Promise<number>;
    insert(context: Context, application: BkApplication): Promise<void>;
    update(context: Context, application: BkApplication): Promise<void>;
    _delete(context: Context, application: BkApplication): Promise<void>;
    rpc(context: Context, application: BkApplication): Promise<void>;
    logout(context: Context, application: BkApplication): Promise<void>;
    test(context: Context, application: BkApplication): Promise<void>;
    handleViewerGetFile(context: Context, application: BkApplication, next: NextFunction): Promise<void>;
    getHostApp(): BackHostApp;
}
