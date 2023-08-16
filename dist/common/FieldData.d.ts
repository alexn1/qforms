import { ModelData } from './ModelData';
export interface FieldData extends ModelData {
    caption: string;
    column: string;
    defaultValue: string;
    value: string;
    param: string;
    visible: string;
    type: string;
    width: string;
    cssBlock: string;
    viewClass: string;
    ctrlClass: string;
    autoFocus: string;
    readOnly: string;
    notNull: string;
    validateOnChange: string;
    validateOnBlur: string;
    cols: string;
    rows: string;
    valueColumn: string;
    dataSourceName: string;
    displayColumn: string;
}
