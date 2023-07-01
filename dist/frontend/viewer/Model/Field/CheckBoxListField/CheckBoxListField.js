"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckBoxListField = void 0;
const Field_1 = require("../Field");
const common_1 = require("../../../../common");
class CheckBoxListField extends Field_1.Field {
    getDisplayValue(row) {
        let value = null;
        if (row[this.getData().displayColumn]) {
            try {
                value = common_1.Helper.decodeValue(row[this.getData().displayColumn]);
            }
            catch (err) {
                console.log('cannot parse:', row[this.getData().displayColumn]);
                throw err;
            }
        }
        else {
            value = this.getData().displayColumn;
            value = value.replace(/\{([\w\.]+)\}/g, (text, name) => {
                return row.hasOwnProperty(name) ? row[name] || '' : text;
            });
        }
        return value;
    }
    getValueValue(row) {
        if (!row[this.getData().valueColumn]) {
            throw new Error('no valueColumn in CheckBoxList data source');
        }
        return common_1.Helper.decodeValue(row[this.getData().valueColumn]);
    }
    getDataSource() {
        const name = this.getData().dataSourceName;
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
        return this.getDataSource()
            .getRows()
            .find((row) => row[this.getData().valueColumn] === rawValue);
    }
}
exports.CheckBoxListField = CheckBoxListField;
common_1.Helper.registerGlobalClass(CheckBoxListField);
