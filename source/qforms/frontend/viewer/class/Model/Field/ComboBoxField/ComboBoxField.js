'use strict';

QForms.inherit(ComboBoxField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ComboBoxField(name, form, data) {
    Field.call(this, name, form, data);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxField.prototype.getDisplayValue = function(row) {
    var value = null;
    if (row[this.data.displayColumn]) {
        value = row[this.data.displayColumn];
    } else {
        value = this.data.displayColumn;
        value = value.replace(/\{([\w\.]+)\}/g, function (text, name) {
            return row.hasOwnProperty(name) ? (row[name] || '') : text;
        });
    }
    return value;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxField.prototype.getDataSource = function(name) {
    if (this.form.dataSources[name]) {
        return this.form.dataSources[name];
    } else if (this.form.page.dataSources[name]) {
        return this.form.page.dataSources[name];
    } else if (this.form.page.app.dataSources[name]) {
        return this.form.page.app.dataSources[name];
    }
    return null;
};