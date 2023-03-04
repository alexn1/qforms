import { Editor } from '../Editor';
import { DataSourceEditor } from '../DataSourceEditor/DataSourceEditor';
import { ActionEditor } from '../ActionEditor/ActionEditor';
import { FormEditor } from '../FormEditor/FormEditor';
export declare class PageEditor extends Editor {
    pageLink: any;
    forms: any[];
    constructor(data: any, pageLink: any);
    init(): void;
    createDataSource(data: any): DataSourceEditor;
    createAction(data: any): ActionEditor;
    createForm(data: any): FormEditor;
    removeForm(form: any): void;
    setValue(name: any, value: any): Promise<any>;
    deleteData(): Promise<void>;
    delete(): Promise<void>;
    newForm(params: any): Promise<FormEditor>;
    getView(view: any): Promise<any>;
    saveView(text: any, view: any): Promise<any>;
    saveController(text: any): Promise<any>;
    createView(): Promise<any>;
    createController(): Promise<any>;
    createStyle(): Promise<any>;
    createModelBackJs(): Promise<any>;
    newAction(params: any): Promise<ActionEditor>;
}
