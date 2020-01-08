'use strict';

QForms.inherits(ComboBoxField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ComboBoxField(name, form, data) {
    var self = this;
    Field.call(self, name, form, data);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxField.prototype.getDisplayValue = function(row) {
    var self = this;
    var value = null;
    if (row[self.data.displayColumn]) {
        value = row[self.data.displayColumn];
    } else {
        value = self.data.displayColumn;
        value = value.replace(/\{([\w\.]+)\}/g, function (text, name) {
            return row.hasOwnProperty(name) ? (row[name] || '') : text;
        });
    }
    return value;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxField.prototype.getDataSource = function(name) {
    var self = this;
    if (self.form.dataSources[name]) {
        return self.form.dataSources[name];
    } else if (self.form.page.dataSources[name]) {
        return self.form.page.dataSources[name];
    } else if (self.form.page.app.dataSources[name]) {
        return self.form.page.app.dataSources[name];
    }
    return null;
};