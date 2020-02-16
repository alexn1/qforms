'use strict';

module.exports = SqlDataSource;

var util    = require('util');
var path    = require('path');
var sqlish  = require('sqlish');
var _       = require('underscore');
var Promise = require('bluebird');

var qforms      = require('../../../../../qforms');
var DataSource  = require('../DataSource');

util.inherits(SqlDataSource, DataSource);

////////////////////////////////////////////////////////////////////////////////////////////////////
function SqlDataSource(data, parent) {
    var self = this;
    SqlDataSource.super_.call(self, data, parent);
    self.desc        = null;
    self.aiFieldName = null;
    self.database    = self.getApp().databases[self.data['@attributes'].database];
}

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSource.create = function(data, parent) {
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
                    return new SqlDataSource(data, parent);
                }
            });
        } else {
            return new SqlDataSource(data, parent);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSource.prototype.query = function(context, query, params, select) {
    var self = this;
    //console.log('SqlDataSource.prototype.query', {dsName: this.name, query: query, params: params});
    return self.database.query(context, query, params, select);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSource.prototype._desc = function(context) {
    var self = this;
    console.log('SqlDataSource.prototype._desc', self.data['@attributes'].table);
    return this.database.desc(context, self.data['@attributes'].table).then(function (arr) {
        self.desc = arr[0];
        self.aiFieldName = arr[1];
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSource.prototype.select = function(context) {
    var self = this;
    return Promise.try(function () {
        var access = self.getAccessToken(context);
        if (access.select === false) {
            throw new Error('[{fullName}]: access denied.'.template({
                fullName: self.getFullName()
            }));
        }
        var query  = self.form ? self.form.replaceThis(context, self.data['@attributes'].query) : self.data['@attributes'].query;
        var params = self.getParams(context);
        return self.query(context, query, params, true).then(function(rows) {
            return rows;
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSource.prototype.selectCount = function(context) {
    var self = this;
    return Promise.try(function () {
        var access = self.getAccessToken(context);
        if (access.select === false) {
            throw new Error('[{fullName}]: access denied.'.template({fullName: this.getFullName()}));
        }
        var query = self.form ? self.form.replaceThis(context, self.data['@attributes'].countQuery) : self.data['@attributes'].countQuery;
        var params = self.getParams(context);
        return self.query(context, query, params, true).then(function(rows) {
            var row = rows[0];
            if (row === undefined) {
                throw new Error('[{fullName}]: countQuery must return one row.'.template({
                    fullName: self.getFullName()
                }));
            }
            var count = row[Object.keys(row)[0]];
            return count;
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSource.prototype.update = function(context) {
    var self = this;
    return Promise.try(function () {
        var access = self.getAccessToken(context);
        if (access.update === false) {
            throw new Error('[{fullName}]: access denied.'.template({
                fullName: self.getFullName()
            }));
        }
    }).then(function () {
        if (!self.desc) {
            return self._desc(context);
        }
    }).then(function () {
        var row = context.row;
        var values = {};
        for (var column in row) {
            // if exists in table and not key column
            if (self.desc[column] !== undefined && self.keyColumns.indexOf(column) === -1) {
                values[column] = row[column];
            }
        }
        var where = self.getRowKeyValues(row);
        //console.log('update values:', values);
        //console.log('update where:', where);
        var query = new sqlish.Sqlish()
            .update(self.data['@attributes'].table)
            .set(values)
            .where(where)
            .toString();

        // fixed update with multiple key columns
        if (Object.keys(where).length > 1) {
            query = SqlDataSource.createUpdateQuery(self.data['@attributes'].table, values, where);
        }
        return self.query(context, query, null, false);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSource.createUpdateQuery = function (tableName, values, where) {
    var valuesString = Object.keys(values).map(function (name) {
        return '{name} = {value}'.replace('{name}', name).replace('{value}', JSON.stringify(values[name]));
    }).join(', ');
    var whereString = Object.keys(where).map(function (name) {
        return '{name} = {value}'.replace('{name}', name).replace('{value}', JSON.stringify(where[name]));
    }).join(' and ');
    return 'UPDATE {tableName} set {valuesString} where {whereString}'
        .replace('{tableName}'   , tableName)
        .replace('{valuesString}', valuesString)
        .replace('{whereString}' , whereString);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSource.prototype.getBuffer = function(context, file) {
    var self = this;
    return Promise.resolve(file.data);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSource.prototype.insert = function(context) {
    var self = this;
    console.log('SqlDataSource.prototype.insert');
    return Promise.try(function () {
        var access = self.getAccessToken(context);
        if (access.insert === false) {
            throw new Error('[{fullName}]: access denied.'.template({
                fullName: self.getFullName()
            }));
        }
    }).then(function () {
        if (!self.desc) {
            self._desc(context);
        }
    }).then(function () {
        var row = context.row;
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
        return Promise.each(Object.keys(files), function (name) {
            var file = files[name];
            return self.getBuffer(context, file).then(function (buffer) {
                buffers[name] = buffer;
            });
        }).then(function () {
            var query = new sqlish.Sqlish().insert(self.data['@attributes'].table, _row).toString().replace(/"{/g,'{').replace(/}"/g,'}');
            return self.query(context, query,  buffers, false).then(function(result) {
                var key = JSON.stringify([result.insertId]);
                return key;
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSource.prototype.delete = function(context) {
    var self = this;
    return Promise.try(function () {
        var access = self.getAccessToken(context);
        if (access.delete === false) {
            throw new Error('[{fullName}]: access denied.'.template({
                fullName: self.getFullName()
            }));
        }
        var row = context.row;
        var query = new sqlish.Sqlish()
            .deleteFrom(self.data['@attributes'].table)
            .where(self.getRowKeyValues(row))
            .toString();
        return self.query(context, query, null, false);
    });
};