'use strict';

var util    = require('util');
var path    = require('path');
var _       = require('underscore');
var Promise = require('bluebird');

var qforms      = require('../../../../../qforms');
var DataSource  = require('../DataSource');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class SqlDataSource extends DataSource {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor(data, parent) {
        super(data, parent);
        this.desc        = null;
        this.aiFieldName = null;
        this.database    = this.getApp().databases[this.data['@attributes'].database];
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static create(data, parent) {
        return Promise.try(() => {
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
                return qforms.Helper.getFileContent(customClassFilePath).then(content => {
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
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    query(context, query, params, select) {
        console.log('SqlDataSource.prototype.query', {dsName: this.name, query: query, params: params});
        return this.database.query(context, query, params, select);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    _desc(context) {
        console.log('SqlDataSource.prototype._desc', this.data['@attributes'].table);
        return this.database.desc(context, this.data['@attributes'].table).then(arr => {
            this.desc = arr[0];
            this.aiFieldName = arr[1];
            console.log('this.desc:', this.desc);
            console.log('this.aiFieldName:', this.aiFieldName);
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    select(context) {
        console.log('SqlDataSource.prototype.select', this.name);
        return Promise.try(() => {
            var access = this.getAccessToken(context);
            if (access.select === false) {
                throw new Error('[{fullName}]: access denied.'.template({
                    fullName: this.getFullName()
                }));
            }
            var query  = this.form ? this.form.replaceThis(context, this.data['@attributes'].query) : this.data['@attributes'].query;
            var params = this.getParams(context);
            return this.query(context, query, params, true).then(rows => {
                return rows;
            });
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    selectCount(context) {
        return Promise.try(() => {
            var access = this.getAccessToken(context);
            if (access.select === false) {
                throw new Error('[{fullName}]: access denied.'.template({fullName: this.getFullName()}));
            }
            var query = this.form ? this.form.replaceThis(context, this.data['@attributes'].countQuery) : this.data['@attributes'].countQuery;
            var params = this.getParams(context);
            return this.query(context, query, params, true).then(rows => {
                var row = rows[0];
                if (row === undefined) {
                    throw new Error('[{fullName}]: countQuery must return one row.'.template({
                        fullName: this.getFullName()
                    }));
                }
                var count = row[Object.keys(row)[0]];
                return count;
            });
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    update(context) {
        return Promise.try(() => {
            var access = this.getAccessToken(context);
            if (access.update === false) {
                throw new Error('[{fullName}]: access denied.'.template({
                    fullName: this.getFullName()
                }));
            }
        }).then(() => {
            if (!this.desc) {
                return this._desc(context);
            }
        }).then(() => {
            var row = context.row;
            var values = {};
            for (var column in row) {
                // if exists in table and not key column
                if (this.desc[column] !== undefined && this.keyColumns.indexOf(column) === -1) {
                    values[column] = row[column];
                }
            }
            var where = this.getRowKeyValues(row);
            //console.log('update values:', values);
            //console.log('update where:', where);
            var query = this.database.getUpdateQuery(this.data['@attributes'].table, values, where);
            return this.query(context, query, row, false);
        });
    }



    ////////////////////////////////////////////////////////////////////////////////////////////////////
    getBuffer(context, file) {
        return Promise.resolve(file.data);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    insert(context) {
        console.log('SqlDataSource.prototype.insert');
        return Promise.try(() => {
            var access = this.getAccessToken(context);
            if (access.insert === false) {
                throw new Error('[{fullName}]: access denied.'.template({
                    fullName: this.getFullName()
                }));
            }
        }).then(() => {
            if (!this.desc) {
                return this._desc(context);
            }
        }).then(() => {
            var row = context.row;
            var _row = {};
            var files = {};
            for (var column in row) {
                if (row[column] instanceof Object) {
                    _row[column] = '{' + column + '}';
                    files[column] = row[column];
                    console.error(row[column]);
                } else if (column === this.aiFieldName) {
                } else {
                    _row[column] = row[column];
                }
            }
            console.log('_row:', _row);
            var buffers = {};
            return Promise.each(Object.keys(files), name => {
                var file = files[name];
                return this.getBuffer(context, file).then(buffer => {
                    buffers[name] = buffer;
                });
            }).then(() => {
                var query = this.database.getInsertQuery(this.data['@attributes'].table, _row);
                return this.query(context, query,  row, false).then(result => {
                    var key = JSON.stringify([result.insertId]);
                    return key;
                });
            });
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    delete(context) {
        return Promise.try(() => {
            var access = this.getAccessToken(context);
            if (access.delete === false) {
                throw new Error('[{fullName}]: access denied.'.template({
                    fullName: this.getFullName()
                }));
            }
            var row = context.row;
            const rowKeyValues = this.getRowKeyValues(row);
            var query = this.database.getDeleteQuery(this.data['@attributes'].table, rowKeyValues);
            return this.query(context, query, row, false);
        });
    }

}

module.exports = SqlDataSource;
