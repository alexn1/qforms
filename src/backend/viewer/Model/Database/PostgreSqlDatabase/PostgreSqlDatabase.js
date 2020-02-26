'use strict';

var util    = require('util');
var Promise = require('bluebird');
const { Pool } = require('pg');

var qforms    = require('../../../../../qforms');
var Database  = require('../Database');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class PostgreSqlDatabase extends Database {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor(data, parent) {
        super(data, parent);
        console.log('new PostgreSqlDatabase');
        this.pool = null;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static create(data, parent) {
        console.log('PostgreSqlDatabase.create');
        return Promise.resolve(new PostgreSqlDatabase(data, parent));
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async deinit() {
        console.log('PostgreSqlDatabase.prototype.deinit: ' + this.name);
        if (this.pool !== null) {
            return this.pool.end();
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    _getPool(databaseName) {
        console.log('PostgreSqlDatabase.prototype._getPool');
        if (this.pool === null) {
            const config = {
                host       : this.data.params.host['@attributes'].value,
                port       : this.data.params.port ? this.data.params.port['@attributes'].value : 5432,
                user       : this.data.params.user['@attributes'].value,
                database   : this.data.params.database['@attributes'].value,
                password   : this.data.params.password['@attributes'].value,
            };
            console.log('creating connection pool for: ' + databaseName, config);
            this.pool = new Pool(config);
        }
        return this.pool;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getConnection(context) {
        console.log('PostgreSqlDatabase.prototype.getConnection');
        return Promise.try(() => {
            if (context.connections[this.name]) {
                return context.connections[this.name];
            } else {
                return context.connections[this.name] = this._getPool(this.name);
            }
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    query(context, query, params, nest) {
        console.log('PostgreSqlDatabase.prototype.query');
        console.log('query:', query);
        console.log('params:', params);
        // if (process.env.NODE_ENV === 'development') {
        //     console.log('PostgreSqlDatabase.prototype.query', query, params);
        // }
        nest = (nest !== undefined) ? nest : true;
        return this.getConnection(context).then(cnn => {
            const {sql, values} = PostgreSqlDatabase.formatQuery(query, params);
            console.log('sql:', sql);
            console.log('values:', values);
            return cnn.query(sql, values).then(result => {
                for (let i = 0; i < result.rows.length; i++) {
                    PostgreSqlDatabase.checkRow(result.rows[i]);
                }
                // console.log('rows:', result.rows);
                return result.rows;
            });
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static checkRow(row) {
        // console.log('PostgreSqlDatabase.checkRow', row);
        for (const column in row) {
            if (row[column] !== null && /*!Array.isArray(row[column]) &&*/ typeof row[column] === 'object' && !(row[column] instanceof Date)) {
                row[column] = JSON.stringify(row[column], null, 4);
            }
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async beginTransaction(cnn) {
        console.log('PostgreSqlDatabase.prototype.beginTransaction');
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async commit(cnn) {
        console.log('PostgreSqlDatabase.prototype.commit');
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async rollback(cnn, err) {
        console.log('PostgreSqlDatabase.prototype.rollback');
        throw err;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static formatQuery(query, params) {
        console.log(`PostgreSqlDatabase.formatQuery: ${query}`);
        console.log('params:', params);
        if (!params) {
            return {sql: query, values: null};
        }
        const items = query.match(/\{([\w\.@]+)\}/g);
        if (!items) {
            return {sql: query, values: null};
        }
        // console.log('items:', items);
        const usedValues = items.map(str => str.substr(1, str.length-2));
        // console.log('usedValues:', usedValues);
        const keys = Object.keys(params).filter(key => usedValues.indexOf(key) > -1);
        // console.log('keys:', keys);
        const values = keys.map(key => params[key]);
        const sql =  query.replace(/\{([\w\.@]+)\}/g, (text, name) => {
            if (keys.indexOf(name) > -1) {
                return `$${keys.indexOf(name) + 1}`;
            }
            return `{${name}}`;
        });
        return {sql, values};
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async desc(context, table) {
        console.log('PostgreSqlDatabase.prototype.desc', table);
        var desc = {};
        var aiFieldName = 'id';
        var query = `select column_name from INFORMATION_SCHEMA.COLUMNS where table_name = '${table}';`;
        return this.query(context, query, null, true).then(rows => {
            rows.forEach(info => {
                desc[info.column_name] = info;
                // if (info.Extra === 'auto_increment') {
                //     aiFieldName = info.Field;
                // }
            });
            console.log('desc:', desc);
            console.log('aiFieldName:', aiFieldName);
            return [desc, aiFieldName];
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getDeleteQuery(tableName, rowKeyValues) {
        console.log('PostgreSqlDatabase.prototype.getDeleteQuery');
        const keyColumns = Object.keys(rowKeyValues);
        const whereString = keyColumns.map(keyColumn => `"${keyColumn}" = {${keyColumn}}`).join(' and ');
        const query = `delete from "${tableName}" where ${whereString}`;
        console.log('query:', query);
        return query;
    }

}

module.exports = PostgreSqlDatabase;