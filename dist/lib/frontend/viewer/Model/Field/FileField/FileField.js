"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileField = void 0;
const Field_1 = require("../Field");
class FileField extends Field_1.Field {
}
exports.FileField = FileField;
if (typeof window === 'object') {
    // @ts-ignore
    window.FileField = FileField;
}
