'use strict';

module.exports = SqlDataSourceController;

var util    = require('util');
var path    = require('path');
var sqlish  = require('sqlish');
var mysql   = require('mysql');
var _       = require('underscore');
var async   = require('async');
var Promise = require('bluebird');

var qforms = require('../../../../../qforms');

var DataSourceController = require('../DataSourceController');

util.inherits(SqlDataSourceController, DataSourceController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function SqlDataSourceController(data, parent) {
    SqlDataSourceController.super_.call(this, data, parent);
    this.desc        = null;
    this.aiFieldName = null;
    this.database    = this.getApp().databases[this.data['@attributes'].database];
}

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSourceController.create = function(data, parent, callback) {
    if (parent instanceof qforms.FormController) {
        var form = parent;
        var customClassFilePath = path.join(
            form.page.application.dirPath,
            'pages',
            form.page.name,
            'forms',
            form.name,
            'dataSources',
            data['@attributes'].name,
            data['@attributes'].name + '.backend.js'
        );
        qforms.helper.getFileContent2(customClassFilePath).then(function(content) {
            if (content) {
                var customClass = eval(content);
                callback(new customClass(data, parent));
            } else {
                callback(new SqlDataSourceController(data, parent));
            }
        });
    } else {
        callback(new SqlDataSourceController(data, parent));
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSourceController.create2 = function(data, parent) {
    return Promise.try(function () {
        if (parent instanceof qforms.FormController) {
            var form = parent;
            var customClassFilePath = path.join(
                form.page.application.dirPath,
                'pages',
                form.page.name,
                'forms',
                form.name,
                'dataSources',
                data['@attributes'].name,
                data['@attributes'].name + '.backend.js'
            );
            return qforms.helper.getFileContent2(customClassFilePath).then(function(content) {
                if (content) {
                    var customClass = eval(content);
                    return new customClass(data, parent);
                } else {
                    return new SqlDataSourceController(data, parent);
                }
            });
        } else {
            return new SqlDataSourceController(data, parent);
        }
    });
};

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSourceController.prototype.query = function(context, query, params, callback, select) {
    //console.log({dsName: this.name, query: query, params: params});
    this.database.query(context, query, params, callback, select);
};
*/

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSourceController.prototype.query2 = function(context, query, params, select) {
    //console.log({dsName: this.name, query: query, params: params});
    var self = this;
    return self.database.query2(context, query, params, select);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSourceController.prototype._desc = function(context, callback) {
    var self = this;
    this.desc = {};
    var query = 'desc `{table}`'.replace('{table}',this.data['@attributes'].table);
    self.query2(context, query, null, true).then(function(rows) {
        rows.forEach(function(info) {
            self.desc[info.Field] = info;
            if (info.Extra === 'auto_increment') {
                self.aiFieldName = info.Field;
            }
        });
        callback();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSourceController.prototype.select = function(context, callback) {
    var self = this;
    var access = this.getAccessToken(context);
    if (access.select === false) {
        throw new Error('[{fullName}]: access denied.'.template({
            fullName: this.getFullName()
        }));
    }
    var query  = this.form ? this.form.replaceThis(context, this.data['@attributes'].query) : this.data['@attributes'].query;
    var params = this.getParams(context);
    self.query2(context, query, params, true).then(function(rows) {
        callback(rows);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSourceController.prototype.selectCount = function(context, callback) {
    var self = this;
    var access = this.getAccessToken(context);
    if (access.select === false) {
        throw new Error('[{fullName}]: access denied.'.template({
            fullName: this.getFullName()
        }));
    }
    var query  = this.form ? this.form.replaceThis(context, this.data['@attributes'].countQuery) : this.data['@attributes'].countQuery;
    var params = this.getParams(context);
    this.query2(context, query, params, true).then(function(rows) {
        var row = rows[0];
        if (row === undefined) {
            throw new Error('[{fullName}]: countQuery must return one row.'.template({
                fullName: self.getFullName()
            }));
        }
        var count = row[Object.keys(row)[0]];
        callback(count);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSourceController.prototype.update = function(context, callback) {
    var access = this.getAccessToken(context);
    if (access.update === false) {
        throw new Error('[{fullName}]: access denied.'.template({
            fullName: this.getFullName()
        }));
    }
    var row = context.row;
    var self = this;
    var updateRow = function() {
        var values = {};
        for (var column in row) {
            // if exists in table and not key column
            if (self.desc[column] !== undefined && self.keyColumns.indexOf(column)) {
                values[column] = row[column];
            }
        }
        var query = new sqlish.Sqlish()
            .update(self.data['@attributes'].table)
            .set(values)
            .where(self.getRowKeyValues(row))
            .toString();
        self.query2(context, query, null, false).then(callback);
    };
    if (!this.desc) {
        this._desc(context, updateRow);
    } else {
        updateRow();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSourceController.prototype.getBuffer = function(context, file, callback) {
    callback(file.data);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSourceController.prototype.insert = function(context, callback) {
    var access = this.getAccessToken(context);
    if (access.insert === false) {
        throw new Error('[{fullName}]: access denied.'.template({
            fullName: this.getFullName()
        }));
    }
    var row = context.row;
    var self = this;
    var insertRow = function(_callback) {
        var _row = {};
        var files = {};
        for (var column in row) {
            if (row[column] instanceof Object) {
                _row[column] = '{' + column + '}';
                files[column] = row[column];
                console.error(row[column]);
            } else if (column === self.aiFieldName) {
            } else {
                _row[column] = row[column];
            }
        }
        var buffers = {};
        var tasks = _.map(files, function(file, name) {
            return function(next) {
                self.getBuffer(context, file, function(buffer) {
                    buffers[name] = buffer;
                    next();
                });
            };
        });
        async.series(tasks, function() {
            var query = new sqlish.Sqlish().insert(self.data['@attributes'].table, _row).toString().replace(/"{/g,'{').replace(/}"/g,'}');
            self.query2(context, query,  buffers, false).then(function(result) {
                var key = JSON.stringify([result.insertId]);
                _callback(key);
            });
        });
    };
    if (!this.desc) {
        this._desc(context, function() {
            insertRow(callback);
        });
    } else {
        insertRow(callback);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSourceController.prototype.delete = function(context, callback) {
    var access = this.getAccessToken(context);
    if (access.delete === false) {
        throw new Error('[{fullName}]: access denied.'.template({
            fullName: this.getFullName()
        }));
    }
    var row = context.row;
    var query = new sqlish.Sqlish()
        .deleteFrom(this.data['@attributes'].table)
        .where(this.getRowKeyValues(row))
        .toString();
    this.query2(context, query, null, false).then(callback);
};