import { RowFormFieldController } from '../RowFormFieldController';
import { TimeField } from '../../../../../Model/Field/TimeField/TimeField';
export declare class RowFormTimeFieldController extends RowFormFieldController<TimeField> {
    defaultValue: any;
    getViewClass(): any;
    getValueForWidget(): any;
    setValueFromWidget(widgetValue: any): void;
    getDefaultValue(): any;
    setDefaultValue2(defaultValue: any): void;
    getPlaceholder(): string | null;
}
