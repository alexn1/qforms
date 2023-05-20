import { EdDocumentController } from '../EdDocumentController';
import { EdParamController } from '../../EdParamController/EdParamController';
import { EdTableController } from '../EdTableController/EdTableController';
import { EdDatabaseView } from './EdDatabaseView';
export declare class EdDatabaseController extends EdDocumentController {
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
    createParam(model: any): EdParamController;
    createTable2(model: any): EdTableController;
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
    getDocumentViewClass(): typeof EdDatabaseView;
}
