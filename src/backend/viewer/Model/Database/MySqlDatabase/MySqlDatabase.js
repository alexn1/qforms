'use strict';

var util    = require('util');
var Promise = require('bluebird');
var mysql   = require('mysql');

var Database  = require('../Database');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class MySqlDatabase extends Database {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor(data, parent) {
        super(data, parent);
        var self = this;
        //console.log('new MySqlDatabase');
        self.pool = null;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static async create(data, parent) {
        //console.log('MySqlDatabase.create');
        return new MySqlDatabase(data, parent);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async deinit() {
        var self = this;
        console.log('MySqlDatabase.prototype.deinit: ' + self.name);
        if (self.pool !== null) {
            return new Promise(resolve => {
                self.pool.end(() => {
                    resolve();
                });
            });
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    _getPool() {
        var self = this;
        //console.log('MySqlDatabase.prototype._getPool');
        if (self.pool === null) {
            //console.log('creating connection pool for: ' + database);
            self.pool = mysql.createPool({
                host       : self.data.params.host['@attributes'].value,
                port       : self.data.params.port ? self.data.params.port['@attributes'].value : 3306,
                user       : self.data.params.user['@attributes'].value,
                database   : self.data.params.database['@attributes'].value,
                password   : self.data.params.password['@attributes'].value,
                queryFormat: MySqlDatabase.queryFormat
            });
        }
        //console.log('pool connections count: ' + this.pool._allConnections.length);
        return self.pool;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getConnection(context) {
        var self = this;
        //console.log('MySqlDatabase.prototype.getConnection');
        return new Promise((resolve, reject) => {
            if (context.connections[self.name] === undefined) {
                self._getPool().getConnection((err, cnn) => {
                    if (err) {
                        reject(err);
                    } else {
                        context.connections[self.name] = cnn;
                        resolve(context.connections[self.name]);
                    }
                });
            } else {
                resolve(context.connections[self.name]);
            }
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    query(context, query, params, nest) {
        var self = this;
        //if (process.env.NODE_ENV === 'development') {
        //    console.log('MySqlDatabase.prototype.query', query, params);
        //}
        nest = (nest !== undefined) ? nest : true;
        return self.getConnection(context).then(cnn => {
            return new Promise((resolve, reject) => {
                cnn.query({sql: query, typeCast: MySqlDatabase.typeCast, nestTables: nest}, params, (err, result, fields) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (nest) {
                            var rows = self._getRows(result, fields);   // for duplicate column names
                            resolve(rows);
                        } else {
                            resolve(result);
                        }
                    }
                });
            });
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    _getRows(result, fields) {
        var self = this;
        //console.log('MySqlDatabase.prototype._getRows');
        var fieldCount = {};
        for (var j = 0; j < fields.length; j++) {
            var f = fields[j];
            if (!fieldCount[f.name]) {
                fieldCount[f.name] = 0;
            }
            fieldCount[f.name]++;
            f.numb = fieldCount[f.name] - 1;
        }
        var rows = [];
        for (var i = 0; i < result.length; i++) {
            var r = result[i];
            var row = {};
            for (var j=0; j < fields.length; j++) {
                var f = fields[j];
                var column = f.name + (f.numb > 0 ? f.numb : '');
                row[column] = r[f.table][f.name];
            }
            rows.push(row);
        }
        return rows;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    beginTransaction(cnn) {
        console.log('MySqlDatabase.prototype.beginTransaction');
        return new Promise((resolve, reject) => {
            cnn.beginTransaction(err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    commit(cnn) {
        console.log('MySqlDatabase.prototype.commit');
        return new Promise((resolve, reject) => {
            cnn.commit(err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    rollback(cnn, err) {
        console.log('MySqlDatabase.prototype.rollback');
        return new Promise((resolve, reject) => {
            cnn.rollback(() => {
                reject(err);
            });
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static queryFormat(query, params) {
        params = params || {};
        var sql = query.replace(/\{([\w\.@]+)\}/g, (text, name) => {
            if (params.hasOwnProperty(name)) {
                return mysql.escape(params[name]);
            } else {
                return 'NULL';
            }
        });
        //console.log('real db sql: ' + sql);
        return sql;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static typeCast(field, next) {
        if (
            field.type === 'DATE'      ||
            field.type === 'DATETIME'  ||
            field.type === 'TIME'      ||
            field.type === 'TIMESTAMP'
        ) {
            return field.string();
        } else {
            return next();
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async desc(context, table) {
        var self = this;
        console.log('MySqlDatabase.prototype.desc', table);
        var desc = {};
        var aiFieldName;
        var query = 'desc `{table}`'.replace('{table}', table);
        return self.query(context, query, null, true).then(rows => {
            rows.forEach(info => {
                desc[info.Field] = info;
                if (info.Extra === 'auto_increment') {
                    aiFieldName = info.Field;
                }
            });
            //console.log('desc:', desc);
            //console.log('aiFieldName:', aiFieldName);
            return [desc, aiFieldName];
        });
    }

}

module.exports = MySqlDatabase;