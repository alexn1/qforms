import { FieldAttributes, FieldScheme } from './FieldScheme';
export interface ImageFieldAttributes extends FieldAttributes {
    readOnly: 'true' | 'false';
    notNull: 'true' | 'false';
}
export interface ImageFieldSchema extends FieldScheme {
    '@class': 'ImageField';
    '@attributes': ImageFieldAttributes;
}
