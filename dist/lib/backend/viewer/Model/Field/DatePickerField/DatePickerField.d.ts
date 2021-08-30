import Field from '../Field';
declare class DatePickerField extends Field {
    fillAttributes(response: any): void;
    valueToRaw(value: any): any;
    rawToValue(raw: any): any;
}
export = DatePickerField;
