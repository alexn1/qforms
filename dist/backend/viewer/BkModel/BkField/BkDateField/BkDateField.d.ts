import { BkField } from '../BkField';
import { JSONString } from '../../../../../types';
export declare class BkDateField extends BkField {
    fillAttributes(response: any): void;
    valueToRaw(value: Date | string): any;
    rawToValue(raw: JSONString<Date>): any;
}
