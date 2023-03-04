import { Editor } from '../Editor';
export declare class ActionEditor extends Editor {
    getParams(): {
        pageFileName: any;
        form: any;
        action: any;
    } | {
        pageFileName: any;
        action: any;
        form?: undefined;
    } | {
        action: any;
        pageFileName?: undefined;
        form?: undefined;
    };
    setValue(name: any, value: any): Promise<any>;
    deleteData(): Promise<void>;
    delete(): Promise<void>;
    moveUp(): Promise<any>;
    moveDown(): Promise<any>;
}
