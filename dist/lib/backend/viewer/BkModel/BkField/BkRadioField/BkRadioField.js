"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkRadioField = void 0;
const BkField_1 = require("../BkField");
class BkRadioField extends BkField_1.BkField {
    fillAttributes(response) {
        super.fillAttributes(response);
        response.readOnly = this.getAttr('readOnly');
        response.notNull = this.getAttr('notNull');
        response.dataSourceName = this.getAttr('dataSourceName');
        response.valueColumn = this.getAttr('valueColumn');
        response.displayColumn = this.getAttr('displayColumn');
    }
}
exports.BkRadioField = BkRadioField;
