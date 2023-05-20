import { EdDocumentController } from '../EdDocumentController';
import { EdKeyColumnController } from '../../EdKeyColumnController/EdKeyColumnController';
export declare class EdDataSourceController extends EdDocumentController {
    keyColumns: any[];
    items: any[];
    constructor(model: any, parent: any);
    getTitle(): string;
    getStyle(): {
        color: string;
    };
    init(): void;
    createKeyColumn(model: any): EdKeyColumnController;
    removeKeyColumn(keyColumnController: any): void;
    getActions(): {
        action: string;
        caption: string;
    }[];
    doAction(name: any): Promise<void>;
    actionNewKeyColumn(): Promise<void>;
    getPropList(): {
        list: {};
        options: {};
    };
    getDocumentViewClass(): any;
    onSaveClick(name: any, value: any): Promise<void>;
    delete(): Promise<void>;
    onCreateModelBack: (e: any) => Promise<void>;
}
