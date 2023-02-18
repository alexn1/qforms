import { Field } from '../Field';
import { JSONString } from '../../../../../types';
export declare class DateField extends Field {
    getFormat(): any;
    rawToValue(raw: any): any;
    valueToRaw(value: Date): JSONString;
}
