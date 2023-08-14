import { Editor } from '../Editor';
import { JsonFile } from '../../../JsonFile';
import { AppInfo } from '../../../AppInfo';
import { PageEditor, PageParams } from '../PageEditor/PageEditor';
import { ApplicationScheme } from '../../../common/Scheme/ApplicationScheme';
import { ApplicationAttributes, ApplicationItems } from '../../../common/Scheme/ApplicationScheme';
import { PageLinkParams } from '../PageLinkEditor/PageLinkEditor';
import { PageScheme } from '../../../common/Scheme/PageScheme';
import { PageLinkScheme } from '../../../common/Scheme/PageLinkScheme';
export type ApplicationParams = Partial<ApplicationAttributes> & Partial<ApplicationItems> & {
    name: string;
};
export declare class ApplicationEditor extends Editor<ApplicationScheme> {
    private appFile;
    appInfo: AppInfo;
    constructor(appFile: JsonFile, editorPath: string);
    getAppFile(): JsonFile;
    static createData(params: ApplicationParams): ApplicationScheme;
    static createAppFile(appFilePath: string, params: ApplicationParams): Promise<JsonFile>;
    newPageAndPageLinkData(params: PageParams & PageLinkParams): Promise<{
        page: PageScheme;
        pageLink: PageLinkScheme;
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
