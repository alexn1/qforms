"use strict"

QForms.inherit(ComboBoxField,Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ComboBoxField(name,form,data) {
    Field.call(this,name,form,data);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxField.prototype.templateValue = function(row) {
    var value = null;
    if (row[this.data.displayColumn]) {
        value = row[this.data.displayColumn];
    } else {
        value = this.data.displayColumn;
        this.getUsedColumns(this.data.displayColumn).forEach(function(column) {
            value = value.replace(new RegExp("\{"+column+"\}","g"),row[column]);
        });
    }
    return value;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxField.prototype.getUsedColumns = function(title) {
    var exp = new RegExp("\{[a-z]+\}","g");
    var match,columns = {};
    while (match = exp.exec(title)) {
        var column = match[0].substring(1,match[0].length-1);
        columns[column] = true;
    }
    return Object.keys(columns);
}