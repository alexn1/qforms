"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateField = void 0;
const Field_1 = require("../Field");
const common_1 = require("../../../../common");
class DateField extends Field_1.Field {
    getFormat() {
        return this.getAttr('format');
    }
    rawToValue(raw) {
        // console.debug('DateField.rawToValue', this.getFullName(), raw);
        const value = common_1.Helper.decodeValue(raw);
        if (value && this.getAttr('timezone') === 'false') {
            common_1.Helper.addTimezoneOffset(value);
        }
        // console.debug('DateField.rawToValue:', raw, value);
        return value;
    }
    valueToRaw(value) {
        let rawValue;
        if (value && this.getAttr('timezone') === 'false') {
            const v = common_1.Helper.cloneDate(value);
            common_1.Helper.removeTimezoneOffset(v);
            rawValue = common_1.Helper.encodeValue(v);
        }
        else {
            rawValue = common_1.Helper.encodeValue(value);
        }
        // console.debug('DateField.valueToRaw', rawValue);
        return rawValue;
    }
}
exports.DateField = DateField;
common_1.Helper.registerGlobalClass(DateField);
