import { Field } from '../Field';
import { JSONString } from '../../../../../types';
export declare class DateField extends Field {
    getFormat(): string;
    rawToValue(raw: JSONString): any;
    valueToRaw(value: Date): JSONString;
}
