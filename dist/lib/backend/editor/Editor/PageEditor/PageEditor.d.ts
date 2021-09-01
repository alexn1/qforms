import ApplicationEditor from '../ApplicationEditor/ApplicationEditor';
import JsonFile from '../../../JsonFile';
declare const Editor: any;
declare class PageEditor extends Editor {
    appEditor: ApplicationEditor;
    pageFile: JsonFile;
    constructor(appEditor: any, pageFile: any);
    static createData(params: any): {
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
    setAttr(name: any, value: any): void;
    save(): Promise<void>;
    newFormData(params: any): any;
    createJs(params: any): Promise<any>;
    createModelBackJs(params: any): Promise<any>;
    getCustomDirPath(): Promise<any>;
    newDataSourceData(params: any): any;
}
export = PageEditor;
