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
        this.page               = parent;
        this.dirPath            = path.join(this.parent.dirPath, 'forms', this.name);
        this.customViewFilePath = path.join(this.dirPath, this.name + '.ejs');
        this.createCollections  = ['dataSources', 'fields', 'controls'];
        this.fillCollections    = ['dataSources', 'fields', 'controls'];
        this.dataSources        = {};
        this.fields             = {};
        this.controls           = {};
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static async create(data, parent) {
        return new Form(data, parent);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    fill(context) {
        if (this.data.dataSources.default) {
            return super.fill(context);
        } else {
            var dataSourceResponse = this._getSurrogateDataSourceResponse(context);
            this.dumpRowToParams(dataSourceResponse.rows[0], context.querytime.params);
            return super.fill(context).then(response => {
                response.dataSources.default = dataSourceResponse;
                return response;
            });
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    _getSurrogateDataSourceResponse(context) {
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
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    dumpRowToParams(row, params) {
        for (var name in this.fields) {
            this.fields[name].dumpRowValueToParams(row, params);
        }
        //console.log(params);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    replaceThis(context, query) {
        return query.replace(/\{([@\w\.]+)\}/g, (text, name) => {
            if (name.indexOf('.') !== -1) {
                var arr = name.split('.');
                if (arr[0] === 'this') {
                    arr[0] = this.page.name;
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