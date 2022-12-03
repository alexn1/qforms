import { RowFormFieldController } from '../RowFormFieldController';
export declare class RowFormComboBoxFieldController extends RowFormFieldController {
    init(): void;
    deinit(): void;
    getViewClass(): any;
    getItems(): any;
    getRows(): any;
    getPlaceholder(): any;
    onEditButtonClick: (e: any) => Promise<void>;
    onCreateButtonClick: (e: any) => Promise<void>;
    onListInsert: (e: any) => Promise<void>;
    onListUpdate: (e: any) => Promise<void>;
    onListDelete: (e: any) => Promise<void>;
    onItemSelect: (e: any) => Promise<void>;
}
