"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkTextAreaField = void 0;
const Field_1 = require("../Field");
class BkTextAreaField extends Field_1.BkField {
    fillAttributes(response) {
        super.fillAttributes(response);
        response.readOnly = this.getAttr('readOnly');
        response.notNull = this.getAttr('notNull');
        response.rows = this.getAttr('rows');
        response.cols = this.getAttr('cols');
        response.validateOnChange = this.getAttr('validateOnChange');
        response.validateOnBlur = this.getAttr('validateOnBlur');
    }
}
exports.BkTextAreaField = BkTextAreaField;
