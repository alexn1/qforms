import { ApplicationEditor } from '../ApplicationEditor/ApplicationEditor';
import { JsonFile } from '../../../JsonFile';
import { Editor } from '../Editor';
import { BkPageData } from '../../../../data';
export declare class PageEditor extends Editor<BkPageData> {
    private appEditor;
    pageFile: JsonFile;
    constructor(appEditor: ApplicationEditor, pageFile: JsonFile);
    static createData(params: any): {
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
    setAttr(name: string, value: string): void;
    save(): Promise<void>;
    createJs(params: any): Promise<any>;
    createJsx(params: any): Promise<any>;
    createLess(params: any): Promise<any>;
    createModelBackJs(params: any): Promise<any>;
    getCustomDirPath(): Promise<string>;
    reformat(): void;
}
