"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextBoxField = void 0;
const Field_1 = require("../Field");
class TextBoxField extends Field_1.Field {
}
exports.TextBoxField = TextBoxField;
if (typeof window === 'object') {
    // @ts-ignore
    window.TextBoxField = TextBoxField;
}
