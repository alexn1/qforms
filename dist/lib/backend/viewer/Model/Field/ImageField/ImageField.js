"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageField = void 0;
const Field_1 = require("../Field");
class ImageField extends Field_1.Field {
    fillAttributes(response) {
        super.fillAttributes(response);
        response.readOnly = this.getAttr('readOnly');
        response.notNull = this.getAttr('notNull');
    }
}
exports.ImageField = ImageField;
