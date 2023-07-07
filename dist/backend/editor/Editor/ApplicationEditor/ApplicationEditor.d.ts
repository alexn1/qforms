import { Editor } from '../Editor';
import { JsonFile } from '../../../JsonFile';
import { AppInfo } from '../../../AppInfo';
import { PageEditor } from '../PageEditor/PageEditor';
import { BkApplicationScheme } from '../../../viewer/BkModelScheme/BkApplicationScheme/BkApplicationScheme';
export declare class ApplicationEditor extends Editor<BkApplicationScheme> {
    private appFile;
    appInfo: AppInfo;
    constructor(appFile: JsonFile, editorPath: string);
    getAppFile(): JsonFile;
    static createData(params: Record<string, any>): {
        '@class': string;
        '@attributes': {
            formatVersion: string;
            name: any;
            caption: any;
            authentication: any;
            user: any;
            password: any;
            lang: any;
            theme: any;
            cssBlock: any;
            viewClass: any;
            ctrlClass: any;
            modelClass: any;
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
