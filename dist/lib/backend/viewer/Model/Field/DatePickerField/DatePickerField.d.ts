import Field from '../Field';
declare class DateField extends Field {
    fillAttributes(response: any): void;
    valueToRaw(value: any): any;
    rawToValue(raw: any): any;
}
export = DateField;
