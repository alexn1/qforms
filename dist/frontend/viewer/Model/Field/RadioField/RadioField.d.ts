import { Field } from '../Field';
import { JSONString, RawRow } from '../../../../../types';
import { DataSource } from '../../DataSource/DataSource';
export declare class RadioField extends Field {
    getDisplayValue(row: RawRow): any;
    getValueValue(row: RawRow): any;
    getDataSource(): DataSource;
    findRowByRawValue(rawValue: JSONString): RawRow | undefined;
}
