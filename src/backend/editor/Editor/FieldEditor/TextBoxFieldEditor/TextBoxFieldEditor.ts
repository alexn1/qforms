import {
    TextBoxFieldAttributes,
    TextBoxFieldScheme,
} from '../../../../common/Scheme/FieldScheme/TextBoxFieldScheme';
import { FieldEditor } from '../FieldEditor';

export type TextBoxFieldParams = Partial<TextBoxFieldAttributes> & { name: string };

export class TextBoxFieldEditor extends FieldEditor<TextBoxFieldScheme> {
    static createData(params: TextBoxFieldParams): TextBoxFieldScheme {
        return {
            '@class': 'TextBoxField',
            '@attributes': {
                ...FieldEditor.createAttributes(params),
                readOnly: params.readOnly ? params.readOnly : 'false',
                notNull: params.notNull ? params.notNull : 'false',
                placeholder: params.placeholder ? params.placeholder : '',
                validateOnChange: params.validateOnChange ? params.validateOnChange : 'true',
                validateOnBlur: params.validateOnBlur ? params.validateOnBlur : 'false',
                autocomplete: params.autocomplete ? params.autocomplete : '',
            },
        };
    }
}
