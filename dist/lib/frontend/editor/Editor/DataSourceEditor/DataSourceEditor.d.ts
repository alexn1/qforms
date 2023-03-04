import { Editor } from '../Editor';
import { KeyColumnEditor } from '../KeyColumnEditor/KeyColumnEditor';
export declare class DataSourceEditor extends Editor {
    keyColumns: any[];
    constructor(data: any, parent: any);
    init(): void;
    createKeyColumn(data: any): KeyColumnEditor;
    removeKeyColumn(keyColumn: any): void;
    static create(parent: any, params: any): Promise<any>;
    setValue(name: any, value: any): Promise<any>;
    deleteData(): Promise<void>;
    createModelBackJs(): Promise<any>;
    delete(): Promise<void>;
    moveUp(): Promise<any>;
    moveDown(): Promise<any>;
    newKeyColumnData(name: any): Promise<any>;
    newKeyColumn(name: any): Promise<KeyColumnEditor>;
    getView(view: any): Promise<any>;
    saveController(text: any): Promise<any>;
    createController(): Promise<any>;
    getFullName(): any;
}
