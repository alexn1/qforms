'use strict';

module.exports = FieldController;

var util = require('util');
var path = require('path');

var ModelController = require('../ModelController');

util.inherits(FieldController, ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function FieldController(data, parent) {
    FieldController.super_.call(this, data, parent);
    this.form               = parent;
    this.dirPath            = path.join(parent.dirPath, 'fields', this.name);
    this.customViewFilePath = path.join(this.dirPath,   this.name + '.ejs');
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.create = function(data, parent, callback) {
    callback(new FieldController(data, parent));
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.prototype.fillDefaultValue = function(row) {
    row[this.data['@attributes'].column] = this.parent.getExpValue(this.data['@attributes'].defaultValue);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.prototype.dumpRowValueToParams = function(row, params) {
    var name  = this.getFullName();
    var value = row[this.data['@attributes'].column];
    params[name] = value;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.prototype.getFullName = function() {
    return [
        this.form.page.name,
        this.form.name,
        this.name
    ].join('.');
};