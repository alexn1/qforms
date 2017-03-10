'use strict';

module.exports = DataSource;

var util    = require('util');
var path    = require('path');
var _       = require('underscore');
var Promise = require('bluebird');

var qforms = require('../../../../qforms');
var Model  = require('../Model');

util.inherits(DataSource, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.create = function(data, parent) {
    return Promise.try(function () {
        if (parent instanceof qforms.Form) {
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
            return qforms.helper.getFileContent(customClassFilePath).then(function(content) {
                if (content) {
                    var customClass = eval(content);
                    return new customClass(data, parent);
                } else {
                    return new qforms.SqlDataSource(data, parent);
                }
            });
        } else {
            return new DataSource(data, parent);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function DataSource(data, parent) {
    var self = this;
    DataSource.super_.call(self, data, parent);
    self.application      = parent instanceof qforms.Application ? parent : null;
    self.page             = parent instanceof qforms.Page        ? parent : null;
    self.form             = parent instanceof qforms.Form        ? parent : null;
    self.keyColumns       = [];
    self.parentKeyColumns = [];
}

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.init = function() {
    var self = this;
    return DataSource.super_.prototype.init.call(this).then(function () {
        if (self.data.keyColumns === undefined || Object.keys(self.data.keyColumns).length === 0) {
            throw new Error('[' + self.getFullName() + ']: Data Source must have at least one key column.');
        }
        self.keyColumns = Object.keys(self.data.keyColumns);
        if (self.data.parentKeyColumns) {
            self.parentKeyColumns = Object.keys(self.data.parentKeyColumns);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.checkColumn = function(row, column) {
    var self = this;
    if (!row.hasOwnProperty(column)) {
        throw new Error('[{fullName}]: No column \'{column}\' in result set.'.template({
            fullName : self.getFullName(),
            column   : column
        }));
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.checkAndCalcColumns = function(row) {
    var self = this;
    return Promise.try(function () {
        self.keyColumns.forEach(function(column) {
            self.checkColumn(row, column);
        });
        self.parentKeyColumns.forEach(function(column) {
            self.checkColumn(row, column);
        });
        if ((self.parent instanceof qforms.Form) && self.name === 'default') {
            return Promise.each(Object.keys(self.parent.fields), function (name) {
                var field = self.parent.fields[name];
                if (!field.data['@attributes'].column) {
                    throw new Error('[{fullName}]: no column name'.template({fullName : self.getFullName()}));
                }
                if (row.hasOwnProperty(field.data['@attributes'].column)) {
                    // ok
                } else if (field.data['@attributes'].value) {
                    return field.calcValue(row);
                } else {
                    throw new Error('[{fullName}]: need column or value.'.template({fullName : self.getFullName()}));
                }
            });
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.fill = function(context) {
    var self = this;
    var start;
    return DataSource.super_.prototype.fill.call(self, context).then(function (response) {
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
            return response;
        } else {
            if (self.data['@attributes'].limit) {
                context.params['offset'] = 0;
                context.params['limit']  = response.limit = parseInt(self.data['@attributes'].limit);
            }
            start = Date.now();
            return self.select(context).then(function (rows) {
                console.log('DataSource.prototype.fill', self.getFullName(), 'select:', Date.now() - start);
                response.rows = rows;
                if (response.rows.length > 0) {
                    return Promise.each(response.rows, function (row) {
                        return self.checkAndCalcColumns(row);
                    });
                }
            }).then(function () {
                if (self.name === 'default' && self.form && self.form instanceof qforms.RowForm && response.rows[0]) {
                    self.form.dumpRowToParams(response.rows[0], context.querytime.params);
                }
                if (self.data['@attributes'].limit) {
                    if (!self.data['@attributes'].countQuery) {
                        throw new Error('[' + self.getFullName() + ']: countQuery empty.');
                    }
                    start = Date.now();
                    return self.selectCount(context).then(function (count) {
                        console.log('DataSource.prototype.fill', self.getFullName(),'selectCount:', Date.now() - start);
                        response.count = parseInt(count);
                        return response;
                    });
                } else {
                    return response;
                }
            });
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.frame = function(context) {
    var self = this;
    var start;
    if (self.data['@attributes'].limit) {
        context.params['limit'] = parseInt(self.data['@attributes'].limit);
    }
    start = Date.now();
    return self.select(context).then(function (rows) {
        console.log('DataSource.prototype.frame', self.getFullName(), 'select:', Date.now() - start);
        if (self.data['@attributes'].limit) {
            if (!self.data['@attributes'].countQuery) {
                throw new Error('[' + self.getFullName() + ']: countQuery empty.');
            }
            start = Date.now();
            return self.selectCount(context).then(function (count) {
                console.log('DataSource.prototype.frame', self.getFullName(), 'selectCount:', Date.now() - start);
                return {
                    rows : rows,
                    count: parseInt(count)
                };
            });
        } else {
            return {
                rows: rows
            };
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.selectCount = function(context) {
    var self = this;
    return Promise.resolve([]);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.select = function(context) {
    var self = this;
    return Promise.resolve([]);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.update = function(context) {
    var self = this;
    return Promise.resolve();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.insert = function(context) {
    var self = this;
    return Promise.resolve();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.delete = function(context) {
    var self = this;
    return Promise.resolve();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getApp = function() {
    var self = this;
    if (self.parent instanceof qforms.Application) {
        return self.parent;
    } else if (self.parent instanceof qforms.Page) {
        return self.parent.parent;
    } else if (self.parent instanceof qforms.Form) {
        return self.parent.parent.parent;
    } else {
        throw new Error('getApp: wrong parent');
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getRowKeyValues = function(row) {
    var self = this;
    var values = {};
    self.keyColumns.forEach(function(column) {
        values[column] = row[column];
    });
    return values;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getKeyValues = function(key) {
    var arr = JSON.parse(key);
    var row = {};
    for (var i = 0; i < this.keyColumns.length; i++) {
        var column = this.keyColumns[i];
        row[column] = arr[i];
    }
    return row;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getFullName = function() {
    var self = this;
    if (self.form) {
        return [self.form.page.name, self.form.name, self.name].join('.');
    } else if (self.page) {
        return [self.page.name, self.name].join('.');
    } else {
        return self.name;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getParams = function(context) {
    var self = this;
    return self.getApp().getParams(context);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getAccessToken = function(context) {
    var self = this;
    return {
        select: true,
        insert: true,
        update: true,
        delete: true
    };
};