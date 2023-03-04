import { Field } from '../Field';
import { Helper } from '../../../../common';
import { JSONString } from '../../../../../types';

export class DateTimeField extends Field {
    getFormat() {
        return this.getAttr('format');
    }

    rawToValue(rawValue: JSONString): any {
        const value = Helper.decodeValue(rawValue);
        if (value && this.getAttr('timezone') === 'false') {
            Helper.addTimezoneOffset(value);
        }
        // console.log('DateTimeField.rawToValue:', value);
        return value;
    }

    valueToRaw(value): JSONString {
        let rawValue: JSONString;
        if (value && this.getAttr('timezone') === 'false') {
            const v = Helper.cloneDate(value);
            Helper.removeTimezoneOffset(v);
            // console.log('date without timezone:', v);
            rawValue = Helper.encodeValue(v);
        } else {
            rawValue = Helper.encodeValue(value);
        }
        // console.log('DateTimeField.valueToRaw', rawValue);
        return rawValue;
    }
}

if (typeof window === 'object') {
    // @ts-ignore
    window.DateTimeField = DateTimeField;
}
