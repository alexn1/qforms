import { Editor } from '../Editor';
export declare class ParamEditor extends Editor {
    database: any;
    constructor(data: any, database: any);
    setValue(name: any, value: any): Promise<any>;
    deleteData(): Promise<void>;
    delete(): Promise<void>;
}
