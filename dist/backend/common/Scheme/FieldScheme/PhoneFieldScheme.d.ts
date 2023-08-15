import { FieldAttributes, FieldScheme } from './FieldScheme';
export interface PhoneFieldAttributes extends FieldAttributes {
    readOnly: 'true' | 'false';
    notNull: 'true' | 'false';
    placeholder: string;
    validateOnChange: 'true' | 'false';
    validateOnBlur: 'true' | 'false';
    autocomplete: string;
}
export interface PhoneFieldScheme extends FieldScheme {
    '@class': 'PhoneField';
    '@attributes': PhoneFieldAttributes;
}
