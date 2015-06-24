'use strict';

module.exports = SqlDataSourceController;

var util   = require('util');
var path   = require('path');
var sqlish = require("sqlish");

var helper               = require('../../../../common/helper');
var DataSourceController = require('../DataSourceController');
var FormController       = require('../../FormController/FormController');
var SqlDataAdapter       = require('../../../DataAdapter/SqlDataAdapter/SqlDataAdapter');

util.inherits(SqlDataSourceController, DataSourceController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function SqlDataSourceController(data, parent) {
    SqlDataSourceController.super_.call(this, data, parent);
    this.desc        = null;
    this.aiFieldName = null;
    this.dataAdapter = new SqlDataAdapter(this);
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
SqlDataSourceController.prototype.select = function(params, callback) {
    var query = this._replaceThis(this.data['@attributes'].query);
    this.dataAdapter._query(query, params, function(rows) {
        callback(rows);
    }, true);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSourceController.prototype.update = function(row, callback) {
    var query = new sqlish.Sqlish()
        .update(this.data['@attributes'].table)
        .set(this.getRowNonKeyValues(row))
        .where(this.getRowKeyValues(row))
        .toString();
    this.dataAdapter._query(query, null, callback);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSourceController.prototype.insert = function(row, callback) {
    var self = this;
    var insertRow = function() {
        for (var column in row) {
            if (column === self.aiFieldName) {
                delete row[column];
                break;
            }
        }
        var query = new sqlish.Sqlish().insert(self.data['@attributes'].table, row).toString();
        self.dataAdapter._query(query,  null, function(result) {
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
SqlDataSourceController.prototype.delete = function(row, callback) {
    var query = new sqlish.Sqlish()
        .deleteFrom(this.data['@attributes'].table)
        .where(this.getRowKeyValues(row))
        .toString();
    this.dataAdapter._query(query, null, callback);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSourceController.prototype._desc = function(callback) {
    var self = this;
    this.desc = {};
    var query = 'desc `{table}`'.replace('{table}',this.data['@attributes'].table);
    this.dataAdapter._query(query, null, function(rows) {
        rows.forEach(function(info) {
            self.desc[info.Field] = info;
            if (info.Extra === 'auto_increment') {
                self.aiFieldName = info.Field;
            }
        });
        callback();
    });
};