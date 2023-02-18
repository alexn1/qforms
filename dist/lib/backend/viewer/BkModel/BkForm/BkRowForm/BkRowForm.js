"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkRowForm = void 0;
const BkForm_1 = require("../BkForm");
class BkRowForm extends BkForm_1.BkForm {
    // constructor(data, parent) {
    //     super(data, parent);
    //     // console.log('RowForm.constructor', this.getFullName());
    // }
    // async fill(context) {
    //     console.log('RowForm.fill', this.constructor.name, this.getFullName());
    //     return super.fill(context);
    // }
    isNewMode(context) {
        if (this.isAttr('newMode')) {
            const newMode = this.getAttr('newMode');
            if (newMode === 'true')
                return true;
            if (newMode === 'false')
                return false;
        }
        return super.isNewMode(context);
    }
    fillAttributes(response) {
        super.fillAttributes(response);
        response.newMode = this.getAttr('newMode');
        response.refreshButton = this.getAttr('refreshButton');
    }
}
exports.BkRowForm = BkRowForm;
