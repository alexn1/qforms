'use strict';

module.exports = SqlDataSource;

var util    = require('util');
var path    = require('path');
var sqlish  = require('sqlish');
var mysql   = require('mysql');
var _       = require('underscore');
var Promise = require('bluebird');

var qforms      = require('../../../../../qforms');
var DataSource  = require('../DataSource');

util.inherits(SqlDataSource, DataSource);

////////////////////////////////////////////////////////////////////////////////////////////////////
function SqlDataSource(data, parent) {
    SqlDataSource.super_.call(this, data, parent);
    this.desc        = null;
    this.aiFieldName = null;
    this.database    = this.getApp().databases[this.data['@attributes'].database];
}

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSource.create2 = function(data, parent) {
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
                    return new SqlDataSource(data, parent);
                }
            });
        } else {
            return new SqlDataSource(data, parent);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSource.prototype.query2 = function(context, query, params, select) {
    var self = this;
    //console.log('SqlDataSource.prototype.query2', {dsName: this.name, query: query, params: params});
    return self.database.query2(context, query, params, select);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSource.prototype._desc2 = function(context) {
    var self = this;
    console.log('SqlDataSource.prototype._desc2', self.data['@attributes'].table);
    return Promise.try(function () {
        self.desc = {};
        var query = 'desc `{table}`'.replace('{table}', self.data['@attributes'].table);
        return self.query2(context, query, null, true).then(function(rows) {
            rows.forEach(function(info) {
                self.desc[info.Field] = info;
                if (info.Extra === 'auto_increment') {
                    self.aiFieldName = info.Field;
                }
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSource.prototype.select2 = function(context) {
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
        return self.query2(context, query, params, true).then(function(rows) {
            return rows;
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSource.prototype.selectCount2 = function(context) {
    var self = this;
    return Promise.try(function () {
        var access = self.getAccessToken(context);
        if (access.select === false) {
            throw new Error('[{fullName}]: access denied.'.template({fullName: this.getFullName()}));
        }
        var query  = self.form ? self.form.replaceThis(context, self.data['@attributes'].countQuery) : self.data['@attributes'].countQuery;
        var params = self.getParams(context);
        return self.query2(context, query, params, true).then(function(rows) {
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
SqlDataSource.prototype.update2 = function(context) {
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
            return self._desc2(context);
        }
    }).then(function () {
        var row = context.row;
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
        return self.query2(context, query, null, false);
    });


};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSource.prototype.getBuffer2 = function(context, file) {
    return Promise.resolve(file.data);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSource.prototype.insert2 = function(context) {
    var self = this;
    console.log('SqlDataSource.prototype.insert2');
    return Promise.try(function () {
        var access = self.getAccessToken(context);
        if (access.insert === false) {
            throw new Error('[{fullName}]: access denied.'.template({
                fullName: self.getFullName()
            }));
        }
    }).then(function () {
        if (!self.desc) {
            self._desc2(context);
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
            return self.getBuffer2(context, file).then(function (buffer) {
                buffers[name] = buffer;
            });
        }).then(function () {
            var query = new sqlish.Sqlish().insert(self.data['@attributes'].table, _row).toString().replace(/"{/g,'{').replace(/}"/g,'}');
            return self.query2(context, query,  buffers, false).then(function(result) {
                var key = JSON.stringify([result.insertId]);
                return key;
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataSource.prototype.delete2 = function(context) {
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
        return self.query2(context, query, null, false);
    });
};