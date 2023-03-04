"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeField = void 0;
const Field_1 = require("../Field");
class TimeField extends Field_1.Field {
}
exports.TimeField = TimeField;
if (typeof window === 'object') {
    // @ts-ignore
    window.TimeField = TimeField;
}
