import { PasswordFieldAttributes, PasswordFieldScheme } from '../../../../common/Scheme/FieldScheme/PasswordFieldScheme';
import { FieldEditor } from '../FieldEditor';
export type PasswordFieldParams = Partial<PasswordFieldAttributes> & {
    name: string;
};
export declare class PasswordFieldEditor extends FieldEditor<PasswordFieldScheme> {
    static createData(params: PasswordFieldParams): PasswordFieldScheme;
}
