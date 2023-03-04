import { DocumentController } from '../DocumentController';
import { ColumnController } from '../../ColumnController/ColumnController';
import { TableView } from './TableView';
export declare class TableController extends DocumentController {
    columns: any[];
    items: any[];
    constructor(model: any, parent: any);
    init(): void;
    createColumn(model: any): ColumnController;
    removeColumn(columnController: any): void;
    getActions(): {
        action: string;
        caption: string;
    }[];
    doAction(name: any): Promise<void>;
    actionNewColumn(): Promise<void>;
    onCreateFormButtonClick: (e: any) => Promise<void>;
    static getView(view: any): Promise<any>;
    createFormAction(): Promise<void>;
    delete(): Promise<void>;
    getDocumentViewClass(): typeof TableView;
}
