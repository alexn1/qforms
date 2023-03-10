import { Field } from '../Field';
import { Helper } from '../../../../common';
import { JSONString } from '../../../../../types';

export class DateField extends Field {
    getFormat() {
        return this.getAttr('format');
    }

    rawToValue(raw) {
        // console.log('DateField.rawToValue', this.getFullName(), raw);
        const value = Helper.decodeValue(raw);
        if (value && this.getAttr('timezone') === 'false') {
            Helper.addTimezoneOffset(value);
        }
        // console.log('DateField.rawToValue:', raw, value);
        return value;
    }

    valueToRaw(value: Date): JSONString {
        let rawValue: JSONString;
        if (value && this.getAttr('timezone') === 'false') {
            const v = Helper.cloneDate(value);
            Helper.removeTimezoneOffset(v);
            rawValue = Helper.encodeValue(v);
        } else {
            rawValue = Helper.encodeValue(value);
        }
        // console.log('DateField.valueToRaw', rawValue);
        return rawValue;
    }
}

Helper.registerGlobalClass(DateField);
