'use strict';

module.exports = DataSourceController;

var util = require('util');
var _    = require('underscore');

var ModelController       = require('../ModelController');
var ApplicationController = require('../ApplicationController/ApplicationController');
var PageController        = require('../PageController/PageController');
var FormController        = require('../FormController/FormController');
var RowFormController     = require('../FormController/RowFormController/RowFormController');

util.inherits(DataSourceController, ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function DataSourceController(data, parent) {
    DataSourceController.super_.call(this, data, parent);
    this.application      = parent instanceof ApplicationController ? parent : null;
    this.page             = parent instanceof PageController        ? parent : null;
    this.form             = parent instanceof FormController        ? parent : null;
    this.keyColumns       = [];
    this.parentKeyColumns = [];
    this.dataAdapter      = null;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.create = function(data, parent, callback) {
    callback(new DataSourceController(data, parent));
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.init = function(callback) {
    var self = this;
    DataSourceController.super_.prototype.init.call(this, function() {
        if (self.data.keyColumns === undefined || Object.keys(self.data.keyColumns).length === 0) {
            throw new Error('[' + self.getFullName() + ']: Data Source must have at least one key column.');
        }
        self.keyColumns = Object.keys(self.data.keyColumns);
        if (self.data.parentKeyColumns) {
            self.parentKeyColumns = Object.keys(self.data.parentKeyColumns);
        }
        callback();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.fill = function(args, callback) {
    var self = this;
    DataSourceController.super_.prototype.fill.call(this, args, function(response) {
        response.keyColumns = self.keyColumns;
        if (self.parentKeyColumns.length > 0) {
            response.parentKeyColumns = self.parentKeyColumns;
        }
        if (args.newMode) {
            response.rows = [];
            callback(response);
        } else {
            var params = {};
            _.extend(params, args.params);
            _.extend(params, args.querytime.params);
            self.dataAdapter.select(params, function(rows) {
                response.rows = rows;
                if (self.name === 'default' && self.form && self.form instanceof RowFormController && rows[0]) {
                    self.form.dumpRowToParams(rows[0], args.querytime.params);
                }
                callback(response);
            });
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.refill = function(params, callback) {
    this.dataAdapter.select(params, function(rows) {
        callback({
            rows:rows
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.update = function(row, callback) {
    this.dataAdapter.update(row, callback);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.insert = function(row, callback) {
    this.dataAdapter.insert(row, function(key) {
        callback(key);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.delete = function(row, callback) {
    this.dataAdapter.delete(row, callback);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.getApp = function() {
    if (this.parent instanceof ApplicationController) {
        return this.parent;
    } else if (this.parent instanceof PageController) {
        return this.parent.parent;
    } else if (this.parent instanceof FormController) {
        return this.parent.parent.parent;
    } else {
        throw new Error('wrong parent');
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.getPool = function() {
    return this.getApp().getPool(this.data['@attributes'].database);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.getRowKeyValues = function(row) {
    var values = {};
    this.keyColumns.forEach(function(column) {
        values[column] = row[column];
    });
    return values;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.getRowNonKeyValues = function(row) {
    var values = {};
    for (var column in row) {
        if (this.keyColumns.indexOf(column) === -1) {
            values[column] = row[column];
        }
    }
    return values;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.getFullName = function() {
    if (this.form) {
        return [this.form.page.name, this.form.name, this.name].join('.');
    } else if (this.page) {
        return [this.page.name, this.name].join('.');
    } else {
        return this.name;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.getQuery = function(params) {
    return this.replaceThis(this.data['@attributes'].query);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.replaceThis = function(query) {
    // for form data sources only
    if (this.form) {
        var self = this;
        return query.replace(/\{([@\w\.]+)\}/g, function (text, name) {
            if (name === '@offset') {
                return '0';
            } else if (name === '@limit') {
                return '100';
            } else {
                var arr = name.split('.');
                if (arr[0] === 'this') {
                    arr[0] = self.form.page.name;
                }
                return '{' + arr.join('.') + '}';
            }
        });
    } else {
        return query;
    }
};