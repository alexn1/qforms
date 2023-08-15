import { FieldEditor } from '../FieldEditor';
import { ComboBoxFieldAttributes, ComboBoxFieldScheme } from '../../../../common/Scheme/FieldScheme/ComboBoxFieldScheme';
export type ComboBoxFieldParams = Partial<ComboBoxFieldAttributes> & {
    name: string;
};
export declare class ComboBoxFieldEditor extends FieldEditor<ComboBoxFieldScheme> {
    static createData(params: ComboBoxFieldParams): ComboBoxFieldScheme;
}
