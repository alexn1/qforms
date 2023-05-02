import { Editor } from '../Editor';
import { DataSourceEditor } from '../DataSourceEditor/DataSourceEditor';
import { ActionEditor } from '../ActionEditor/ActionEditor';
import { FieldEditor } from '../FieldEditor/FieldEditor';
export declare class FormEditor extends Editor {
    fields: any[];
    constructor(data: any, page: any);
    init(): void;
    createDataSource(data: any): DataSourceEditor;
    createAction(data: any): ActionEditor;
    createField(data: any): FieldEditor;
    removeField(field: any): void;
    setValue(name: any, value: any): Promise<any>;
    deleteData(): Promise<void>;
    delete(): Promise<void>;
    moveUp(): Promise<any>;
    moveDown(): Promise<any>;
    newField(params: any): Promise<FieldEditor>;
    newAction(params: any): Promise<ActionEditor>;
    newDataSource(params: any): Promise<DataSourceEditor>;
    getView(view: any): Promise<any>;
    saveView(text: any, view: any): Promise<any>;
    saveController(text: any): Promise<any>;
    createModelBackJs(): Promise<any>;
    createView(): Promise<any>;
    createController(): Promise<any>;
    createStyle(): Promise<any>;
}
