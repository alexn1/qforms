'use strict';

module.exports = DatabaseEditorController;

var util    = require('util');
var path    = require('path');
var fs      = require('fs');
var _       = require('underscore');
var mysql   = require('mysql');
var Promise = require('bluebird');

var qforms = require('../../../../qforms');
var server = require('../../../../server');

var EditorController = require('../EditorController');

util.inherits(DatabaseEditorController, EditorController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function DatabaseEditorController(appInfo) {
    DatabaseEditorController.super_.call(this, appInfo);
    this.viewDirPath = path.join(
        server.get('public'),
        'editor/class/Controller/ModelController/DocumentController/DatabaseController/view'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseEditorController.prototype._new = function(params) {
    var self = this;
    var appFile = new qforms.JsonFile(self.appInfo.filePath);
    return appFile.read2().then(function () {
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
        return appEditor.save2().then(function () {
            var databaseData = appEditor.getDatabaseData(params.name)
            return databaseData;
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseEditorController.prototype.save = function(params) {
    var self = this;
    var appFile = new qforms.JsonFile(self.appInfo.filePath);
    return appFile.read2().then(function () {
        var appEditor = new qforms.ApplicationEditor(appFile);
        appEditor.setDatabaseAttr(params.database, params.attr, params.value);
        return appEditor.save2().then(function () {
            return null;
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseEditorController.prototype.delete = function(params) {
    var self = this;
    var appFile = new qforms.JsonFile(self.appInfo.filePath);
    return appFile.read2().then(function () {
        var appEditor = new qforms.ApplicationEditor(appFile);
        appEditor.deleteDatabase(params.database);
        return appEditor.save2().then(function () {
            return null;
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseEditorController.prototype.getView = function(params) {
    var self = this;
    return DatabaseEditorController.super_.prototype.getView.call(self, params).then(function (result) {
        switch (params.view) {
            case 'DatabaseView/DatabaseView.html':
                var appFile = new qforms.JsonFile(self.appInfo.filePath);
                return appFile.read2().then(function () {
                    var appEditor = new qforms.ApplicationEditor(appFile);
                    var databaseData = appEditor.getDatabaseData(params.database);
                    return new Promise(function (resolve, reject) {
                        var cnn = mysql.createConnection({
                            host        : databaseData.params.host['@attributes'].value,
                            user        : databaseData.params.user['@attributes'].value,
                            database    : databaseData.params.database['@attributes'].value,
                            password    : databaseData.params.password['@attributes'].value
                        });
                        cnn.connect();
                        cnn.query('show tables', function(err, rows, fields) {
                            if (err) {
                                reject(err);
                            } else {
                                var tables = rows.map(function(row) {
                                    return {
                                        0: row[fields[0].name]
                                    }
                                });
                                result.data.tables = tables;
                                var filePath = path.join(self.viewDirPath, 'TableView', 'TableView.ejs');
                                qforms.helper.readFile(filePath).then(function (content) {
                                    result.data.tableView = content;
                                    resolve(result);
                                });
                            }
                        });
                        cnn.end();
                    });
                });
                break;
            default:
                return result;
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseEditorController.prototype.getTableInfo = function(params) {
    var self = this;
    var appFile = new qforms.JsonFile(self.appInfo.filePath);
    return appFile.read2().then(function () {
        var appEditor = new qforms.ApplicationEditor(appFile);
        var databaseData = appEditor.getDatabaseData(params.database);
        return new Promise(function (resolve, reject) {
            var cnn = mysql.createConnection({
                host        : databaseData.params.host['@attributes'].value,
                user        : databaseData.params.user['@attributes'].value,
                database    : databaseData.params.database['@attributes'].value,
                password    : databaseData.params.password['@attributes'].value
            });
            cnn.connect();
            var query = "SELECT COLUMN_NAME, COLUMN_TYPE, IS_NULLABLE, COLUMN_KEY, COLUMN_DEFAULT, EXTRA, COLUMN_COMMENT\
                    FROM information_schema.columns\
                    WHERE table_schema = '{database}' and table_name = '{table}'"
                .replace('{database}', databaseData.params.database['@attributes'].value)
                .replace('{table}'   , params.table);
            cnn.query(query, function(err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        desc: rows
                    });
                }
            });
            cnn.end();
        });
    });
};