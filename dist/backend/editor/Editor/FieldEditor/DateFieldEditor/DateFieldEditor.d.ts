import { DateFieldAttributes, DateFieldSchema } from '../../../../common/Scheme/FieldScheme/DateFieldScheme';
import { FieldEditor } from '../FieldEditor';
export type DateFieldParam = Partial<DateFieldAttributes> & {
    name: string;
};
export declare class DateFieldEditor extends FieldEditor<DateFieldSchema> {
    static createData(params: DateFieldParam): DateFieldSchema;
}
