import { FieldAttributes, FieldScheme } from './FieldScheme';

export interface FileFieldAttributes extends FieldAttributes {
    readOnly: 'true' | 'false';
    notNull: 'true' | 'false';
}

export interface FileFieldScheme extends FieldScheme {
    '@class': 'FileField';
    '@attributes': FileFieldAttributes;
}
