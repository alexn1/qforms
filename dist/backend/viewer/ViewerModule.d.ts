import { Context } from '../Context';
import { BackHostApp } from '../BackHostApp';
import { BkApplication } from './BkModel/BkApplication/BkApplication';
import { NextFunction } from 'connect';
export { TableForm, NoSqlDataSource, TextBoxField, TableFormTextBoxFieldController, RowForm, } from '../../frontend/viewer';
export declare class ViewerModule {
    private hostApp;
    private css;
    private js;
    private applicationController;
    private pageController;
    private dataSourceController;
    constructor(hostApp: BackHostApp);
    init(): Promise<void>;
    initControllers(): void;
    initCss(): Promise<void>;
    initJs(): Promise<void>;
    getLinks(): string[];
    getScripts(): string[];
    handleGet(context: Context, bkApplication: BkApplication): Promise<void>;
    handlePost(context: Context, application: BkApplication): Promise<void>;
    handlePatch(context: Context, application: BkApplication): Promise<void>;
    handleDelete(context: Context, application: BkApplication): Promise<void>;
    handleAction(context: Context, application: BkApplication): Promise<void>;
    handleGetFile(context: Context, application: BkApplication, next: NextFunction): Promise<void>;
    getHostApp(): BackHostApp;
}
