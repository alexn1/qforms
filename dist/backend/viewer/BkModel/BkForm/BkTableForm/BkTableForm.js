"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkTableForm = void 0;
const BkForm_1 = require("../BkForm");
class BkTableForm extends BkForm_1.BkForm {
    /*static async create(data, parent) {
        return new TableForm(data, parent);
    }*/
    // async fill(context) {
    //     console.debug('TableForm.fill', this.constructor.name, this.getFullName());
    //     return super.fill(context);
    // }
    fillAttributes(response) {
        super.fillAttributes(response);
        response.editMethod = this.getAttr('editMethod');
        response.itemEditPage = this.getAttr('itemEditPage');
        response.itemCreatePage = this.getAttr('itemCreatePage');
        response.newRowMode = this.getAttr('newRowMode');
        response.deleteRowMode = this.getAttr('deleteRowMode');
        response.refreshButton = this.getAttr('refreshButton');
    }
}
exports.BkTableForm = BkTableForm;
