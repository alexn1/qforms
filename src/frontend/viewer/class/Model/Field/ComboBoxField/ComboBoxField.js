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

    getComboBoxDataSource() {
        const name = this.data.dataSourceName;
        if (this.getForm().dataSources[name]) {
            return this.getForm().dataSources[name];
        } else if (this.getForm().getPage().dataSources[name]) {
            return this.getForm().getPage().dataSources[name];
        } else if (this.getForm().getPage().getApp().dataSources[name]) {
            return this.getForm().getPage().getApp().dataSources[name];
        }
        return null;
    }
}
