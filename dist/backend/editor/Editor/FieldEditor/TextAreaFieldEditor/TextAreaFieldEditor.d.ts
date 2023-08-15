import { TextAreaFieldAttributes, TextAreaFieldScheme } from '../../../../common/Scheme/FieldScheme/TextAreaFieldScheme';
import { FieldEditor } from '../FieldEditor';
export type TextAreaFieldParams = Partial<TextAreaFieldAttributes> & {
    name: string;
};
export declare class TextAreaFieldEditor extends FieldEditor<TextAreaFieldScheme> {
    static createData(params: TextAreaFieldParams): TextAreaFieldScheme;
}
