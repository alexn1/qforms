declare const Editor: any;
export declare class DataSourceEditor extends Editor {
    static createData(params: any): any;
    getCollectionDirPath(): Promise<any>;
    createModelBackJs(params: any): Promise<any>;
    getColName(): string;
    save(): Promise<void>;
}
export {};
