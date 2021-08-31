declare const Editor: any;
declare class FormEditor extends Editor {
    static createData(params: any): any;
    newFieldData(params: any): any;
    moveFieldUp(params: any): Promise<string>;
    moveFieldDown(params: any): Promise<string>;
    createFieldEditor(name: any): any;
    createJs(params: any): Promise<any>;
    createModelBackJs(params: any): Promise<any>;
    getCollectionDirPath(): Promise<any>;
    getCustomDirPath(): Promise<any>;
    newDataSourceData(params: any): any;
}
export = FormEditor;
