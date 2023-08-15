import { TimeFieldAttributes, TimeFieldScheme } from '../../../../common/Scheme/FieldScheme/TimeFieldScheme';
import { FieldEditor } from '../FieldEditor';
export type TimeFieldParams = Partial<TimeFieldAttributes> & {
    name: string;
};
export declare class TimeFieldEditor extends FieldEditor<TimeFieldScheme> {
    static createData(params: TimeFieldParams): TimeFieldScheme;
}
