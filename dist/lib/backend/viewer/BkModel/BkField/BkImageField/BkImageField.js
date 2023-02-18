"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkImageField = void 0;
const BkField_1 = require("../BkField");
class BkImageField extends BkField_1.BkField {
    fillAttributes(response) {
        super.fillAttributes(response);
        response.readOnly = this.getAttr('readOnly');
        response.notNull = this.getAttr('notNull');
    }
}
exports.BkImageField = BkImageField;
