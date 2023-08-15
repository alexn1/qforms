import { TextBoxFieldAttributes, TextBoxFieldScheme } from '../../../../common/Scheme/FieldScheme/TextBoxFieldScheme';
import { FieldEditor } from '../FieldEditor';
export type TextBoxFieldParams = Partial<TextBoxFieldAttributes> & {
    name: string;
};
export declare class TextBoxFieldEditor extends FieldEditor<TextBoxFieldScheme> {
    static createData(params: TextBoxFieldParams): TextBoxFieldScheme;
}
