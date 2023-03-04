"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextAreaField = void 0;
const Field_1 = require("../Field");
class TextAreaField extends Field_1.Field {
    getRows() {
        return this.data.rows;
    }
    getCols() {
        return this.data.cols;
    }
}
exports.TextAreaField = TextAreaField;
if (typeof window === 'object') {
    // @ts-ignore
    window.TextAreaField = TextAreaField;
}
