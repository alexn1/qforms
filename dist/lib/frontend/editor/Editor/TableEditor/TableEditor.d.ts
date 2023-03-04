import { Editor } from '../Editor';
import { ColumnEditor } from '../ColumnEditor/ColumnEditor';
export declare class TableEditor extends Editor {
    database: any;
    columns: any[];
    constructor(data: any, database: any);
    init(): void;
    createColumn(data: any): ColumnEditor;
    removeColumn(column: any): void;
    newColumn(name: any): Promise<ColumnEditor>;
    deleteData(): Promise<void>;
    delete(): Promise<void>;
    moveUp(): Promise<any>;
    moveDown(): Promise<any>;
    setValue(name: any, value: any): Promise<any>;
}
