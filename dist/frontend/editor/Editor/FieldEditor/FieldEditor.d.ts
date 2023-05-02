import { Editor } from '../Editor';
export declare class FieldEditor extends Editor {
    constructor(data: any, form: any);
    setValue(name: any, value: any): Promise<any>;
    deleteData(): Promise<void>;
    delete(): Promise<void>;
    getView(view: any): Promise<any>;
    saveView(text: any, view: any): Promise<any>;
    saveController(text: any): Promise<any>;
    createView(): Promise<any>;
    createStyle(): Promise<any>;
    createController(): Promise<any>;
    changeClass(params: any): Promise<any>;
    moveUp(): Promise<any>;
    moveDown(): Promise<any>;
}
