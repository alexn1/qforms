import { TableFormFieldController } from '../TableFormFieldController';
import { ComboBoxField } from '../../../../../Model/Field/ComboBoxField/ComboBoxField';
export declare class TableFormComboBoxFieldController extends TableFormFieldController<ComboBoxField> {
    init(): void;
    deinit(): void;
    getViewClass(): any;
    getValueForWidget(row: any): string;
    onListUpdate: (e: any) => Promise<void>;
}
