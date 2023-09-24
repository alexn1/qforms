import { BkField } from '../BkField';
import { JSONString } from '../../../../../types';
export declare class BkDateTimeField extends BkField {
    fillAttributes(response: any): void;
    valueToRaw(value: any): any;
    rawToValue(raw: JSONString<Date>): any;
}
