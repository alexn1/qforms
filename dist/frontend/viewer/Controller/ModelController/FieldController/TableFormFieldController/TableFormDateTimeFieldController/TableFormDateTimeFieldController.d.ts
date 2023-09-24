import { TableFormFieldController } from '../TableFormFieldController';
import { DateTimeField } from '../../../../../Model/Field/DateTimeField/DateTimeField';
import { RawRow } from '../../../../../../../types';
export declare class TableFormDateTimeFieldController extends TableFormFieldController<DateTimeField> {
    getViewClass(): any;
    getValueForWidget(row: RawRow): string;
}
