import { Editor } from '../Editor';
import { JsonFile } from '../../../JsonFile';
import { AppInfo } from '../../../AppInfo';
import { PageEditor } from '../PageEditor/PageEditor';
import { BkApplicationScheme } from '../../../common/BkModelScheme/BkApplicationScheme/BkApplicationScheme';
import { ApplicationAttributes } from '../../../common/Attributes/ApplicationAttributes';
import { ApplicationItems } from '../../../common/BkModelScheme/BkApplicationScheme/BkApplicationScheme';
export type ApplicationParams = Partial<ApplicationAttributes> & Partial<ApplicationItems> & {
    name: string;
};
export declare class ApplicationEditor extends Editor<BkApplicationScheme> {
    private appFile;
    appInfo: AppInfo;
    data: BkApplicationScheme;
    constructor(appFile: JsonFile, editorPath: string);
    getAppFile(): JsonFile;
    static createData(params: ApplicationParams): BkApplicationScheme;
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
