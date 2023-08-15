import {
    PasswordFieldAttributes,
    PasswordFieldScheme,
} from '../../../../common/Scheme/FieldScheme/PasswordFieldScheme';
import { FieldEditor } from '../FieldEditor';

export type PasswordFieldParams = Partial<PasswordFieldAttributes> & { name: string };

export class PasswordFieldEditor extends FieldEditor<PasswordFieldScheme> {
    static createData(params: PasswordFieldParams): PasswordFieldScheme {
        return {
            '@class': 'PasswordField',
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
