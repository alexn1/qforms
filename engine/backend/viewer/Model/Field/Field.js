'use strict';

module.exports = Field;

var util = require('util');
var path = require('path');

var Model = require('../Model');

util.inherits(Field, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function Field(data, parent) {
    Field.super_.prototype.constructor.call(this, data, parent);
    this.dirPath            = path.join(parent.dirPath, this.name);
    this.customViewFilePath = path.join(this.dirPath, this.name + '.ejs');
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.fillDefaultValue = function(row) {
    row[this.data['@attributes'].column] = this.parent.getExpValue(this.data['@attributes'].defaultValue);
};