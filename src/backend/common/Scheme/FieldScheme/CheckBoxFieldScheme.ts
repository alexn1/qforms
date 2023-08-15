import { FieldAttributes } from './FieldScheme';

export interface CheckBoxFieldAttributes extends FieldAttributes {
    readOnly: 'true' | 'false';
    notNull: 'true' | 'false';
}

export type CheckBoxFieldScheme = {
    '@class': 'CheckBoxField';
    '@attributes': CheckBoxFieldAttributes;
};
