import { TableFormFieldController } from '../TableFormFieldController';
import { TimeField } from '../../../../../Model/Field/TimeField/TimeField';
import { RawRow } from '../../../../../../../types';
export declare class TableFormTimeFieldController extends TableFormFieldController<TimeField> {
    getViewClass(): any;
    getValueForWidget(row: RawRow): string;
}
