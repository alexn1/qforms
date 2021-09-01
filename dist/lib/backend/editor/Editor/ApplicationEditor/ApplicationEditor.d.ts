declare const Editor: any;
import JsonFile from '../../../JsonFile';
import { AppInfo } from '../../../AppInfo';
import PageEditor from '../PageEditor/PageEditor';
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
        page: {
            '@class': string;
            '@attributes': {
                formatVersion: string;
                name: any;
                caption: any;
            };
            dataSources: any[];
            actions: any[];
            forms: any[];
        };
        pageLink: any;
    }>;
    save(): Promise<void>;
    removePageFile(name: any): Promise<void>;
    createPageEditor(relFilePath: any): Promise<PageEditor>;
    getPage(name: any): Promise<PageEditor>;
    createJs(params: any): Promise<any>;
    createModelBackJs(params: any): Promise<any>;
    getCustomDirPath(): Promise<string>;
    newPageLinkData(params: any): any;
    newDataSourceData(params: any): any;
}
export = ApplicationEditor;
