import { BkField } from '../BkField';
import { BkHelper } from '../../../../BkHelper';

export class BkDateTimeField extends BkField {
    fillAttributes(response: any): void {
        super.fillAttributes(response);
        response.readOnly = this.getAttr('readOnly');
        response.notNull = this.getAttr('notNull');
        response.format = this.getAttr('format');
        response.timezone = this.getAttr('timezone');
        response.placeholder = this.getAttr('placeholder');
        response.validateOnChange = this.getAttr('validateOnChange');
        response.validateOnBlur = this.getAttr('validateOnBlur');
    }

    valueToRaw(value) {
        let raw;
        if (value && !this.isTimezone()) {
            const v = BkHelper.cloneDate(value);
            BkHelper.removeTimezoneOffset(v);
            raw = BkHelper.encodeValue(v);
        } else {
            raw = BkHelper.encodeValue(value);
        }
        // debug('DateTimeField.rawToValue', this.getFullName(), value, raw);
        return raw;
    }

    rawToValue(raw) {
        const value = BkHelper.decodeValue(raw);
        if (value && !this.isTimezone()) {
            BkHelper.addTimezoneOffset(value);
        }
        // debug('DateTimeField.rawToValue', this.getFullName(), raw, value);
        return value;
    }
}
