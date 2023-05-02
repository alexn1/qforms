import { Editor } from '../Editor';
export declare class DataSourceEditor extends Editor {
    static createData(params: any): any;
    static createAttributes(params: any): any;
    getCollectionDirPath(): Promise<string>;
    createModelBackJs(params: any): Promise<any>;
    getColName(): string;
    save(): Promise<void>;
}
