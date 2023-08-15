import { FieldAttributes, FieldScheme } from './FieldScheme';
export interface DateFieldAttributes extends FieldAttributes {
    readOnly: 'true' | 'false';
    notNull: 'true' | 'false';
    format: string;
    timezone: 'true' | 'false';
    placeholder: string;
    validateOnChange: 'true' | 'false';
    validateOnBlur: 'true' | 'false';
}
export interface DateFieldSchema extends FieldScheme {
    '@class': 'DateField';
    '@attributes': DateFieldAttributes;
}
