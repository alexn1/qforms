import { EdVisualController } from '../EdVisualController';
import { EdFieldController } from '../EdFieldController/EdFieldController';
import { EdVisualView } from '../EdVisualView';
export declare class EdFormController extends EdVisualController {
    fields: any[];
    items: any[];
    constructor(model: any, parent: any);
    getTitle(): string;
    getStyle(): {
        color: string;
    };
    init(): void;
    createField(model: any): EdFieldController;
    removeField(fieldController: any): void;
    getActions(): {
        action: string;
        caption: string;
    }[];
    doAction(name: any): Promise<void>;
    actionNewDataSource(): Promise<void>;
    actionNewField(): Promise<void>;
    getPropList(): {
        list: any;
        options: {
            editMethod: string[];
            newRowMode: string[];
            deleteRowMode: string[];
            refreshButton: string[];
            visible: string[];
            newMode: string[];
            backOnly: string[];
        };
    };
    setProperty(name: any, value: any): Promise<void>;
    delete(): Promise<void>;
    getDocumentViewClass(): typeof EdVisualView;
}
