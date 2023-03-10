"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComboBoxField = void 0;
const Field_1 = require("../Field");
const common_1 = require("../../../../common");
class ComboBoxField extends Field_1.Field {
    getDisplayValue(row) {
        let value = null;
        if (row[this.data.displayColumn]) {
            try {
                value = common_1.Helper.decodeValue(row[this.data.displayColumn]);
            }
            catch (err) {
                console.log('cannot parse:', row[this.data.displayColumn]);
                throw err;
            }
        }
        else {
            value = this.data.displayColumn;
            value = value.replace(/\{([\w\.]+)\}/g, (text, name) => {
                return row.hasOwnProperty(name) ? row[name] || '' : text;
            });
        }
        return value;
    }
    getValueValue(row) {
        if (!row[this.data.valueColumn]) {
            throw new Error('no valueColumn in ComboBox data source');
        }
        return common_1.Helper.decodeValue(row[this.data.valueColumn]);
    }
    getComboBoxDataSource() {
        const name = this.data.dataSourceName;
        if (!name)
            throw new Error(`${this.getFullName()}: no dataSourceName`);
        if (this.getForm().getDataSource(name)) {
            return this.getForm().getDataSource(name);
        }
        if (this.getPage().getDataSource(name)) {
            return this.getPage().getDataSource(name);
        }
        if (this.getApp().getDataSource(name)) {
            return this.getApp().getDataSource(name);
        }
        throw new Error(`${this.getFullName()}: no data source: ${name}`);
    }
    findRowByRawValue(rawValue) {
        return this.getComboBoxDataSource()
            .getRows()
            .find((row) => row[this.data.valueColumn] === rawValue);
    }
}
exports.ComboBoxField = ComboBoxField;
common_1.Helper.registerGlobalClass(ComboBoxField);
