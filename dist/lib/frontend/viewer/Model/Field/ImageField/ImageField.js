"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageField = void 0;
const Field_1 = require("../Field");
class ImageField extends Field_1.Field {
}
exports.ImageField = ImageField;
if (typeof window === 'object') {
    // @ts-ignore
    window.ImageField = ImageField;
}
