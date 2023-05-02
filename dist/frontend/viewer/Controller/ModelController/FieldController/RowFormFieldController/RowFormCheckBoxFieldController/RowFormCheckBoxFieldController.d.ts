import { RowFormFieldController } from '../RowFormFieldController';
import { CheckBoxField } from '../../../../../Model/Field/CheckBoxField/CheckBoxField';
export declare class RowFormCheckBoxFieldController extends RowFormFieldController<CheckBoxField> {
    getViewClass(): any;
    getValueForWidget(): any;
    setValueFromWidget(widgetValue: any): void;
}
