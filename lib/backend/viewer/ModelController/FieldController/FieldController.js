'use strict';

module.exports = FieldController;

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var qforms          = require('../../../../qforms');
var ModelController = require('../ModelController');

util.inherits(FieldController, ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function FieldController(data, parent) {
    FieldController.super_.call(this, data, parent);
    this.form               = parent;
    this.dirPath            = path.join(parent.dirPath, 'fields', this.name);
    this.customViewFilePath = path.join(this.dirPath,   this.name + '.ejs');
}

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.create2 = function(data, parent) {
    return Promise.resolve(new FieldController(data, parent));
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.prototype.fillDefaultValue = function(context, row) {
    var column = this.data['@attributes'].column;
    var defaultValue = this.form.replaceThis(context, this.data['@attributes'].defaultValue);
    var params = this.form.page.application.getParams(context);
    var code = qforms.helper.templateValue(defaultValue, params);
    try {
        var value  = eval(code);
    } catch (e) {
        throw new Error('[' + this.getFullName() + '] default value error: ' + e.toString());
    }
    if (value === undefined) {
        value = null;
    }
    row[column] = value;
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