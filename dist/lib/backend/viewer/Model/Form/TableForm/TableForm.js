"use strict";
const Form_1 = require("../Form");
class TableForm extends Form_1.Form {
    /*static async create(data, parent) {
        return new TableForm(data, parent);
    }*/
    // async fill(context) {
    //     console.log('TableForm.fill', this.constructor.name, this.getFullName());
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
module.exports = TableForm;
