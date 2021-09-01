import FormEditor from '../FormEditor/FormEditor';
import ApplicationEditor from '../ApplicationEditor/ApplicationEditor';
import JsonFile from '../../../JsonFile';
declare const Editor: any;
declare class PageEditor extends Editor {
    appEditor: ApplicationEditor;
    pageFile: JsonFile;
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
    constructor(appEditor: any, pageFile: any);
    setAttr(name: any, value: any): void;
    moveFormUp(params: any): Promise<string>;
    save(): Promise<void>;
    moveFormDown(params: any): Promise<string>;
    newFormData(params: any): any;
    createFormEditor(name: any): FormEditor;
    createJs(params: any): Promise<any>;
    createModelBackJs(params: any): Promise<any>;
    getCustomDirPath(): Promise<any>;
    newDataSourceData(params: any): any;
}
export = PageEditor;
