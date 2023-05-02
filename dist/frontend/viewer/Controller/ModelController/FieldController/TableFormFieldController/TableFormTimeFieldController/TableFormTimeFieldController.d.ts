import { TableFormFieldController } from '../TableFormFieldController';
import { TimeField } from '../../../../../Model/Field/TimeField/TimeField';
export declare class TableFormTimeFieldController extends TableFormFieldController<TimeField> {
    getViewClass(): any;
    getValueForWidget(row: any): string;
}
