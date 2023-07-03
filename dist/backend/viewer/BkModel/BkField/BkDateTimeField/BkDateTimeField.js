"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkDateTimeField = void 0;
const BkField_1 = require("../BkField");
const BkHelper_1 = require("../../../../BkHelper");
class BkDateTimeField extends BkField_1.BkField {
    fillAttributes(response) {
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
            const v = BkHelper_1.BkHelper.cloneDate(value);
            BkHelper_1.BkHelper.removeTimezoneOffset(v);
            raw = BkHelper_1.BkHelper.encodeValue(v);
        }
        else {
            raw = BkHelper_1.BkHelper.encodeValue(value);
        }
        // console.debug('DateTimeField.rawToValue', this.getFullName(), value, raw);
        return raw;
    }
    rawToValue(raw) {
        const value = BkHelper_1.BkHelper.decodeValue(raw);
        if (value && !this.isTimezone()) {
            BkHelper_1.BkHelper.addTimezoneOffset(value);
        }
        // console.debug('DateTimeField.rawToValue', this.getFullName(), raw, value);
        return value;
    }
}
exports.BkDateTimeField = BkDateTimeField;
