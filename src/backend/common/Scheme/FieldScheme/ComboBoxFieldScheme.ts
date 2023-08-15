import { FieldAttributes, FieldScheme } from './FieldScheme';

export interface ComboBoxFieldAttributes extends FieldAttributes {
    readOnly: 'true' | 'false';
    notNull: 'true' | 'false';
    placeholder: string;
    dataSourceName: string;
    valueColumn: string;
    displayColumn: string;
    newRowMode: 'enabled' | 'disabled';
    itemEditPage: string;
    itemCreatePage: string;
    itemCreateForm: string;
    itemSelectPage: string;
}

export interface ComboBoxFieldScheme extends FieldScheme {
    '@class': 'ComboBoxField';
    '@attributes': ComboBoxFieldAttributes;
}
