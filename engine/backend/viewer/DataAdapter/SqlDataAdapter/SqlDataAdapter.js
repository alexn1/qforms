"use strict"
module.exports = SqlDataAdapter;

var util = require('util');
var mysql = require('mysql');
var sqlish = require("sqlish");
var helper = require('../../../common/helper');
var DataAdapter = require('../DataAdapter');
util.inherits(SqlDataAdapter, DataAdapter);

////////////////////////////////////////////////////////////////////////////////////////////////////
function SqlDataAdapter(dataSource) {
    SqlDataAdapter.super_.prototype.constructor.call(this, dataSource);
    this.desc = null;
    this.aiFieldName = null;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataAdapter.prototype.select = function(params, callback) {
    var query = this.dataSource.data['@attributes'].query;
    this._query(query, params, function(rows) {
        callback(rows);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataAdapter.prototype.update = function(row, callback) {
    var query = new sqlish.Sqlish()
        .update(this.dataSource.data['@attributes'].table)
        .set(this.dataSource.getRowNonKeyValues(row))
        .where(this.dataSource.getRowKeyValues(row))
        .toString();
    this._query(query, null, function() {
        callback();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataAdapter.prototype.insert = function(row, callback) {
    var self = this;
    var insertRow = function() {
        for (var column in row) {
            if (column === self.aiFieldName) {
                delete row[column];
                break;
            }
        }
        var query = new sqlish.Sqlish().insert(self.dataSource.data['@attributes'].table, row).toString();
        self._query(query,  null, function(result) {
            callback(JSON.stringify([result.insertId]));
        });
    };
    if (!this.desc) {
        this._desc(insertRow);
    } else {
        insertRow();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataAdapter.prototype.delete = function(row, callback) {
    var query = new sqlish.Sqlish()
        .deleteFrom(this.dataSource.data['@attributes'].table)
        .where(this.dataSource.getRowKeyValues(row))
        .toString();
    this._query(query, null, function() {
        callback();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataAdapter.prototype._query = function(query, params, callback) {
    //console.log({query:query,params:params});
    this.dataSource.getPool().getConnection(function(err, cnn) {
        if (err) {
            throw err;
        } else {
            cnn.query({sql:query,typeCast:helper.typeCast}, params, function(err, result, fields) {
                cnn.release();
                if (err) {
                    throw err;
                } else {
                    callback(result);
                }
            });
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataAdapter.prototype._desc = function(callback) {
    var self = this;
    this.desc = {};
    var query = 'desc `{table}`'.replace('{table}',this.dataSource.data['@attributes'].table);
    this._query(query, null, function(rows) {
        rows.forEach(function(info) {
            self.desc[info.Field] = info;
            if (info.Extra === 'auto_increment') {
                self.aiFieldName = info.Field;
            }
        });
        callback();
    });
};