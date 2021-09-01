declare const Editor: any;
declare class DataSourceEditor extends Editor {
    static createData(params: any): any;
    newKeyColumnData(params: any): any;
    getCollectionDirPath(): Promise<any>;
    getCustomDirPath(): Promise<any>;
    createModelBackJs(params: any): Promise<any>;
    save(): Promise<void>;
}
export = DataSourceEditor;
