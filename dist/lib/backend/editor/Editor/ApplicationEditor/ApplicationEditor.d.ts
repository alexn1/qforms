declare const Editor: any;
import JsonFile from '../../../JsonFile';
import { AppInfo } from '../../../AppInfo';
declare class ApplicationEditor extends Editor {
    appFile: JsonFile;
    appInfo: AppInfo;
    constructor(appFile: any);
    static createData(params: any): {
        '@class': string;
        '@attributes': {
            formatVersion: string;
            name: any;
            caption: any;
            authentication: string;
            user: string;
            password: string;
            lang: string;
            theme: string;
        };
        env: {};
        databases: any[];
        dataSources: any[];
        actions: any[];
        pageLinks: any[];
    };
    static createAppFile(appFilePath: any, params: any): Promise<JsonFile>;
    newPageAndPageLinkData(params: any): Promise<{
        page: any;
        pageLink: any;
    }>;
    save(): Promise<void>;
    createPageLinkEditor(name: any): any;
    removePageFile(name: any): Promise<void>;
    createPageEditor(relFilePath: any): Promise<any>;
    getPage(name: any): Promise<any>;
    createJs(params: any): Promise<any>;
    createModelBackJs(params: any): Promise<any>;
    getCustomDirPath(): Promise<string>;
    movePageLinkUp(name: any): void;
    movePageLinkDown(name: any): void;
    newDatabaseData(params: any): any;
    createDatabaseEditor(name: any): any;
    newPageLinkData(params: any): any;
    newDataSourceData(params: any): any;
}
export = ApplicationEditor;
