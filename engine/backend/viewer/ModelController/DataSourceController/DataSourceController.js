'use strict';

module.exports = DataSourceController;

var util = require('util');
var path = require('path');
var _    = require('underscore');

var QForms = require('../../../qforms');

var helper                = require('../../../common/helper');
var ModelController       = require('../ModelController');

var PageController        = require('../PageController/PageController');
var FormController        = require('../FormController/FormController');
var RowFormController     = require('../FormController/RowFormController/RowFormController');

util.inherits(DataSourceController, ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.create = function(data, parent, callback) {
    if (parent instanceof FormController) {
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
        helper.getFileContent(customClassFilePath, function(content) {
            if (content) {
                var customClass = eval(content);
                callback(new customClass(data, parent));
            } else {
                callback(new QForms.SqlDataSourceController(data, parent));
            }
        });
    } else {
        callback(new DataSourceController(data, parent));
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function DataSourceController(data, parent) {
    DataSourceController.super_.call(this, data, parent);
    this.application      = parent instanceof QForms.ApplicationController ? parent : null;
    this.page             = parent instanceof PageController        ? parent : null;
    this.form             = parent instanceof FormController        ? parent : null;
    this.keyColumns       = [];
    this.parentKeyColumns = [];
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
DataSourceController.prototype.checkColumn = function(row, column) {
    if (!row.hasOwnProperty(column)) {
        throw new Error('[{fullName}]: No column \'{column}\' in result set.'.template({
            fullName : this.getFullName(),
            column   : column
        }));
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.checkColumns = function(row) {
    var self = this;
    this.keyColumns.forEach(function(column) {
        self.checkColumn(row, column);
    });
    this.parentKeyColumns.forEach(function(column) {
        self.checkColumn(row, column);
    });
    if ((this.parent instanceof FormController) && this.name === 'default') {
        for (var name in this.parent.fields) {
            var field = this.parent.fields[name];
            this.checkColumn(row, field.data['@attributes'].column);
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.fill = function(context, callback) {
    var self = this;
    DataSourceController.super_.prototype.fill.call(this, context, function(response) {
        delete response.query;
        delete response.limit;
        response.keyColumns = self.keyColumns;
        if (self.parentKeyColumns.length > 0) {
            response.parentKeyColumns = self.parentKeyColumns;
        }
        response.access = self.getAccessToken(context);
        // if form data source named default then check mode
        if (self.form && self.name === 'default' && context.newMode) {
            response.rows = [];
            callback(response);
        } else {
            if (self.data['@attributes'].limit) {
                context.params['offset'] = 0;
                context.params['limit']  = response.limit  = parseInt(self.data['@attributes'].limit);
            }
            self.select(context, function(rows) {
                if (rows[0]) {
                    self.checkColumns(rows[0]);
                }
                response.rows = rows;
                if (self.name === 'default' && self.form && self.form instanceof RowFormController && rows[0]) {
                    self.form.dumpRowToParams(rows[0], context.querytime.params);
                }
                if (self.data['@attributes'].limit) {
                    if (!self.data['@attributes'].countQuery) {
                        throw new Error('[' + self.getFullName() + ']: countQuery empty.');
                    }
                    self.selectCount(context, function(count) {
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
DataSourceController.prototype.frame = function(context, callback) {
    if (this.data['@attributes'].limit) {
        context.params['limit'] = parseInt(this.data['@attributes'].limit);
    }
    var self = this;
    this.select(context, function(rows) {
        if (self.data['@attributes'].limit) {
            if (!self.data['@attributes'].countQuery) {
                throw new Error('[' + self.getFullName() + ']: countQuery empty.');
            }
            self.selectCount(context, function(count) {
                callback({
                    rows : rows,
                    count: parseInt(count)
                });
            });
        } else {
            callback({
                rows: rows
            });
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.select = function(context, callback) {
    callback([]);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.update = function(context, callback) {
    callback();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.insert = function(context, callback) {
    callback();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.delete = function(context, callback) {
    callback();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.getApp = function() {
    if (this.parent instanceof QForms.ApplicationController) {
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
DataSourceController.prototype.getRowKeyValues = function(row) {
    var values = {};
    this.keyColumns.forEach(function(column) {
        values[column] = row[column];
    });
    return values;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.getKeyValues = function(key) {
    var arr = JSON.parse(key);
    var row = {};
    for (var i = 0; i < this.keyColumns.length; i++) {
        var column = this.keyColumns[i];
        row[column] = arr[i];
    }
    return row;
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
DataSourceController.prototype.getParams = function(context) {
    return this.getApp().getParams(context);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.getAccessToken = function(context) {
    return {
        select: true,
        insert: true,
        update: true,
        delete: true
    };
};