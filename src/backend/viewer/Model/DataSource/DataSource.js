'use strict';

var util    = require('util');
var path    = require('path');
var _       = require('underscore');
var Promise = require('bluebird');

var qforms = require('../../../../qforms');
var Model  = require('../Model');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class DataSource extends Model {

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor(data, parent) {
        super(data, parent);
        this.application      = parent instanceof qforms.Application ? parent : null;
        this.page             = parent instanceof qforms.Page        ? parent : null;
        this.form             = parent instanceof qforms.Form        ? parent : null;
        this.keyColumns       = [];
        this.parentKeyColumns = [];
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
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
                        return new qforms.SqlDataSource(data, parent);
                    }
                });
            } else {
                return new DataSource(data, parent);
            }
        });
    }



    ////////////////////////////////////////////////////////////////////////////////////////////////////
    init() {
        return super.init().then(() => {
            if (this.data.keyColumns === undefined || Object.keys(this.data.keyColumns).length === 0) {
                throw new Error('[' + this.getFullName() + ']: Data Source must have at least one key column.');
            }
            this.keyColumns = Object.keys(this.data.keyColumns);
            if (this.data.parentKeyColumns) {
                this.parentKeyColumns = Object.keys(this.data.parentKeyColumns);
            }
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    checkColumn(row, column) {
        if (!row.hasOwnProperty(column)) {
            throw new Error('[{fullName}]: No column \'{column}\' in result set.'.template({
                fullName : this.getFullName(),
                column   : column
            }));
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    async checkAndCalcColumns(row) {
        this.keyColumns.forEach(column => {
            this.checkColumn(row, column);
        });
        this.parentKeyColumns.forEach(column => {
            this.checkColumn(row, column);
        });
        if ((this.parent instanceof qforms.Form) && this.name === 'default') {
            return Promise.each(Object.keys(this.parent.fields), name => {
                var field = this.parent.fields[name];
                if (!field.data['@attributes'].column) {
                    throw new Error('[{fullName}]: no column name'.template({fullName : this.getFullName()}));
                }
                var columnName = field.data['@attributes'].column;
                if (row.hasOwnProperty(columnName)) {
                    if (this.parent instanceof qforms.TableForm && row[columnName] !== null) {
                        row[columnName] = qforms.Helper.escapeHtml(row[columnName]);
                    }
                } else if (field.data['@attributes'].value) {
                    return field.calcValue(row);
                } else {
                    throw new Error('[{fullName}]: need column or value.'.template({fullName : this.getFullName()}));
                }
            });
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    fill(context) {
        //console.log('DataSource.prototype.fill', this.name);
        var start;
        return super.fill(context).then(response => {
            delete response.query;
            delete response.limit;
            response.keyColumns = this.keyColumns;
            if (this.parentKeyColumns.length > 0) {
                response.parentKeyColumns = this.parentKeyColumns;
            }
            response.access = this.getAccessToken(context);
            // if form data source named default then check mode
            if (this.form && this.name === 'default' && context.newMode) {
                response.rows = [];
                return response;
            } else {
                if (this.data['@attributes'].limit) {
                    context.params['offset'] = 0;
                    context.params['limit']  = response.limit = parseInt(this.data['@attributes'].limit);
                }
                start = Date.now();
                return this.select(context).then(rows => {
                    console.log('DataSource.prototype.fill', this.getFullName(), 'select:', Date.now() - start, 'ms');
                    response.rows = rows;
                    return Promise.each(response.rows, row => {
                        return this.checkAndCalcColumns(row);
                    });
                }).then(() => {
                    if (this.name === 'default' && this.form && this.form instanceof qforms.RowForm && response.rows[0]) {
                        this.form.dumpRowToParams(response.rows[0], context.querytime.params);
                    }
                    if (this.data['@attributes'].limit) {
                        if (!this.data['@attributes'].countQuery) {
                            throw new Error('[' + this.getFullName() + ']: countQuery empty.');
                        }
                        start = Date.now();
                        return this.selectCount(context).then(count => {
                            console.log('DataSource.prototype.fill', this.getFullName(),'selectCount:', Date.now() - start, 'ms');
                            response.count = parseInt(count);
                            return response;
                        });
                    } else {
                        return response;
                    }
                });
            }
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    frame(context) {
        var start;
        if (this.data['@attributes'].limit) {
            context.params['limit'] = parseInt(this.data['@attributes'].limit);
        }
        start = Date.now();
        return this.select(context).then(rows => {
            console.log('DataSource.prototype.frame', this.getFullName(), 'select:', Date.now() - start, 'ms');
            return Promise.each(rows, row => {
                return this.checkAndCalcColumns(row);
            }).then(() => {
                var response = {
                    rows: rows
                };
                return Promise.try(() => {
                    if (this.data['@attributes'].limit) {
                        if (!this.data['@attributes'].countQuery) {
                            throw new Error('[' + this.getFullName() + ']: countQuery empty.');
                        }
                        start = Date.now();
                        return this.selectCount(context).then(count => {
                            console.log('DataSource.prototype.frame', this.getFullName(), 'selectCount:', Date.now() - start, 'ms');
                            response.count = parseInt(count);
                        });
                    }
                }).then(() => {
                    return response;
                });
            });
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    async selectCount(context) {
        return [];
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    async select(context) {
        return [];
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    async update(context) {
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    async insert(context) {
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    async delete(context) {
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    getApp() {
        if (this.parent instanceof qforms.Application) {
            return this.parent;
        } else if (this.parent instanceof qforms.Page) {
            return this.parent.parent;
        } else if (this.parent instanceof qforms.Form) {
            return this.parent.parent.parent;
        } else {
            throw new Error('getApp: wrong parent');
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    getRowKeyValues(row) {
        var values = {};
        this.keyColumns.forEach(column => {
            values[column] = row[column];
        });
        return values;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    getKeyValues(key) {
        var arr = JSON.parse(key);
        var row = {};
        for (var i = 0; i < this.keyColumns.length; i++) {
            var column = this.keyColumns[i];
            row[column] = arr[i];
        }
        return row;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    getFullName() {
        if (this.form) {
            return [this.form.page.name, this.form.name, this.name].join('.');
        } else if (this.page) {
            return [this.page.name, this.name].join('.');
        } else {
            return this.name;
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    getParams(context) {
        return this.getApp().getParams(context);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    getAccessToken(context) {
        return {
            select: true,
            insert: true,
            update: true,
            delete: true
        };
    }

}

module.exports = DataSource;