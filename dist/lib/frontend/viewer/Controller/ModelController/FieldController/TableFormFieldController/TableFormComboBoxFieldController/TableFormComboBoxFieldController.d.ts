import { TableFormFieldController } from '../TableFormFieldController';
import { ComboBoxField } from '../../../../../Model/Field/ComboBoxField/ComboBoxField';
import { RawRow } from '../../../../../../../types';
export declare class TableFormComboBoxFieldController extends TableFormFieldController<ComboBoxField> {
    init(): void;
    deinit(): void;
    getViewClass(): any;
    getValueForWidget(row: RawRow): string;
    onListUpdate: (e: any) => Promise<void>;
}
