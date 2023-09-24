import { TableFormFieldController } from '../TableFormFieldController';
import { DateField } from '../../../../../Model/Field/DateField/DateField';
import { RawRow } from '../../../../../../../types';
export declare class TableFormDateFieldController extends TableFormFieldController<DateField> {
    getViewClass(): any;
    getValueForWidget(row: RawRow): string;
}
