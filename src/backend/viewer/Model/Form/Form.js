'use strict';

var util    = require('util');
var path    = require('path');
var fs      = require('fs');
var Promise = require('bluebird');

var Model = require('../Model');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Form extends Model {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor(data, parent) {
        super(data, parent);
        var self = this;
        self.page               = parent;
        self.dirPath            = path.join(self.parent.dirPath, 'forms', self.name);
        self.customViewFilePath = path.join(self.dirPath, self.name + '.ejs');
        self.createCollections  = ['dataSources', 'fields', 'controls'];
        self.fillCollections    = ['dataSources', 'fields', 'controls'];
        self.dataSources        = {};
        self.fields             = {};
        self.controls           = {};
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static async create(data, parent) {
        return new Form(data, parent);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    fill(context) {
        var self = this;
        if (self.data.dataSources.default) {
            return super.fill(context);
        } else {
            var dataSourceResponse = self._getSurrogateDataSourceResponse(context);
            self.dumpRowToParams(dataSourceResponse.rows[0], context.querytime.params);
            return super.fill(context).then(response => {
                response.dataSources.default = dataSourceResponse;
                return response;
            });
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    _getSurrogateDataSourceResponse(context) {
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
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    dumpRowToParams(row, params) {
        var self = this;
        for (var name in self.fields) {
            self.fields[name].dumpRowValueToParams(row, params);
        }
        //console.log(params);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    replaceThis(context, query) {
        var self = this;
        return query.replace(/\{([@\w\.]+)\}/g, (text, name) => {
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
    }

}


module.exports = Form;