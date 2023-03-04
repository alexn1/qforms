"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneField = void 0;
const Field_1 = require("../Field");
class PhoneField extends Field_1.Field {
}
exports.PhoneField = PhoneField;
if (typeof window === 'object') {
    // @ts-ignore
    window.PhoneField = PhoneField;
}
