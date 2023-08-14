import { ActionScheme } from './ActionScheme';
import { DataSourceScheme } from './DataSourceScheme';
export interface FormAttributes {
    name: string;
    caption: string;
    visible: string;
    cssBlock: string;
    viewClass: string;
    ctrlClass: string;
    modelClass: string;
}
export interface FormItems {
    dataSources: DataSourceScheme[];
    actions: ActionScheme[];
    fields: any[];
}
export type FormScheme = {
    '@class': 'Form' | 'RowForm' | 'TableForm';
    '@attributes': FormAttributes;
} & FormItems;
export interface RowFormAttributes extends FormAttributes {
    newMode: 'true' | 'false' | '';
    backOnly: 'true' | 'false';
    refreshButton: 'true' | 'false';
}
export interface RowFormScheme extends FormScheme {
    '@class': 'RowForm';
    '@attributes': RowFormAttributes;
}
export interface TableFormAttributes extends FormAttributes {
    editMethod: 'disabled' | 'table' | 'form';
    itemEditPage: string;
    itemCreatePage: string;
    newRowMode: 'disabled' | 'oneclick' | 'editform' | 'createform' | 'oneclick editform' | 'oneclick createform';
    deleteRowMode: 'disabled' | 'enabled';
    refreshButton: 'true' | 'false';
}
export interface TableFormScheme extends FormScheme {
    '@class': 'TableForm';
    '@attributes': TableFormAttributes;
}
