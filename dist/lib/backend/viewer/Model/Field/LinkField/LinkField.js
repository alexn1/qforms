"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkLinkField = void 0;
const Field_1 = require("../Field");
class BkLinkField extends Field_1.BkField {
    fillAttributes(response) {
        super.fillAttributes(response);
        response.notNull = this.getAttr('notNull');
    }
}
exports.BkLinkField = BkLinkField;
