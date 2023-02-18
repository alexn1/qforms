import { Field } from '../Field';
export declare class RadioField extends Field {
    getDisplayValue(row: any): any;
    getValueValue(row: any): any;
    getDataSource(): import("../../..").DataSource;
    findRowByRawValue(rawValue: any): import("../../../../../types").RawRow;
}
