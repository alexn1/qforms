'use strict';

module.exports = Field;

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var qforms = require('../../../../qforms');
var Model  = require('../Model');

util.inherits(Field, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function Field(data, parent) {
    var self = this;
    Field.super_.call(self, data, parent);
    self.form               = parent;
    self.dirPath            = path.join(parent.dirPath, 'fields', self.name);
    self.customViewFilePath = path.join(self.dirPath, self.name + '.ejs');
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.create = function(data, parent) {
    return Promise.resolve(new Field(data, parent));
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.fillDefaultValue = function(context, row) {
    var self = this;
    var column = self.data['@attributes'].column;
    var defaultValue = self.form.replaceThis(context, self.data['@attributes'].defaultValue);
    var params = self.form.page.application.getParams(context);
    var code = qforms.helper.templateValue(defaultValue, params);
    try {
        var value = eval(code);
    } catch (e) {
        throw new Error('[' + self.getFullName() + '] default value error: ' + e.toString());
    }
    if (value === undefined) {
        value = null;
    }
    row[column] = value;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.dumpRowValueToParams = function(row, params) {
    var self = this;
    var name  = self.getFullName();
    var value = row[self.data['@attributes'].column];
    params[name] = value;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.getFullName = function() {
    var self = this;
    return [
        self.form.page.name,
        self.form.name,
        self.name
    ].join('.');
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.calcValue = function(row) {
    var self = this;
    return Promise.try(function () {
        return eval(self.data['@attributes'].value);
    }).then(function (value) {
        row[self.data['@attributes'].column] = value;
    });
};