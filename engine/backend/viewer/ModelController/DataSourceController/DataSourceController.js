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
        delete response.query;
        delete response.limit;
        response.keyColumns = self.keyColumns;
        if (self.parentKeyColumns.length > 0) {
            response.parentKeyColumns = self.parentKeyColumns;
        }
        if (args.newMode) {
            response.rows = [];
            callback(response);
        } else {
            if (self.data['@attributes'].limit) {
                args.params['@offset'] = 0;
                args.params['@limit']  = response.limit  = parseInt(self.data['@attributes'].limit);
            }
            self.select(args, function(rows) {
                response.rows = rows;
                if (self.name === 'default' && self.form && self.form instanceof RowFormController && rows[0]) {
                    self.form.dumpRowToParams(rows[0], args.querytime.params);
                }
                if (self.data['@attributes'].limit) {
                    if (!self.data['@attributes'].countQuery) {
                        throw new Error('[' + self.getFullName() + ']: countQuery empty.');
                    }
                    self.selectCount(args, function(count) {
                        response.count = parseInt(count);
                        callback(response);
                    });
                } else {
                    callback(response);
                }
            });
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.frame = function(args, callback) {
    if (this.data['@attributes'].limit) {
        args.params['@limit'] = parseInt(this.data['@attributes'].limit);
    }
    this.select(args, function(rows) {
        callback({
            rows: rows
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.select = function(args, callback) {
    callback();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.update = function(args, callback) {
    callback();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.insert = function(args, callback) {
    callback();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.delete = function(args, callback) {
    callback();
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
DataSourceController.prototype._replaceThis = function(query) {
    // for form data sources only
    if (this.form) {
        var self = this;
        return query.replace(/\{([@\w\.]+)\}/g, function (text, name) {
            if (name.indexOf('.') !== -1) {
                var arr = name.split('.');
                if (arr[0] === 'this') {
                    arr[0] = self.form.page.name;
                }
                return '{' + arr.join('.') + '}';
            } else {
                return text;
            }
        });
    } else {
        return query;
    }
};