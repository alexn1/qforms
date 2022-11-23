"use strict";
const Field_1 = require("../Field");
class LinkField extends Field_1.Field {
    fillAttributes(response) {
        super.fillAttributes(response);
        response.notNull = this.getAttr('notNull');
    }
}
module.exports = LinkField;
