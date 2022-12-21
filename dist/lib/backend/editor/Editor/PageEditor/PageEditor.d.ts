import { ApplicationEditor } from '../ApplicationEditor/ApplicationEditor';
import { JsonFile } from '../../../JsonFile';
import { Editor } from '../Editor';
export declare class PageEditor extends Editor {
    appEditor: ApplicationEditor;
    pageFile: JsonFile;
    constructor(appEditor: any, pageFile: any);
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
        };
        dataSources: any[];
        actions: any[];
        forms: any[];
    };
    setAttr(name: any, value: any): void;
    save(): Promise<void>;
    createJs(params: any): Promise<any>;
    createJsx(params: any): Promise<any>;
    createLess(params: any): Promise<any>;
    createModelBackJs(params: any): Promise<any>;
    getCustomDirPath(): Promise<any>;
    reformat(): void;
}
