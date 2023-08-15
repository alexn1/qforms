import { FieldAttributes, FieldScheme } from './FieldScheme';

export interface RadioFieldAttributes extends FieldAttributes {
    readOnly: 'true' | 'false';
    notNull: 'true' | 'false';
    dataSourceName: string;
    valueColumn: string;
    displayColumn: string;
}

export interface RadioFieldScheme extends FieldScheme {
    '@class': 'RadioField';
    '@attributes': RadioFieldAttributes;
}
