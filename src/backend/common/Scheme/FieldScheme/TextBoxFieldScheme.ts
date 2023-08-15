import { FieldAttributes, FieldScheme } from './FieldScheme';

export interface TextBoxFieldAttributes extends FieldAttributes {
    readOnly: 'true' | 'false';
    notNull: 'true' | 'false';
    placeholder: string;
    validateOnChange: 'true' | 'false';
    validateOnBlur: 'true' | 'false';
    autocomplete: string;
}

export interface TextBoxFieldScheme extends FieldScheme {
    '@class': 'TextBoxField';
    '@attributes': TextBoxFieldAttributes;
}
