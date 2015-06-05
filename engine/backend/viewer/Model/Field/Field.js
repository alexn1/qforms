'use strict';

module.exports = Field;

var util = require('util');
var path = require('path');

var Model = require('../Model');

util.inherits(Field, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function Field(data, parent) {
    Field.super_.call(this, data, parent);
    this.form               = parent;
    this.dirPath            = path.join(parent.dirPath, this.name);
    this.customViewFilePath = path.join(this.dirPath,   this.name + '.ejs');
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.fillDefaultValue = function(row) {
    row[this.data['@attributes'].column] = this.parent.getExpValue(this.data['@attributes'].defaultValue);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.dumpRowValueToParams = function(row, params) {
    var name  = this.getFullName();
    var value = row[this.data['@attributes'].column];
    params[name] = value;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.getFullName = function() {
    return this.form.page.name + '.' + this.form.name + '.' + this.name;
};