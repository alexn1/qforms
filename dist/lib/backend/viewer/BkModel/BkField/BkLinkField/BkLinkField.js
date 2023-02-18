"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkLinkField = void 0;
const BkField_1 = require("../BkField");
class BkLinkField extends BkField_1.BkField {
    fillAttributes(response) {
        super.fillAttributes(response);
        response.notNull = this.getAttr('notNull');
        response.page = this.getAttr('page');
    }
}
exports.BkLinkField = BkLinkField;
