import { Field } from '../Field';
import { Helper } from '../../../../common';
import { JSONString } from '../../../../../types';
import { DateTimeHelper } from '../../../../common';

export class DateField extends Field {
    getFormat(): string {
        return this.getAttr('format');
    }

    rawToValue(raw: JSONString) {
        // console.debug('DateField.rawToValue', this.getFullName(), raw);
        const value = Helper.decodeValue(raw);
        if (value && this.getAttr('timezone') === 'false') {
            DateTimeHelper.addTimezoneOffset(value);
        }
        return value;
    }

    valueToRaw(value: Date): JSONString {
        let rawValue: JSONString;
        if (value && this.getAttr('timezone') === 'false') {
            const v = DateTimeHelper.cloneDate(value);
            DateTimeHelper.removeTimezoneOffset(v);
            rawValue = Helper.encodeValue(v);
        } else {
            rawValue = Helper.encodeValue(value);
        }
        return rawValue;
    }
}

Helper.registerGlobalClass(DateField);
