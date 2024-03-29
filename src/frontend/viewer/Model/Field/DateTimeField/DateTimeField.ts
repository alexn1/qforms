import { Field } from '../Field';
import { Helper } from '../../../../common';
import { JSONString } from '../../../../../types';
import { DateTimeHelper } from '../../../../common';

export class DateTimeField extends Field {
    getFormat(): string {
        return this.getAttr('format');
    }

    rawToValue(rawValue: JSONString): any {
        const value = Helper.decodeValue(rawValue);
        if (value && this.getAttr('timezone') === 'false') {
            DateTimeHelper.addTimezoneOffset(value);
        }
        // console.debug('DateTimeField.rawToValue:', value);
        return value;
    }

    valueToRaw(value: any): JSONString {
        let rawValue: JSONString;
        if (value && this.getAttr('timezone') === 'false') {
            const v = DateTimeHelper.cloneDate(value);
            DateTimeHelper.removeTimezoneOffset(v);
            // console.debug('date without timezone:', v);
            rawValue = Helper.encodeValue(v);
        } else {
            rawValue = Helper.encodeValue(value);
        }
        // console.debug('DateTimeField.valueToRaw', rawValue);
        return rawValue;
    }
}

Helper.registerGlobalClass(DateTimeField);
