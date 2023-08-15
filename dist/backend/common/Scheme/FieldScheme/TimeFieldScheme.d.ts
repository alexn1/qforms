import { FieldAttributes, FieldScheme } from './FieldScheme';
export interface TimeFieldAttributes extends FieldAttributes {
    readOnly: 'true' | 'false';
    notNull: 'true' | 'false';
    placeholder: string;
    validateOnChange: 'true' | 'false';
    validateOnBlur: 'true' | 'false';
}
export interface TimeFieldScheme extends FieldScheme {
    '@class': 'TimeField';
    '@attributes': TimeFieldAttributes;
}
