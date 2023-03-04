import { Editor } from '../Editor';
export declare class ColumnEditor extends Editor {
    table: any;
    constructor(data: any, table: any);
    setValue(name: any, value: any): Promise<any>;
    deleteData(): Promise<void>;
    delete(): Promise<void>;
}
