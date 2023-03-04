import { Editor } from '../Editor';
export declare class KeyColumnEditor extends Editor {
    dataSource: any;
    constructor(data: any, dataSource: any);
    setValue(name: any, value: any): Promise<any>;
    deleteData(): Promise<void>;
    getPage(): any;
    getForm(): any;
    delete(): Promise<void>;
}
