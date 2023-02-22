import { Editor } from '../Editor';
export declare class FormEditor extends Editor {
    static createAttributes(params: any): any;
    static createData(params: any): any;
    createJs(params: any): Promise<any>;
    createJsx(params: any): Promise<any>;
    createLess(params: any): Promise<any>;
    createModelBackJs(params: any): Promise<any>;
    getCollectionDirPath(): Promise<string>;
    getColName(): string;
}
