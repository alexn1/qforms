import { EdDocumentController } from '../EdDocumentController';
import { EdColumnController } from '../../EdColumnController/EdColumnController';
import { EdTableView } from './EdTableView';
export declare class EdTableController extends EdDocumentController {
    columns: any[];
    items: any[];
    constructor(model: any, parent: any);
    init(): void;
    createColumn(model: any): EdColumnController;
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
    getDocumentViewClass(): typeof EdTableView;
}
