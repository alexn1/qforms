'use strict';

module.exports = DataSource;

var util = require('util');

var Model       = require('../Model');
var Application = require('../Application/Application');
var Page        = require('../Page/Page');
var Form        = require('../Form/Form');

util.inherits(DataSource, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function DataSource(data, parent) {
    DataSource.super_.prototype.constructor.call(this, data, parent);
    this.keyColumns       = [];
    this.parentKeyColumns = [];
    this.dataAdapter      = null;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.init = function(callback) {
    var self = this;
    DataSource.super_.prototype.init.call(this, function() {
        self.keyColumns = Object.keys(self.data.keyColumns);
        if (self.data.parentKeyColumns) {
            self.parentKeyColumns = Object.keys(self.data.parentKeyColumns);
        }
        callback();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.fill = function(params, newMode, callback) {
    var self = this;
    DataSource.super_.prototype.fill.call(this, params, newMode, function(response) {
        response.keyColumns = self.keyColumns;
        if (self.parentKeyColumns.length > 0) {
            response.parentKeyColumns = self.parentKeyColumns;
        }
        if (newMode) {
            response.rows = [];
            callback(response);
        } else {
            self.dataAdapter.select(params, function(rows) {
                response.rows = rows;
                callback(response);
            });
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.refill = function(params, callback) {
    this.dataAdapter.select(params, function(rows) {
        callback({
            rows:rows
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.update = function(row, callback) {
    this.dataAdapter.update(row, callback);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.insert = function(row, callback) {
    this.dataAdapter.insert(row, function(key) {
        callback(key);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.delete = function(row, callback) {
    this.dataAdapter.delete(row, callback);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getApp = function() {
    if (this.parent instanceof Application) {
        return this.parent;
    } else if (this.parent instanceof Page) {
        return this.parent.parent;
    } else if (this.parent instanceof Form) {
        return this.parent.parent.parent;
    } else {
        throw new Error('wrong parent');
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getPage = function() {
    if (this.parent instanceof Page) {
        return this.parent;
    } else if (this.parent instanceof Form) {
        return this.parent.parent;
    } else {
        return null;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getForm = function() {
    return this.parent instanceof Form ? this.parent : null;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getPool = function() {
    return this.getApp().getPool(this.data['@attributes'].database);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getRowKeyValues = function(row) {
    var values = {};
    this.keyColumns.forEach(function(column) {
        values[column] = row[column];
    });
    return values;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getRowNonKeyValues = function(row) {
    var values = {};
    for (var column in row) {
        if (this.keyColumns.indexOf(column) === -1) {
            values[column] = row[column];
        }
    }
    return values;
};