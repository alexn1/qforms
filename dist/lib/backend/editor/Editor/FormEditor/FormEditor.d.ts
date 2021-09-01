declare const Editor: any;
declare class FormEditor extends Editor {
    static createData(params: any): any;
    createJs(params: any): Promise<any>;
    createModelBackJs(params: any): Promise<any>;
    getCollectionDirPath(): Promise<any>;
    newDataSourceData(params: any): any;
}
export = FormEditor;
