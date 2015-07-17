'use strict';

module.exports = SqlDataSourceController;

var util   = require('util');
var path   = require('path');
var sqlish = require('sqlish');
var mysql  = require('mysql');
var _      = require('underscore');

var helper               = require('../../../../common/helper');
var DataSourceController = require('../DataSourceController');
var FormController       = require('../../FormController/FormController');

util.inherits(SqlDataSourceController, DataSourceController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function SqlDataSourceController(data, parent) {
    SqlDataSourceController.super_.call(this, data, parent);
    this.desc        = null;
    this.aiFieldName = null;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSourceController.create = function(data, parent, callback) {
    if (parent instanceof FormController) {
        var form = parent;
        var customClassFilePath = path.join(
            form.page.application.dirPath,
            'pages',
            form.page.name,
            'forms',
            form.name,
            'dataSources',
            data['@attributes'].name + '.backend.js'
        );
        helper.getFileContent(customClassFilePath, function(content) {
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
SqlDataSourceController.prototype._query = function(query, params, callback, select) {
    select = select !== undefined ? select : false;
    console.log({dsName: this.name, query: query, params: params});
    this.getPool().getConnection(function(err, cnn) {
        if (err) {
            throw err;
        } else {
            cnn.query({sql: query, typeCast: helper.typeCast, nestTables: true}, params, function(err, result, fields) {
                cnn.release();
                if (err) {
                    throw err;
                } else {
                    if (select) {
                        // for dublicate column names
                        var fieldCount = {};
                        for (var j = 0; j < fields.length; j++) {
                            var f = fields[j];
                            if (!fieldCount[f.name]) {
                                fieldCount[f.name] = 0;
                            }
                            fieldCount[f.name]++;
                            f.numb = fieldCount[f.name] - 1;
                        }
                        var rows = [];
                        for (var i = 0; i < result.length; i++) {
                            var r = result[i];
                            var row = {};
                            for (var j=0; j<fields.length; j++) {
                                var f = fields[j];
                                var column = f.name + (f.numb > 0 ? f.numb : '');
                                row[column] = r[f.table][f.name];
                            }
                            rows.push(row);
                        }
                        callback(rows);
                    } else {
                        callback(result);
                    }
                }
            });
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSourceController.prototype._desc = function(callback) {
    var self = this;
    this.desc = {};
    var query = 'desc `{table}`'.replace('{table}',this.data['@attributes'].table);
    this._query(query, null, function(rows) {
        rows.forEach(function(info) {
            self.desc[info.COLUMNS.Field] = info.COLUMNS;
            if (info.COLUMNS.Extra === 'auto_increment') {
                self.aiFieldName = info.COLUMNS.Field;
            }
        });
        callback();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSourceController.prototype.select = function(args, callback) {
    var query  = this._replaceThis(this.data['@attributes'].query);
    var params = this.getParams(args);
    this._query(query, params, function(rows) {
        callback(rows);
    }, true);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSourceController.prototype.selectCount = function(args, callback) {
    var query  = this._replaceThis(this.data['@attributes'].countQuery);
    var params = this.getParams(args);
    this._query(query, params, function(rows) {
        var row = rows[0];
        var count = row[Object.keys(row)[0]];
        callback(count);
    }, true);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSourceController.prototype.update = function(args, callback) {
    var row = args.row;
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
        self._query(query, null, callback);
    };
    if (!this.desc) {
        this._desc(updateRow);
    } else {
        updateRow();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSourceController.prototype.insert = function(args, callback) {
    var row = args.row;
    var self = this;
    var insertRow = function() {
        // removing auto increment field
        for (var column in row) {
            if (column === self.aiFieldName) {
                delete row[column];
                break;
            }
        }
        var query = new sqlish.Sqlish()
            .insert(self.data['@attributes'].table, row)
            .toString();
        self._query(query,  null, function(result) {
            var key = JSON.stringify([result.insertId]);
            callback(key);
        });
    };
    if (!this.desc) {
        this._desc(insertRow);
    } else {
        insertRow();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSourceController.prototype.delete = function(args, callback) {
    var row = args.row;
    var query = new sqlish.Sqlish()
        .deleteFrom(this.data['@attributes'].table)
        .where(this.getRowKeyValues(row))
        .toString();
    this._query(query, null, callback);
};