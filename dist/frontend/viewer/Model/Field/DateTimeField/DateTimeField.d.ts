import { Field } from '../Field';
import { JSONString } from '../../../../../types';
export declare class DateTimeField extends Field {
    getFormat(): any;
    rawToValue(rawValue: JSONString): any;
    valueToRaw(value: any): JSONString;
}
