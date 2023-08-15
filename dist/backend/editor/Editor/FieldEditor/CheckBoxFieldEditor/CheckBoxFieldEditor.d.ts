import { FieldEditor } from '../FieldEditor';
import { CheckBoxFieldAttributes, CheckBoxFieldScheme } from '../../../../common/Scheme/FieldScheme/CheckBoxFieldScheme';
export type CheckBoxFieldParams = Partial<CheckBoxFieldAttributes> & {
    name: string;
};
export declare class CheckBoxFieldEditor extends FieldEditor<CheckBoxFieldScheme> {
    static createData(params: CheckBoxFieldParams): CheckBoxFieldScheme;
}
