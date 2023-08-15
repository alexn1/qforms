import { FieldAttributes, FieldScheme } from './FieldScheme';

export interface PasswordFieldAttributes extends FieldAttributes {
    readOnly: 'true' | 'false';
    notNull: 'true' | 'false';
    placeholder: string;
    validateOnChange: 'true' | 'false';
    validateOnBlur: 'true' | 'false';
    autocomplete: string;
}

export interface PasswordFieldScheme extends FieldScheme {
    '@class': 'PasswordField';
    '@attributes': PasswordFieldAttributes;
}
