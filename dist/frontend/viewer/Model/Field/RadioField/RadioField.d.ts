import { Field } from '../Field';
import { JSONString, RawRow } from '../../../../../types';
export declare class RadioField extends Field {
    getDisplayValue(row: any): any;
    getValueValue(row: any): any;
    getDataSource(): import("../../..").DataSource;
    findRowByRawValue(rawValue: JSONString): RawRow;
}