import { DateTimeFieldAttributes, DateTimeFieldScheme } from '../../../../common/Scheme/FieldScheme/DateTimeFieldScheme';
import { FieldEditor } from '../FieldEditor';
export type DateTimeFieldParams = Partial<DateTimeFieldAttributes> & {
    name: string;
};
export declare class DateTimeFieldEditor extends FieldEditor<DateTimeFieldScheme> {
    static createData(params: DateTimeFieldParams): DateTimeFieldScheme;
}
