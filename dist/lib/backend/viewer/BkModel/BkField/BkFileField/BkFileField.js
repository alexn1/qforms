"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkFileField = void 0;
const BkField_1 = require("../BkField");
class BkFileField extends BkField_1.BkField {
    fillAttributes(response) {
        super.fillAttributes(response);
        response.readOnly = this.getAttr('readOnly');
        response.notNull = this.getAttr('notNull');
    }
}
exports.BkFileField = BkFileField;
