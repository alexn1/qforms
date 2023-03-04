"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelField = void 0;
const Field_1 = require("../Field");
class LabelField extends Field_1.Field {
}
exports.LabelField = LabelField;
if (typeof window === 'object') {
    // @ts-ignore
    window.LabelField = LabelField;
}
