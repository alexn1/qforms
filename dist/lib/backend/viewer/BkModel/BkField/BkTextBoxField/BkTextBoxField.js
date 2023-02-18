"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkTextBoxField = void 0;
const BkField_1 = require("../BkField");
class BkTextBoxField extends BkField_1.BkField {
    fillAttributes(response) {
        super.fillAttributes(response);
        response.readOnly = this.getAttr('readOnly');
        response.notNull = this.getAttr('notNull');
        response.placeholder = this.getAttr('placeholder');
        response.validateOnChange = this.getAttr('validateOnChange');
        response.validateOnBlur = this.getAttr('validateOnBlur');
        response.autocomplete = this.getAttr('autocomplete');
    }
}
exports.BkTextBoxField = BkTextBoxField;
