"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeField = void 0;
const Field_1 = require("../Field");
const common_1 = require("../../../../common");
class DateTimeField extends Field_1.Field {
    getFormat() {
        return this.getAttr('format');
    }
    rawToValue(rawValue) {
        const value = common_1.Helper.decodeValue(rawValue);
        if (value && this.getAttr('timezone') === 'false') {
            common_1.Helper.addTimezoneOffset(value);
        }
        // console.log('DateTimeField.rawToValue:', value);
        return value;
    }
    valueToRaw(value) {
        let rawValue;
        if (value && this.getAttr('timezone') === 'false') {
            const v = common_1.Helper.cloneDate(value);
            common_1.Helper.removeTimezoneOffset(v);
            // console.log('date without timezone:', v);
            rawValue = common_1.Helper.encodeValue(v);
        }
        else {
            rawValue = common_1.Helper.encodeValue(value);
        }
        // console.log('DateTimeField.valueToRaw', rawValue);
        return rawValue;
    }
}
exports.DateTimeField = DateTimeField;
if (typeof window === 'object') {
    // @ts-ignore
    window.DateTimeField = DateTimeField;
}
