'use strict';

module.exports = Form;

var util    = require('util');
var path    = require('path');
var fs      = require('fs');
var Promise = require('bluebird');

var Model = require('../Model');

util.inherits(Form, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function Form(data, parent) {
    var self = this;
    Form.super_.call(self, data, parent);
    self.page               = parent;
    self.dirPath            = path.join(self.parent.dirPath, 'forms', self.name);
    self.customViewFilePath = path.join(self.dirPath, self.name + '.ejs');
    self.createCollections  = ['dataSources', 'fields', 'controls'];
    self.fillCollections    = ['dataSources', 'fields', 'controls'];
    self.dataSources        = {};
    self.fields             = {};
    self.controls           = {};
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.create = function(data, parent) {
    return Promise.resolve(new Form(data, parent));
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.fill2 = function(context) {
    var self = this;
    if (self.data.dataSources.default) {
        return Form.super_.prototype.fill2.call(self, context);
    } else {
        var dataSourceResponse = self._getSurrogateDataSourceResponse(context);
        self.dumpRowToParams(dataSourceResponse.rows[0], context.querytime.params);
        return Form.super_.prototype.fill2.call(self, context).then(function (response) {
            response.dataSources.default = dataSourceResponse;
            return response;
        });
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype._getSurrogateDataSourceResponse = function(context) {
    var self = this;
    var row = {
        id: 1
    };
    for (var name in self.fields) {
        self.fields[name].fillDefaultValue(context, row);
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
Form.prototype.dumpRowToParams = function(row, params) {
    var self = this;
    for (var name in self.fields) {
        self.fields[name].dumpRowValueToParams(row, params);
    }
    //console.log(params);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.replaceThis = function(context, query) {
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
