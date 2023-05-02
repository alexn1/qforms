import { RowFormFieldController } from '../RowFormFieldController';
import { ComboBoxField } from '../../../../../Model/Field/ComboBoxField/ComboBoxField';
export declare class RowFormComboBoxFieldController extends RowFormFieldController<ComboBoxField> {
    init(): void;
    deinit(): void;
    getViewClass(): any;
    getItems(): {
        value: string;
        title: any;
    }[];
    getRows(): import("../../../../..").RawRow[];
    getPlaceholder(): any;
    onEditButtonClick: (e: any) => Promise<void>;
    onCreateButtonClick: (e: any) => Promise<void>;
    onListInsert: (e: any) => Promise<void>;
    onListUpdate: (e: any) => Promise<void>;
    onListDelete: (e: any) => Promise<void>;
    onItemSelect: (e: any) => Promise<void>;
}
