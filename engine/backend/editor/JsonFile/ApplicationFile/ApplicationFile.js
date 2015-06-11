'use strict';

module.exports = ApplicationFile;

var util = require('util');
var path = require('path');
var fs   = require('fs');

var JsonFile            = require('../JsonFile');
var Helper              = require('../../../common/helper');
var SqlDataSourceEditor = require('../../Editor/DataSourceEditor/SqlDataSourceEditor/SqlDataSourceEditor');

util.inherits(ApplicationFile, JsonFile);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ApplicationFile(appInfo) {
    ApplicationFile.super_.call(this, appInfo.filePath);
    this.appInfo = appInfo;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationFile.createAppData = function(params) {
    return {
        '@class' : 'Application',
        '@attributes' : {
            formatVer : "0.1",
            name : params['name'],
            caption : params['name']
        },
        databases : {},
        pageLinks : {}
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationFile.prototype.setDatabaseAttr = function(database,name,value) {
    this.data.databases[database]['@attributes'][name] = value;
    if (name === 'name') {
        this.data.databases = Helper.replaceKey(this.data.databases,
            database,
            value
        );
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationFile.prototype.setDatabaseParamAttr = function(database, param, name, value) {
    this.data.databases[database].params[param]['@attributes'][name] = value;
    if (name === 'name') {
        this.data.databases[database].params = Helper.replaceKey(
            this.data.databases[database].params,
            param,
            value
        );
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationFile.prototype.setPageLinkAttr = function(pageLink,name,value) {
    this.data.pageLinks[pageLink]['@attributes'][name] = value;
    if (name === 'name') {
        this.data.pageLinks = Helper.replaceKey(this.data.pageLinks, pageLink, value);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationFile.prototype.newDatabase = function(params) {
    var name = params['name'];
    if (!this.data.databases) {
        this.data.databases = {};
    }
    if (this.data.databases[name]) {
        throw new Error('Database {name} already exist.'.replace('{name}',name));
    }
    var data = {
        '@class' : 'Database',
        '@attributes' : {
            'name' : name
        }
    };
    return this.data.databases[name] = data;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationFile.prototype.newDatabaseParam = function(params) {
    var database = params['database'];
    var name     = params['name'];
    var value    = params['value'];

    if (!this.data.databases[database].params) {
        this.data.databases[database].params = {};
    }
    if (this.data.databases[database].params[name]) {
        throw new Error('Param {name} already exist.'.replace('{name}', name));
    }
    return this.data.databases[database].params[name] = {
        "@class" : "Param",
        "@attributes" : {
            'name' : name,
            'value' : value
        }
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationFile.prototype.newPageLink = function(params) {
    var name    = params.name;
    var menu    = params.menu;
    var startup = params.startup;

    if (!this.data.pageLinks) {
        this.data.pageLinks = {};
    }
    if (this.data.pageLinks[name]) {
        throw new Error('Page Link {name} already exist.'.replace('{name}', name));
    }
    return this.data.pageLinks[name] = {
        '@class' : 'PageLink',
        '@attributes' : {
            'name' : name,
            'fileName' : "pages/{name}/{name}.json".replace(/\{name\}/g, name),
            'menu' : menu,
            'startup' : startup
        }
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationFile.prototype.deleteDatabase = function(name) {
    delete this.data.databases[name];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationFile.prototype.deleteDatabaseParam = function($database,$param) {
    delete this.data.databases[$database].params[$param];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationFile.prototype.deletePage = function(name, callback) {
    var self = this;
    var pageFilePath = path.join(
        this.appInfo.dirPath,
        this.data.pageLinks[name]['@attributes'].fileName
    );
    fs.unlink(pageFilePath, function(err) {
        if (err) {
            throw err;
        } else {
            delete self.data.pageLinks[name];
            callback();
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationFile.prototype.getDatabaseData = function(database) {
    return this.data.databases[database];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationFile.prototype.getPageLinkData = function(name) {
    return this.data.pageLinks[name];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationFile.prototype.newDataSource = function(params) {
    var name   = params['name'];
    var _class = params['class'];
    if (!this.data.dataSources) {
        this.data.dataSources = {};
    }
    if (this.data.dataSources[name]) {
        throw new Error('Data Source {name} already exist.'.replace('{name}', name));
    }
    var data;
    switch (_class) {
        case "SqlDataSource":
            data = SqlDataSourceEditor.create(params);
            break;
        default:
            throw new Error('Unknown data source class.');
    }
    return this.data.dataSources[name] = data;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationFile.prototype.deleteDataSource = function(dataSource) {
    delete this.data.dataSources[dataSource];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationFile.prototype.setDataSourceAttr = function(dataSource, name, value) {
    this.data.dataSources[dataSource]['@attributes'][name] = value;
    if (name === 'name') {
        this.data.dataSources = Helper.replaceKey(
            this.data.dataSources,
            dataSource,
            value);
    }
};