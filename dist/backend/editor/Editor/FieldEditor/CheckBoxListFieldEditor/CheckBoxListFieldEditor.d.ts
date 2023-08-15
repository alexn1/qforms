import { FieldEditor } from '../FieldEditor';
import { CheckBoxFieldScheme, CheckBoxListFieldAttributes } from '../../../../common/Scheme/FieldScheme/CheckBoxListField';
export type CheckBoxListFieldParams = Partial<CheckBoxListFieldAttributes> & {
    name: string;
};
export declare class CheckBoxListFieldEditor extends FieldEditor<CheckBoxFieldScheme> {
    static createData(params: CheckBoxListFieldParams): CheckBoxFieldScheme;
}
