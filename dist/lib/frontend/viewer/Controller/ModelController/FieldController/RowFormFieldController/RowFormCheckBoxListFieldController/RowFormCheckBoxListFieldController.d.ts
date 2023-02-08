import { RowFormFieldController } from '../RowFormFieldController';
import { CheckBoxListField } from '../../../../../Model/Field/CheckBoxListField/CheckBoxListField';
export declare class RowFormCheckBoxListFieldController extends RowFormFieldController<CheckBoxListField> {
    init(): void;
    deinit(): void;
    getViewClass(): any;
    getRows(): any;
    onListInsert: (e: any) => Promise<void>;
    onListUpdate: (e: any) => Promise<void>;
    onListDelete: (e: any) => Promise<void>;
    getValueForWidget(): any;
    setValueFromWidget(widgetValue: any): void;
    getItemFromRow(row: any): {
        value: string;
        title: any;
    };
}
