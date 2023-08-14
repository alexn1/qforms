import { ApplicationEditor } from '../ApplicationEditor/ApplicationEditor';
import { JsonFile } from '../../../JsonFile';
import { Editor } from '../Editor';
import { PageAttributes, PageItems, PageScheme } from '../../../common/Scheme/PageScheme';
export type PageParams = Partial<PageAttributes> & Partial<PageItems> & {
    name: string;
};
export declare class PageEditor extends Editor<PageScheme> {
    private appEditor;
    pageFile: JsonFile;
    constructor(appEditor: ApplicationEditor, pageFile: JsonFile, editorPath: string);
    static createData(params: PageParams): PageScheme;
    setAttr(name: string, value: string): void;
    save(): Promise<void>;
    createJs(params: any): Promise<any>;
    createJsx(params: any): Promise<any>;
    createLess(params: any): Promise<any>;
    createModelBackJs(params: any): Promise<any>;
    getCustomDirPath(): Promise<string>;
    reformat(): void;
}
