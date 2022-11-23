import Field = require('../Field');
import {Helper} from '../../../../Helper';

class DateTimeField extends Field {
    fillAttributes(response: any): void {
        super.fillAttributes(response);
        response.readOnly = this.getAttr('readOnly');
        response.notNull  = this.getAttr('notNull');
        response.format  = this.getAttr('format');
        response.timezone  = this.getAttr('timezone');
        response.placeholder  = this.getAttr('placeholder');
        response.validateOnChange  = this.getAttr('validateOnChange');
        response.validateOnBlur  = this.getAttr('validateOnBlur');
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
        // console.log('DateTimeField.rawToValue', this.getFullName(), value, raw);
        return raw;
    }
    rawToValue(raw) {
        const value = Helper.decodeValue(raw);
        if (value && !this.isTimezone()) {
            Helper.addTimezoneOffset(value);
        }
        // console.log('DateTimeField.rawToValue', this.getFullName(), raw, value);
        return value;
    }
}

export = DateTimeField;
