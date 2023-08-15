import { FieldAttributes, FieldScheme } from './FieldScheme';
export interface LabelFieldAttributes extends FieldAttributes {
}
export interface LabelFieldSchema extends FieldScheme {
    '@class': 'LabelField';
    '@attributes': LabelFieldAttributes;
}
