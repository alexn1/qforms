import { FieldAttributes, FieldScheme } from './FieldScheme';
export interface LinkFieldAttributes extends FieldAttributes {
    notNull: 'true' | 'false';
    page: string;
    displayColumn: string;
}
export interface LinkFieldScheme extends FieldScheme {
    '@class': 'LinkField';
    '@attributes': LinkFieldAttributes;
}
