"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkCheckBoxField = void 0;
const Field_1 = require("../Field");
class BkCheckBoxField extends Field_1.Field {
    fillAttributes(response) {
        super.fillAttributes(response);
        response.readOnly = this.getAttr('readOnly');
        response.notNull = this.getAttr('notNull');
    }
}
exports.BkCheckBoxField = BkCheckBoxField;
