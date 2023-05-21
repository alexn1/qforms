"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowForm = void 0;
const Form_1 = require("../Form");
const Helper_1 = require("../../../../common/Helper");
class RowForm extends Form_1.Form {
    init() {
        super.init();
        if (this.isNewMode()) {
            this.getDefaultDataSource().newRow(this.createRow());
        }
        this.fillParams(this.getRow()); // dump row values to page params
    }
    isNewMode() {
        const newMode = this.getAttr('newMode');
        if (newMode === 'true')
            return true;
        if (newMode === 'false')
            return false;
        return this.getPage().isNewMode();
    }
    fillParams(row) {
        for (const field of this.fields) {
            field.valueToPageParams(row);
        }
    }
    onDataSourceUpdate(e) {
        this.fillParams(this.getRow());
        super.onDataSourceUpdate(e);
    }
    onDataSourceInsert(e) {
        this.fillParams(this.getRow());
        super.onDataSourceInsert(e);
    }
    getRow(withChanges = false) {
        return this.getDefaultDataSource().getSingleRow(withChanges);
    }
    getKey() {
        // console.log('RowForm.getKey', this.getFullName());
        const dataSource = this.getDefaultDataSource();
        if (dataSource.isPersistent()) {
            const row = this.getRow();
            return dataSource.getRowKey(row);
        }
        return null;
    }
    createRow() {
        const row = {};
        this.fillDefaultValues(row);
        return row;
    }
    discard(fields = []) {
        console.log('RowForm.discard', fields);
        if (this.getDefaultDataSource().isChanged()) {
            this.getDefaultDataSource().discard();
            fields.forEach((name) => {
                this.getField(name).valueToPageParams(this.getRow());
            });
        }
    }
}
exports.RowForm = RowForm;
Helper_1.Helper.registerGlobalClass(RowForm);
