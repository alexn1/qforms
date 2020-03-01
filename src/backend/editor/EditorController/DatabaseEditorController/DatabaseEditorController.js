'use strict';

module.exports = DatabaseEditorController;

var util    = require('util');
var path    = require('path');
var fs      = require('fs');
var _       = require('underscore');
var Promise = require('bluebird');

var qforms           = require('../../../../qforms');
var server           = require('../../../../server');
var EditorController = require('../EditorController');
var MySql = require('../../../common/MySql');

util.inherits(DatabaseEditorController, EditorController);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DatabaseEditorController(appInfo) {
    var self = this;
    DatabaseEditorController.super_.call(self, appInfo);
    self.viewDirPath = path.join(
        server.get('public'),
        'editor/class/Controller/ModelController/DocumentController/DatabaseController/view'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseEditorController.prototype._new = function(params) {
    var self = this;
    var appFile = new qforms.JsonFile(self.appInfo.filePath);
    return appFile.read().then(function () {
        var appEditor = new qforms.ApplicationEditor(appFile);
        appEditor.newDatabase(params);
        if (params.params) {
            for (var name in params.params) {
                var param = params.params[name];
                appEditor.newDatabaseParam(_.extend(
                    {database: params.name},
                    param
                ));
            }
        }
        return appEditor.save().then(function () {
            var databaseData = appEditor.getDatabaseData(params.name)
            return databaseData;
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseEditorController.prototype.save = function(params) {
    var self = this;
    var appFile = new qforms.JsonFile(self.appInfo.filePath);
    return appFile.read().then(function () {
        var appEditor = new qforms.ApplicationEditor(appFile);
        appEditor.setDatabaseAttr(params.database, params.attr, params.value);
        return appEditor.save().then(function () {
            return null;
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseEditorController.prototype.delete = function(params) {
    var self = this;
    var appFile = new qforms.JsonFile(self.appInfo.filePath);
    return appFile.read().then(function () {
        var appEditor = new qforms.ApplicationEditor(appFile);
        appEditor.deleteDatabase(params.database);
        return appEditor.save().then(function () {
            return null;
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseEditorController.prototype.getView = function(params) {
    var self = this;
    return DatabaseEditorController.super_.prototype.getView.call(self, params).then(function (result) {
        switch (params.view) {
            case 'DatabaseView/DatabaseView.html':
                var appFile = new qforms.JsonFile(self.appInfo.filePath);
                return appFile.read().then(function () {
                    var appEditor = new qforms.ApplicationEditor(appFile);
                    var databaseData = appEditor.getDatabaseData(params.database);
                    console.log('databaseData:', databaseData);
                    return DatabaseEditorController.getTableList(databaseData).then(function (tables) {
                        console.log('tables:', tables);
                        result.data.tables = tables;
                        var filePath = path.join(self.viewDirPath, 'TableView', 'TableView.ejs');
                        return qforms.Helper.readFile(filePath).then(function (content) {
                            result.data.tableView = content;
                            return result;
                        });
                    });
                });
                break;
            default:
                return result;
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseEditorController.prototype.getTableInfo = function(params) {
    var self = this;
    var appFile = new qforms.JsonFile(self.appInfo.filePath);
    return appFile.read().then(function () {
        var appEditor = new qforms.ApplicationEditor(appFile);
        var databaseData = appEditor.getDatabaseData(params.database);
        console.log('databaseData:', databaseData);
        return DatabaseEditorController.getTableInfo(params, databaseData).then(function (rows) {
            return {desc: rows};
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseEditorController.getTableList = function(databaseData) {
    console.log('DatabaseEditorController.getTableList');
    const config = {
        host    : databaseData.params.host['@attributes'].value,
        user    : databaseData.params.user['@attributes'].value,
        database: databaseData.params.database['@attributes'].value,
        password: databaseData.params.password['@attributes'].value
    };
    const mySql = new MySql(config);
    return mySql.getTableList();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseEditorController.getTableInfo = function(params, databaseData) {
    const config = {
        host    : databaseData.params.host['@attributes'].value,
        user    : databaseData.params.user['@attributes'].value,
        database: databaseData.params.database['@attributes'].value,
        password: databaseData.params.password['@attributes'].value
    };
    const mySql = new MySql(config);
    return mySql.getTableInfo(params.table);
};

