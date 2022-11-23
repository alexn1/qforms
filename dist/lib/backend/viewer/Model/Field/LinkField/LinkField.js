"use strict";
const Field = require("../Field");
class LinkField extends Field {
    fillAttributes(response) {
        super.fillAttributes(response);
        response.notNull = this.getAttr('notNull');
    }
}
module.exports = LinkField;
