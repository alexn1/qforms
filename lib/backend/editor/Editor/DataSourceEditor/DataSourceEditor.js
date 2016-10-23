'use strict';

module.exports = DataSourceEditor;

var util = require('util');
var path = require('path');

var qforms = require('../../../../qforms');
var Editor = require('../Editor');

util.inherits(DataSourceEditor, Editor);

////////////////////////////////////////////////////////////////////////////////////////////////////
function DataSourceEditor(parent, name, data) {
    var self = this;
    DataSourceEditor.super_.call(self);
    self.parent = parent;
    self.name   = name;
    self.data   = data;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceEditor.prototype.newKeyColumn = function(params) {
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
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceEditor.prototype.getCollectionDirPath2 = function() {
    var self = this;
    return self.parent.getCustomDirPath().then(function (customDirPath) {
        var dirPath = path.join(customDirPath, 'dataSources');
        return qforms.helper.createDirIfNotExists(dirPath).then(function() {
            return dirPath;
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceEditor.prototype.getCustomDirPath = function() {
    var self = this;
    return self.getCollectionDirPath2().then(function (collectionDirPath) {
        var dirPath = path.join(collectionDirPath, self.name);
        return qforms.helper.createDirIfNotExists(dirPath).then(function () {
            return dirPath;
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceEditor.prototype.getCustomFilePath = function(ext) {
    var self = this;
    return self.getCustomDirPath().then(function(customDirPath) {
        return path.join(customDirPath, self.name + '.' + ext);
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceEditor.prototype.createBackendJs2 = function(params) {
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
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceEditor.create = function(params) {
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
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceEditor.prototype.getData = function() {
    var self = this;
    return self.data;
};