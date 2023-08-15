import { FieldAttributes, FieldScheme } from './FieldScheme';
export interface CheckBoxFieldAttributes extends FieldAttributes {
    readOnly: 'true' | 'false';
    notNull: 'true' | 'false';
}
export interface CheckBoxFieldScheme extends FieldScheme {
    '@class': 'CheckBoxField';
    '@attributes': CheckBoxFieldAttributes;
}
