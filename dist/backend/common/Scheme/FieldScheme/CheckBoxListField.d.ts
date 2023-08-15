import { FieldAttributes, FieldScheme } from './FieldScheme';
export interface CheckBoxListFieldAttributes extends FieldAttributes {
    readOnly: 'true' | 'false';
    notNull: 'true' | 'false';
    dataSourceName: string;
    valueColumn: string;
    displayColumn: string;
}
export interface CheckBoxFieldScheme extends FieldScheme {
    '@class': 'CheckBoxListField';
    '@attributes': CheckBoxListFieldAttributes;
}
