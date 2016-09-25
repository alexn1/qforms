'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////
function Field(name, parent, data) {
    var self = this;
    self.name   = name;
    self.form   = parent;
    self.data   = data;
    self.parent = parent;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.init = function() {

};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.deinit = function() {
    //console.log('Field.prototype.deinit: ' + this.name);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.replaceThis = function(value) {
    var self = this;
    return value.replace(/\{([@\w\.]+)\}/g, function (text, name) {
        if (name.indexOf('.') !== -1) {
            var arr = name.split('.');
            if (arr[0] === 'this') {
                arr[0] = self.form.page.name;
            }
            if (arr[0] === 'parent' && self.form.page.parentPageName) {
                arr[0] = self.form.page.parentPageName;
            }
            return '{' + arr.join('.') + '}';
        } else {
            return text;
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.fillDefaultValue = function(row) {
    if (this.data.column !== undefined) {
        var column = this.data.column;
        var defaultValue = this.replaceThis(this.data.defaultValue);
        var params = {};
        $.extend(params, this.form.page.params);
        $.extend(params, this.form.page.app.data.params);
        var code = QForms.templateValue(defaultValue, params);
        try {
            //console.log('eval: ' + code);
            var value = eval(code);
        } catch (e) {
            throw new Error('[' + this.getFullName() + '] default value error: ' + e.toString());
        }
        if (value === undefined) {
            value = null;
        }
        row[column] = value;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.valueToParams = function(row) {
    if (this.data.column !== undefined) {
        var fullName = this.getFullName();
        this.form.page.params[fullName] = row[this.data.column];
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.save = function (row, value) {
    this.form.dataSource.setValue(row, this.data.column, value);
    this.valueToParams(row);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.getValue = function (row) {
    return row[this.data.column];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.getFullName = function () {
    return [
        this.form.page.name,
        this.form.name,
        this.name
    ].join('.');
};