"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkTimeField = void 0;
const Field_1 = require("../Field");
class BkTimeField extends Field_1.BkField {
    fillAttributes(response) {
        super.fillAttributes(response);
        response.readOnly = this.getAttr('readOnly');
        response.notNull = this.getAttr('notNull');
        response.placeholder = this.getAttr('placeholder');
        response.validateOnChange = this.getAttr('validateOnChange');
        response.validateOnBlur = this.getAttr('validateOnBlur');
    }
}
exports.BkTimeField = BkTimeField;
