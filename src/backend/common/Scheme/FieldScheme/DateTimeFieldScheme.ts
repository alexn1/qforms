import { FieldAttributes, FieldScheme } from './FieldScheme';

export interface DateTimeFieldAttributes extends FieldAttributes {
    readOnly: 'true' | 'false';
    notNull: 'true' | 'false';
    format: string;
    timezone: 'true' | 'false';
    placeholder: string;
    validateOnChange: 'true' | 'false';
    validateOnBlur: 'true' | 'false';
}

export interface DateTimeFieldScheme extends FieldScheme {
    '@class': 'DateTimeField';
    '@attributes': DateTimeFieldAttributes;
}
