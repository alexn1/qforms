import { TableFormFieldController } from '../TableFormFieldController';
import { DateField } from '../../../../../Model/Field/DateField/DateField';
export declare class TableFormDateFieldController extends TableFormFieldController<DateField> {
    getViewClass(): any;
    getValueForWidget(row: any): string;
}
