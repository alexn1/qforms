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
DataSource.create2 = function(data, parent) {
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
            return qforms.helper.getFileContent2(customClassFilePath).then(function(content) {
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
    DataSource.super_.call(this, data, parent);
    this.application      = parent instanceof qforms.Application ? parent : null;
    this.page             = parent instanceof qforms.Page        ? parent : null;
    this.form             = parent instanceof qforms.Form        ? parent : null;
    this.keyColumns       = [];
    this.parentKeyColumns = [];
}

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.init2 = function() {
    var self = this;
    return DataSource.super_.prototype.init2.call(this).then(function () {
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
    if (!row.hasOwnProperty(column)) {
        throw new Error('[{fullName}]: No column \'{column}\' in result set.'.template({
            fullName : this.getFullName(),
            column   : column
        }));
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.checkColumns = function(row) {
    var self = this;
    this.keyColumns.forEach(function(column) {
        self.checkColumn(row, column);
    });
    this.parentKeyColumns.forEach(function(column) {
        self.checkColumn(row, column);
    });
    if ((this.parent instanceof qforms.Form) && this.name === 'default') {
        for (var name in this.parent.fields) {
            var field = this.parent.fields[name];
            this.checkColumn(row, field.data['@attributes'].column);
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.fill2 = function(context) {
    var self = this;
    return DataSource.super_.prototype.fill2.call(self, context).then(function (response) {
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
                context.params['limit']  = response.limit  = parseInt(self.data['@attributes'].limit);
            }
            return self.select2(context).then(function (rows) {
                if (rows[0]) {
                    self.checkColumns(rows[0]);
                }
                response.rows = rows;
                if (self.name === 'default' && self.form && self.form instanceof qforms.RowForm && rows[0]) {
                    self.form.dumpRowToParams(rows[0], context.querytime.params);
                }
                if (self.data['@attributes'].limit) {
                    if (!self.data['@attributes'].countQuery) {
                        throw new Error('[' + self.getFullName() + ']: countQuery empty.');
                    }
                    return self.selectCount2(context).then(function (count) {
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
DataSource.prototype.frame2 = function(context) {
    var self = this;
    if (this.data['@attributes'].limit) {
        context.params['limit'] = parseInt(this.data['@attributes'].limit);
    }
    return self.select2(context).then(function (rows) {
        if (self.data['@attributes'].limit) {
            if (!self.data['@attributes'].countQuery) {
                throw new Error('[' + self.getFullName() + ']: countQuery empty.');
            }
            return self.selectCount2(context).then(function (count) {
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
DataSource.prototype.select2 = function(context) {
    return Promise.resolve([]);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.update2 = function(context) {
    return Promise.resolve();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.insert2 = function(context) {
    return Promise.resolve();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.delete2 = function(context) {
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
    if (this.form) {
        return [this.form.page.name, this.form.name, this.name].join('.');
    } else if (this.page) {
        return [this.page.name, this.name].join('.');
    } else {
        return this.name;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getParams = function(context) {
    return this.getApp().getParams(context);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getAccessToken = function(context) {
    return {
        select: true,
        insert: true,
        update: true,
        delete: true
    };
};