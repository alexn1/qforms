import { Editor } from '../Editor';
import { JsonFile } from '../../../JsonFile';
import { AppInfo } from '../../../AppInfo';
import { PageEditor } from '../PageEditor/PageEditor';
import { ApplicationScheme } from '../../../common/Scheme/ApplicationScheme';
import { ApplicationAttributes, ApplicationItems } from '../../../common/Scheme/ApplicationScheme';
export type ApplicationParams = Partial<ApplicationAttributes> & Partial<ApplicationItems> & {
    name: string;
};
export declare class ApplicationEditor extends Editor<ApplicationScheme> {
    private appFile;
    appInfo: AppInfo;
    data: ApplicationScheme;
    constructor(appFile: JsonFile, editorPath: string);
    getAppFile(): JsonFile;
    static createData(params: ApplicationParams): ApplicationScheme;
    static createAppFile(appFilePath: string, params: ApplicationParams): Promise<JsonFile>;
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
