"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextAreaField = void 0;
const Field_1 = require("../Field");
const common_1 = require("../../../../common");
class TextAreaField extends Field_1.Field {
    getRows() {
        return this.getData().rows;
    }
    getCols() {
        return this.getData().cols;
    }
}
exports.TextAreaField = TextAreaField;
common_1.Helper.registerGlobalClass(TextAreaField);
