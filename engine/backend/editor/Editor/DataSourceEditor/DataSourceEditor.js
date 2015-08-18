'use strict';

module.exports = DataSourceEditor;

var util = require('util');
var path = require('path');

var QForms = require('../../../qforms');

var Editor = require('../Editor');

util.inherits(DataSourceEditor, Editor);

////////////////////////////////////////////////////////////////////////////////////////////////////
function DataSourceEditor(parent, name, data) {
    DataSourceEditor.super_.call(this);
    this.parent = parent;
    this.name   = name;
    this.data   = data;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceEditor.prototype.newKeyColumn = function(params) {
    var name = params.name;
    if (!this.data.keyColumns) {
        this.data.keyColumns = {};
    }
    if (this.data.keyColumns[name]) {
        throw new Error('Key Column {name} already exist.'.replace('{name}', name));
    }
    return this.data.keyColumns[name] = {
        '@class'     : 'KeyColumn',
        '@attributes': {
            'name': name
        }
    };
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceEditor.prototype.getCollectionDirPath = function(callback) {
    this.parent.getCustomDirPath(function(customDirPath) {
        var dirPath = path.join(customDirPath, 'dataSources');
        QForms.helper.createDirIfNotExists(dirPath, function() {
            callback(dirPath);
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceEditor.prototype.getCustomDirPath = function(callback) {
    var self = this;
    this.getCollectionDirPath(function(collectionDirPath) {
        var dirPath = path.join(collectionDirPath, self.name);
        QForms.helper.createDirIfNotExists(dirPath, function() {
            callback(dirPath);
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceEditor.prototype.getCustomFilePath = function(ext, callback) {
    var self = this;
    this.getCustomDirPath(function(customDirPath) {
        callback(path.join(customDirPath, self.name + '.' + ext));
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceEditor.prototype.createBackendJs = function(params, callback) {
    var self = this;
    var templateFilePath = path.join(__dirname, 'DataSource.backend.js.ejs');
    this.getCustomFilePath('backend.js', function(customJsFilePath) {
        self.createFile2(customJsFilePath, templateFilePath, {
            page      : params.page ? params.page : '',
            form      : params.form ? params.form : '',
            dataSource: self.name,
            _class    : self.constructor.name.replace('Editor', '')
        }, function(backendJs) {
            callback(backendJs);
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceEditor.create = function(params) {
    var data = {
        '@class':'DataSource',
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
    return this.data;
};