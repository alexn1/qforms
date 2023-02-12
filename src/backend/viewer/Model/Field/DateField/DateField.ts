import { BkField } from '../Field';
import { Helper } from '../../../../Helper';

export class BkDateField extends BkField {
    fillAttributes(response: any): void {
        super.fillAttributes(response);
        response.readOnly = this.getAttr('readOnly');
        response.notNull = this.getAttr('notNull');
        response.format = this.getAttr('format');
        // if (this.isAttr('timezone')) {
        response.timezone = this.getAttr('timezone');
        // }
        response.placeholder = this.getAttr('placeholder');
        response.validateOnChange = this.getAttr('validateOnChange');
        response.validateOnBlur = this.getAttr('validateOnBlur');
    }
    valueToRaw(value) {
        let raw;
        if (value && !this.isTimezone()) {
            const v = Helper.cloneDate(value);
            Helper.removeTimezoneOffset(v);
            raw = Helper.encodeValue(v);
        } else {
            raw = Helper.encodeValue(value);
        }
        // console.log('DateField.valueToRaw', this.getFullName(), value, raw);
        return raw;
    }
    rawToValue(raw) {
        const value = Helper.decodeValue(raw);
        if (value && !this.isTimezone()) {
            Helper.addTimezoneOffset(value);
        }
        // console.log('DateField.rawToValue', this.getFullName(), raw, value);
        return value;
    }
}
