import { PhoneFieldAttributes, PhoneFieldScheme } from '../../../../common/Scheme/FieldScheme/PhoneFieldScheme';
import { FieldEditor } from '../FieldEditor';
export type PhoneFieldParams = Partial<PhoneFieldAttributes> & {
    name: string;
};
export declare class PhoneFieldEditor extends FieldEditor<PhoneFieldScheme> {
    static createData(params: PhoneFieldParams): PhoneFieldScheme;
}
