import Field from '../Field';
const Helper = require('../../../../Helper');

class DatePickerField extends Field {
    fillAttributes(response: any): void {
        super.fillAttributes(response);
        response.readOnly = this.getAttr('readOnly');
        response.notNull  = this.getAttr('notNull');
        response.format  = this.getAttr('format');
        if (this.isAttr('timezone')) {
            response.timezone  = this.getAttr('timezone');
        }
        response.placeholder  = this.getAttr('placeholder');
        response.validateOnChange  = this.getAttr('validateOnChange');
        response.validateOnBlur  = this.getAttr('validateOnBlur');
    }
    valueToRaw(value) {
        let raw;
        if (value) {
            const v = new Date(value.getTime());
            Helper.addMinutes(v, -v.getTimezoneOffset());
            raw = Helper.encodeValue(v);
        } else {
            raw = Helper.encodeValue(value);
        }
        // console.log('DatePickerField.valueToRaw', this.getFullName(), value, raw);
        return raw;
    }
    rawToValue(raw) {
        const value = Helper.decodeValue(raw);
        if (value && this.getAttr('timezone') === 'false') {
            Helper.addMinutes(value, value.getTimezoneOffset());
        }
        // console.log('DatePickerField.rawToValue', this.getFullName(), raw, value);
        return value;
    }
}

export = DatePickerField;
