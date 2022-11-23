"use strict";
const Field = require("../Field");
class ImageField extends Field {
    fillAttributes(response) {
        super.fillAttributes(response);
        response.readOnly = this.getAttr('readOnly');
        response.notNull = this.getAttr('notNull');
    }
}
module.exports = ImageField;
