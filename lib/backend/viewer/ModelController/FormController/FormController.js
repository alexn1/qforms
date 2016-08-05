'use strict';

module.exports = FormController;

var util    = require('util');
var path    = require('path');
var fs      = require('fs');
var async   = require('async');
var Promise = require('bluebird');

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
    this.dataSources        = {};
    this.fields             = {};
    this.controls           = {};
}

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.create = function(data, parent, callback) {
    callback(new FormController(data, parent));
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.create2 = function(data, parent) {
    return Promise.resolve(new FormController(data, parent));
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.fill = function(context, callback) {
    var self = this;
    if (this.data.dataSources.default) {
        FormController.super_.prototype.fill.call(this, context, callback);
    } else {
        var dataSourceResponse = self._getSurrogateDataSourceResponse(context);
        self.dumpRowToParams(dataSourceResponse.rows[0], context.querytime.params);
        FormController.super_.prototype.fill.call(this, context, function(response) {
            response.dataSources.default = dataSourceResponse;
            callback(response);
        });
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype._getSurrogateDataSourceResponse = function(context) {
    var row = {
        id: 1
    };
    for (var name in this.fields) {
        this.fields[name].fillDefaultValue(context, row);
    }
    return {
        class               : 'DataSource',
        database            : '',
        table               : '',
        access              : {
            select: true,
            insert: true,
            update: true,
            delete: true
        },
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


////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.replaceThis = function(context, query) {
    var self = this;
    return query.replace(/\{([@\w\.]+)\}/g, function (text, name) {
        if (name.indexOf('.') !== -1) {
            var arr = name.split('.');
            if (arr[0] === 'this') {
                arr[0] = self.page.name;
            }
            if (arr[0] === 'parent' && context.parentPageName) {
                arr[0] = context.parentPageName;
            }
            return '{' + arr.join('.') + '}';
        } else {
            return text;
        }
    });
};
