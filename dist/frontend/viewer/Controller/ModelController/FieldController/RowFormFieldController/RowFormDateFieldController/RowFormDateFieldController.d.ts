import { RowFormFieldController } from '../RowFormFieldController';
import { DateField } from '../../../../../Model/Field/DateField/DateField';
export declare class RowFormDateFieldController extends RowFormFieldController<DateField> {
    getViewClass(): any;
    getValueForWidget(): any;
    setValueFromWidget(widgetValue: any): void;
}
