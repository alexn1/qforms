import { Editor } from '../Editor';
import { JsonFile } from '../../../JsonFile';
import { AppInfo } from '../../../AppInfo';
import { PageEditor } from '../PageEditor/PageEditor';
import { BkApplicationScheme } from '../../../viewer/BkModelScheme/BkApplicationScheme/BkApplicationScheme';
export interface ApplicationAttributes {
    formatVersion: '0.1';
    name: string;
    caption: string;
    authentication: 'true' | 'false';
    user: string;
    password: string;
    lang: 'en' | 'ru';
    theme: 'standard';
    cssBlock: string;
    viewClass: string;
    ctrlClass: string;
    modelClass: string;
}
export interface ApplicationItems {
    env: any;
    databases: any;
    dataSources: any;
    actions: any;
    pageLinks: any;
}
export declare class ApplicationEditor extends Editor<BkApplicationScheme> {
    private appFile;
    appInfo: AppInfo;
    constructor(appFile: JsonFile, editorPath: string);
    getAppFile(): JsonFile;
    static createData(params: ApplicationAttributes & ApplicationItems): {
        '@class': string;
        '@attributes': {
            formatVersion: string;
            name: string;
            caption: string;
            authentication: "true" | "false";
            user: string;
            password: string;
            lang: "en" | "ru";
            theme: "standard";
            cssBlock: string;
            viewClass: string;
            ctrlClass: string;
            modelClass: string;
        };
        env: any;
        databases: any[];
        dataSources: any[];
        actions: any[];
        pageLinks: any[];
    };
    static createAppFile(appFilePath: string, params: any): Promise<JsonFile>;
    newPageAndPageLinkData(params: any): Promise<{
        page: {
            '@class': string;
            '@attributes': {
                formatVersion: string;
                name: any;
                caption: any;
                cssBlock: any;
                viewClass: any;
                ctrlClass: any;
                modelClass: any;
                formInTab: any;
            };
            dataSources: any[];
            actions: any[];
            forms: any[];
        };
        pageLink: any;
    }>;
    save(): Promise<void>;
    removePageFile(name: string): Promise<void>;
    createPageEditor(relFilePath: string): Promise<PageEditor>;
    getPage(name: string): Promise<PageEditor>;
    createJs(params: any): Promise<any>;
    createModelBackJs(params: any): Promise<any>;
    getCustomDirPath(): Promise<string>;
    reformat(): void;
}
