import { FieldAttributes, FieldScheme } from './FieldScheme';
export interface TextAreaFieldAttributes extends FieldAttributes {
    readOnly: 'true' | 'false';
    notNull: 'true' | 'false';
    rows: string;
    cols: string;
    validateOnChange: 'true' | 'false';
    validateOnBlur: 'true' | 'false';
}
export interface TextAreaFieldScheme extends FieldScheme {
    '@class': 'TextAreaField';
    '@attributes': TextAreaFieldAttributes;
}
