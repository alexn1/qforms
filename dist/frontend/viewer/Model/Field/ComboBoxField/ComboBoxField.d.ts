import { Field } from '../Field';
import { JSONString, RawRow } from '../../../../../types';
export declare class ComboBoxField extends Field {
    getDisplayValue(row: any): any;
    getValueValue(row: any): any;
    getComboBoxDataSource(): import("../../..").DataSource;
    findRowByRawValue(rawValue: JSONString): RawRow;
}
