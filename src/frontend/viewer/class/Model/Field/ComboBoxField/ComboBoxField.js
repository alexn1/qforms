'use strict';

class ComboBoxField extends Field {

    getDisplayValue(row) {
        let value = null;
        if (row[this.data.displayColumn]) {
            try {
                value = JSON.parse(row[this.data.displayColumn], Helper.dateTimeReviver);
            } catch (err) {
                console.log('cannot parse:', row[this.data.displayColumn]);
                throw err;
            }
        } else {
            value = this.data.displayColumn;
            value = value.replace(/\{([\w\.]+)\}/g, (text, name) => {
                return row.hasOwnProperty(name) ? (row[name] || '') : text;
            });
        }
        return value;
    }

    getValueValue(row) {
        if (!row[this.data.valueColumn]) {
            throw new Error('no valueColumn in ComboBox data source');
        }
        return JSON.parse(row[this.data.valueColumn], Helper.dateTimeReviver);
    }

    getComboBoxDataSource() {
        const name = this.data.dataSourceName;
        if (!name) throw new Error(`${this.getFullName()}: no dataSourceName`);
        if (this.getForm().dataSources[name]) {
            return this.getForm().dataSources[name];
        } else if (this.getPage().dataSources[name]) {
            return this.getPage().dataSources[name];
        } else if (this.getApp().dataSources[name]) {
            return this.getApp().dataSources[name];
        }
        return null;
    }

    findRowByRawValue(rawValue) {
        return this.getComboBoxDataSource().getRows().find(row => row[this.data.valueColumn] === rawValue);
    }
}
