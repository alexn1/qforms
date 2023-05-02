import { DocumentController } from '../DocumentController';
import { ParamController } from '../../ParamController/ParamController';
import { TableController } from '../TableController/TableController';
import { DatabaseView } from './DatabaseView';
export declare class DatabaseController extends DocumentController {
    tableName: any;
    tableInfo: any;
    params: any[];
    tables: any[];
    items: any[];
    constructor(model: any, parent: any);
    getTitle(): string;
    getStyle(): {
        color: string;
    };
    init(): void;
    createParam(model: any): ParamController;
    createTable2(model: any): TableController;
    removeParam(paramController: any): void;
    removeTable2(tableController: any): void;
    getActions(): {
        action: string;
        caption: string;
    }[];
    doAction(name: any): Promise<void>;
    actionNewParam(): Promise<void>;
    actionNewTable(): Promise<void>;
    createDocument(): Promise<any>;
    onTableSelect2: (item: any) => Promise<void>;
    onCreateTableClick: (e: any) => void;
    newTableAction(tableName: any, tableInfo: any): Promise<void>;
    delete(): Promise<void>;
    getDocumentViewClass(): typeof DatabaseView;
}
