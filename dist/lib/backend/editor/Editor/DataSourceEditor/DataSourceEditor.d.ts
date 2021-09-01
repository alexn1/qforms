declare const Editor: any;
declare class DataSourceEditor extends Editor {
    static createData(params: any): any;
    getCollectionDirPath(): Promise<any>;
    createModelBackJs(params: any): Promise<any>;
}
export = DataSourceEditor;
