'use strict';

module.exports = DatabaseEditorController;

var util  = require('util');
var path  = require('path');
var fs    = require('fs');
var _     = require('underscore');
var mysql = require('mysql');

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
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseEditorController.prototype._new = function(params, callback) {
    var self = this;
    var appFile = new qforms.JsonFile(this.appInfo.filePath);
    appFile.read(function() {
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
        appEditor.save(function() {
            var databaseData = appEditor.getDatabaseData(params.name)
            callback(databaseData);
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseEditorController.prototype.save = function(params, callback) {
    var self = this;
    var appFile = new qforms.JsonFile(this.appInfo.filePath);
    appFile.read(function() {
        var appEditor = new qforms.ApplicationEditor(appFile);
        appEditor.setDatabaseAttr(params.database, params.attr, params.value);
        appEditor.save(function() {
            callback(null);
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseEditorController.prototype.delete = function(params, callback) {
    var self = this;
    var appFile = new qforms.JsonFile(this.appInfo.filePath);
    appFile.read(function() {
        var appEditor = new qforms.ApplicationEditor(appFile);
        appEditor.deleteDatabase(params.database);
        appEditor.save(function() {
            callback(null);
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseEditorController.prototype.getView = function(params, callback) {
    var self = this;
    DatabaseEditorController.super_.prototype.getView.call(this, params, function(result) {
        switch (params.view) {
            case 'DatabaseView/DatabaseView.html':
                var appFile = new qforms.JsonFile(self.appInfo.filePath);
                appFile.read(function() {
                    var appEditor = new qforms.ApplicationEditor(appFile);
                    var databaseData = appEditor.getDatabaseData(params.database);
                    var cnn = mysql.createConnection({
                        host        : databaseData.params.host['@attributes'].value,
                        user        : databaseData.params.user['@attributes'].value,
                        database    : databaseData.params.database['@attributes'].value,
                        password    : databaseData.params.password['@attributes'].value
                    });
                    cnn.connect();
                    cnn.query('show tables',function(err, rows, fields) {
                        if (err) {
                            throw err;
                        } else {
                            var tables = rows.map(function(row) {
                                return {
                                    0: row[fields[0].name]
                                }
                            });
                            result.data.tables = tables;
                            fs.readFile(path.join(self.viewDirPath, 'TableView', 'TableView.ejs'), 'utf8', function(err, content) {
                                if (err) {
                                    throw err;
                                } else {
                                    result.data.tableView = content;
                                    callback(result);
                                }
                            });
                        }
                    });
                    cnn.end();
                });
                break;
            default:
                callback(result);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseEditorController.prototype.getTableInfo = function(params, callback) {
    var self = this;
    var appFile = new qforms.JsonFile(this.appInfo.filePath);
    appFile.read(function() {
        var appEditor = new qforms.ApplicationEditor(appFile);
        var databaseData = appEditor.getDatabaseData(params.database);
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
                throw err;
            } else {
                callback({
                    desc: rows
                });
            }
        });
        cnn.end();
    });
};