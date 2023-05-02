import { TableFormFieldController } from '../TableFormFieldController';
import { DateTimeField } from '../../../../../Model/Field/DateTimeField/DateTimeField';
export declare class TableFormDateTimeFieldController extends TableFormFieldController<DateTimeField> {
    getViewClass(): any;
    getValueForWidget(row: any): any;
}
