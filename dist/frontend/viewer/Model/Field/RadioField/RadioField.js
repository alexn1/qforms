"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadioField = void 0;
const Field_1 = require("../Field");
const common_1 = require("../../../../common");
class RadioField extends Field_1.Field {
    getDisplayValue(row) {
        const displayColumn = this.getAttr('displayColumn');
        let value = null;
        if (row[displayColumn]) {
            try {
                value = common_1.Helper.decodeValue(row[displayColumn]);
            }
            catch (err) {
                console.debug('cannot parse:', row[displayColumn]);
                throw err;
            }
        }
        else {
            value = displayColumn;
            value = value.replace(/\{([\w\.]+)\}/g, (text, name) => {
                return row.hasOwnProperty(name) ? row[name] || '' : text;
            });
        }
        return value;
    }
    getValueValue(row) {
        const valueColumn = this.getAttr('valueColumn');
        if (!row[valueColumn]) {
            throw new Error('no valueColumn in ComboBox data source');
        }
        return common_1.Helper.decodeValue(row[valueColumn]);
    }
    getDataSource() {
        const name = this.getAttr('dataSourceName');
        if (!name)
            throw new Error(`${this.getFullName()}: no dataSourceName`);
        if (this.getForm().findDataSource(name)) {
            return this.getForm().getDataSource(name);
        }
        if (this.getPage().findDataSource(name)) {
            return this.getPage().getDataSource(name);
        }
        if (this.getApp().findDataSource(name)) {
            return this.getApp().getDataSource(name);
        }
        throw new Error(`${this.getFullName()}: no data source: ${name}`);
    }
    findRowByRawValue(rawValue) {
        const valueColumn = this.getAttr('valueColumn');
        return this.getDataSource()
            .getRows()
            .find((row) => row[valueColumn] === rawValue);
    }
}
exports.RadioField = RadioField;
common_1.Helper.registerGlobalClass(RadioField);
