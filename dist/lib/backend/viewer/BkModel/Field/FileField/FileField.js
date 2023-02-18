"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkFileField = void 0;
const Field_1 = require("../Field");
class BkFileField extends Field_1.BkField {
    fillAttributes(response) {
        super.fillAttributes(response);
        response.readOnly = this.getAttr('readOnly');
        response.notNull = this.getAttr('notNull');
    }
}
exports.BkFileField = BkFileField;
