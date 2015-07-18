'use strict';

module.exports = FormController;

var util  = require('util');
var path  = require('path');
var fs    = require('fs');
var async = require('async');

var helper           = require('../../../common/helper');
var ModelController  = require('../ModelController');

util.inherits(FormController, ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function FormController(data, parent) {
    FormController.super_.call(this, data, parent);
    this.page               = parent;
    this.dirPath            = path.join(this.parent.dirPath, 'forms', this.name);
    this.customViewFilePath = path.join(this.dirPath,        this.name + '.ejs');
    this.createCollections  = ['dataSources', 'fields', 'controls'];
    this.fillCollections    = ['dataSources', 'fields', 'controls'];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.create = function(data, parent, callback) {
    callback(new FormController(data, parent));
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.fill = function(context, callback) {
    var self = this;
    if (this.data.dataSources.default) {
        FormController.super_.prototype.fill.call(this, context, callback);
    } else {
        var dataSourceResponse = self._getSurrogateDataSourceResponse();
        self.dumpRowToParams(dataSourceResponse.rows[0], context.querytime.params);
        FormController.super_.prototype.fill.call(this, context, function(response) {
            response.dataSources.default = dataSourceResponse;
            callback(response);
        });
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype._getSurrogateDataSourceResponse = function() {
    var row = {
        id: 1
    };
    for (var name in this.fields) {
        this.fields[name].fillDefaultValue(row);
    }
    return {
        class               : 'DataSource',
        database            : '',
        table               : '',
        keyColumns          : ['id'],
        dumpFirstRowToParams: 'false',
        rows                : [row]
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.dumpRowToParams = function(row, params) {
    for (var name in this.fields) {
        this.fields[name].dumpRowValueToParams(row, params);
    }
    //console.log(params);
};