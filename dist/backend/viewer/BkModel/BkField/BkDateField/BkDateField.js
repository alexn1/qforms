"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkDateField = void 0;
const BkField_1 = require("../BkField");
const BkHelper_1 = require("../../../../BkHelper");
class BkDateField extends BkField_1.BkField {
    fillAttributes(response) {
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
            const v = BkHelper_1.BkHelper.cloneDate(value);
            BkHelper_1.BkHelper.removeTimezoneOffset(v);
            raw = BkHelper_1.BkHelper.encodeValue(v);
        }
        else {
            raw = BkHelper_1.BkHelper.encodeValue(value);
        }
        // console.log('DateField.valueToRaw', this.getFullName(), value, raw);
        return raw;
    }
    rawToValue(raw) {
        const value = BkHelper_1.BkHelper.decodeValue(raw);
        if (value && !this.isTimezone()) {
            BkHelper_1.BkHelper.addTimezoneOffset(value);
        }
        // console.log('DateField.rawToValue', this.getFullName(), raw, value);
        return value;
    }
}
exports.BkDateField = BkDateField;
