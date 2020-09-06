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
        if (this.form.dataSources[name]) {
            return this.form.dataSources[name];
        } else if (this.form.page.dataSources[name]) {
            return this.form.page.dataSources[name];
        } else if (this.form.page.app.dataSources[name]) {
            return this.form.page.app.dataSources[name];
        }
        return null;
    }
}
