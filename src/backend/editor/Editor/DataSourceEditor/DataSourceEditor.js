'use strict';

var util = require('util');
var path = require('path');

var qforms = require('../../../../qforms');
var Editor = require('../Editor');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class DataSourceEditor extends Editor {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor(parent, name, data) {
        super();
        var self = this;
        self.parent = parent;
        self.name   = name;
        self.data   = data;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    newKeyColumn(params) {
        var self = this;
        var name = params.name;
        if (!self.data.keyColumns) {
            self.data.keyColumns = {};
        }
        if (self.data.keyColumns[name]) {
            throw new Error('Key Column {name} already exist.'.replace('{name}', name));
        }
        return self.data.keyColumns[name] = {
            '@class'     : 'KeyColumn',
            '@attributes': {
                'name': name
            }
        };
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getCollectionDirPath() {
        var self = this;
        return self.parent.getCustomDirPath().then(function (customDirPath) {
            var dirPath = path.join(customDirPath, 'dataSources');
            return qforms.Helper.createDirIfNotExists(dirPath).then(function() {
                return dirPath;
            });
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getCustomDirPath() {
        var self = this;
        return self.getCollectionDirPath().then(function (collectionDirPath) {
            var dirPath = path.join(collectionDirPath, self.name);
            return qforms.Helper.createDirIfNotExists(dirPath).then(function () {
                return dirPath;
            });
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getCustomFilePath(ext) {
        var self = this;
        return self.getCustomDirPath().then(function(customDirPath) {
            return path.join(customDirPath, self.name + '.' + ext);
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    createBackendJs(params) {
        var self = this;
        var templateFilePath = path.join(__dirname, 'DataSource.backend.js.ejs');
        return self.getCustomFilePath('backend.js').then(function (customJsFilePath) {
            return self.createFileByParams(customJsFilePath, templateFilePath, {
                page      : params.page ? params.page : '',
                form      : params.form ? params.form : '',
                dataSource: self.name,
                _class    : self.constructor.name.replace('Editor', '')
            }).then(function (backendJs) {
                return backendJs;
            });
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static create(params) {
        var data = {
            '@class'     : 'DataSource',
            '@attributes': {
                name                : params.name,
                database            : params['database'] ? params['database'] : 'default',
                //table               : params['table']    ? params['table'] : '',
                //query               : params['query']    ? params['query'] : '',
                //limit               : '',
                //countQuery          : '',
                //insertNewKey        :'false',
                dumpFirstRowToParams: 'false'
            }
        };
        return data;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getData() {
        var self = this;
        return self.data;
    }

}

module.exports = DataSourceEditor;