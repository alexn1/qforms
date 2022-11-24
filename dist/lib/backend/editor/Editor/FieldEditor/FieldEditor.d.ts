import { Editor } from '../Editor';
export declare class FieldEditor extends Editor {
    static createAttributes(params: any): any;
    changeClass(newClassName: any): any;
    createJs(params: any): Promise<any>;
    createJsx(params: any): Promise<any>;
    createLess(params: any): Promise<any>;
    getCollectionDirPath(): Promise<any>;
    getColName(): string;
}
