'use strict';

class ComboBoxField extends Field {

    getDisplayValue(row) {
        let value = null;
        if (row[this.data.displayColumn]) {
            value = row[this.data.displayColumn];
        } else {
            value = this.data.displayColumn;
            value = value.replace(/\{([\w\.]+)\}/g, (text, name) => {
                return row.hasOwnProperty(name) ? (row[name] || '') : text;
            });
        }
        return value;
    }

    getValueValue(row) {
        if (row[this.data.valueColumn] !== undefined) {
            return row[this.data.valueColumn];
        }
        throw new Error('no valueColumn in ComboBox data source');
    }

    getComboBoxDataSource() {
        const name = this.data.dataSourceName;
        if (this.getForm().dataSources[name]) {
            return this.getForm().dataSources[name];
        } else if (this.getPage().dataSources[name]) {
            return this.getPage().dataSources[name];
        } else if (this.getApp().dataSources[name]) {
            return this.getApp().dataSources[name];
        }
        return null;
    }
}
