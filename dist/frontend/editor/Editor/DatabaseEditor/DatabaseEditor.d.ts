import { Editor } from '../Editor';
import { ParamEditor } from '../ParamEditor/ParamEditor';
import { TableEditor } from '../TableEditor/TableEditor';
export declare class DatabaseEditor extends Editor {
    params: any[];
    tables: any[];
    constructor(data: any, parent: any);
    init(): void;
    createParam(data: any): ParamEditor;
    createTable(data: any): TableEditor;
    removeParam(param: any): void;
    removeTable(table: any): void;
    setValue(name: any, value: any): Promise<any>;
    deleteData(): Promise<any>;
    delete(): Promise<void>;
    newParam(name: any): Promise<ParamEditor>;
    newTable(params: any): Promise<TableEditor>;
    getView(view: any): Promise<any>;
    getTableInfo(table: any): Promise<any>;
    moveUp(): Promise<any>;
    moveDown(): Promise<any>;
}
