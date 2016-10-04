'use strict';

QForms.inherits(Field, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function Field(name, parent, data) {
    var self = this;
    Field.super_.call(self);
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
    var self = this;
    if (self.data.column !== undefined) {
        var column = self.data.column;
        var defaultValue = self.replaceThis(self.data.defaultValue);
        var params = {};
        $.extend(params, self.form.page.params);
        $.extend(params, self.form.page.app.data.params);
        var code = QForms.templateValue(defaultValue, params);
        try {
            //console.log('eval: ' + code);
            var value = eval(code);
        } catch (e) {
            throw new Error('[' + self.getFullName() + '] default value error: ' + e.toString());
        }
        if (value === undefined) {
            value = null;
        }
        row[column] = value;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.valueToParams = function(row) {
    var self = this;
    if (self.data.column !== undefined) {
        var fullName = self.getFullName();
        self.form.page.params[fullName] = row[self.data.column];
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.save = function (row, value) {
    var self = this;
    self.form.dataSource.setValue(row, self.data.column, value);
    self.valueToParams(row);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.getValue = function (row) {
    var self = this;
    return row[self.data.column];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.getFullName = function () {
    var self = this;
    return [
        self.form.page.name,
        self.form.name,
        self.name
    ].join('.');
};