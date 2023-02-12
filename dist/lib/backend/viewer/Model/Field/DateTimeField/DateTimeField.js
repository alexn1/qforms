"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkDateTimeField = void 0;
const Field_1 = require("../Field");
const Helper_1 = require("../../../../Helper");
class BkDateTimeField extends Field_1.BkField {
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
            const v = Helper_1.Helper.cloneDate(value);
            Helper_1.Helper.removeTimezoneOffset(v);
            raw = Helper_1.Helper.encodeValue(v);
        }
        else {
            raw = Helper_1.Helper.encodeValue(value);
        }
        // console.log('DateTimeField.rawToValue', this.getFullName(), value, raw);
        return raw;
    }
    rawToValue(raw) {
        const value = Helper_1.Helper.decodeValue(raw);
        if (value && !this.isTimezone()) {
            Helper_1.Helper.addTimezoneOffset(value);
        }
        // console.log('DateTimeField.rawToValue', this.getFullName(), raw, value);
        return value;
    }
}
exports.BkDateTimeField = BkDateTimeField;
