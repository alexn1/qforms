'use strict';

module.exports = DatabaseController;

var util  = require('util');
var path  = require('path');
var fs    = require('fs');
var _     = require('underscore');
var mysql = require('mysql');

var qforms          = require('../../../qforms');
var Controller      = require('../Controller');
var ApplicationFile = require('../../JsonFile/ApplicationFile/ApplicationFile');

util.inherits(DatabaseController, Controller);

////////////////////////////////////////////////////////////////////////////////////////////////////
function DatabaseController(appInfo) {
    DatabaseController.super_.prototype.constructor.call(this, appInfo);
    this.viewDirPath = path.join(
        qforms.get('public'),
        'editor/class/Controller/ModelController/DocumentController/DatabaseController/view'
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseController.prototype._new = function(params, callback) {
    var appFile = new ApplicationFile(this.appInfo);
    appFile.init(function() {
        appFile.newDatabase(params);
        if (params.params) {
            for (var name in params.params) {
                var param = params.params[name];
                appFile.newDatabaseParam(_.extend(
                    {database: params.name},
                    param
                ));
            }
        }
        appFile.save(function() {
            var databaseData = appFile.getDatabaseData(params.name)
            callback(databaseData);
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseController.prototype.save = function(params, callback) {
    var appFile = new ApplicationFile(this.appInfo);
    appFile.init(function() {
        appFile.setDatabaseAttr(params.database, params.attr, params.value);
        appFile.save(function() {
            callback(null);
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseController.prototype.delete = function(params, callback) {
    var appFile = new ApplicationFile(this.appInfo);
    appFile.init(function() {
        appFile.deleteDatabase(params.database);
        appFile.save(function() {
            callback(null);
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseController.prototype.getView = function(params, callback) {
    var self = this;
    DatabaseController.super_.prototype.getView.call(this, params, function(result) {
        switch (params.view) {
            case 'DatabaseView/DatabaseView.html':
                var appFile = new ApplicationFile(self.appInfo);
                appFile.init(function() {
                    var databaseData = appFile.getDatabaseData(params.database);
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
DatabaseController.prototype.getTableInfo = function(params, callback) {
    var appFile = new ApplicationFile(this.appInfo);
    appFile.init(function() {
        var databaseData = appFile.getDatabaseData(params.database);
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