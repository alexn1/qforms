import { DocumentController } from '../DocumentController';
import { KeyColumnController } from '../../KeyColumnController/KeyColumnController';
export declare class DataSourceController extends DocumentController {
    keyColumns: any[];
    items: any[];
    constructor(model: any, parent: any);
    getTitle(): string;
    getStyle(): {
        color: string;
    };
    init(): void;
    createKeyColumn(model: any): KeyColumnController;
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
