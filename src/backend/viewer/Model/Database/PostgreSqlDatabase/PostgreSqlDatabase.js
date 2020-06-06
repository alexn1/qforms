'use strict';

const { Pool, Client } = require('pg');
const Database = require('../Database');

class PostgreSqlDatabase extends Database {
    constructor(data, parent) {
        super(data, parent);
        // console.log('new PostgreSqlDatabase');
        this.pool = null;
    }

    static async create(data, parent) {
        console.log('PostgreSqlDatabase.create');
        return new PostgreSqlDatabase(data, parent);
    }

    async deinit() {
        console.log('PostgreSqlDatabase.deinit: ' + this.name);
        if (this.pool !== null) {
            return this.pool.end();
        }
    }

    _getPool() {
        // console.log('PostgreSqlDatabase._getPool');
        if (this.pool === null) {
            const config = this.getConfig();
            // console.log('creating connection pool for: ' + this.name, config);
            this.pool = new Pool(config);
        }
        return this.pool;
    }

    async getConnection(context) {
        // console.log('PostgreSqlDatabase.getConnection');
        if (context.connections[this.name]) {
            return context.connections[this.name];
        } else {
            return context.connections[this.name] = this._getPool();
        }
    }

    async queryRows(context, query, params) {
        // console.log('PostgreSqlDatabase.queryRows');
        // console.log('query:', query);
        // console.log('params:', params);
        if (process.env.NODE_ENV === 'development') {
            console.log('PostgreSqlDatabase.queryRows', query, params);
        }
        const {sql, values} = PostgreSqlDatabase.formatQuery(query, params);
        // console.log('sql:', sql);
        // console.log('values:', values);
        const cnn = await this.getConnection(context);
        const result = await cnn.query(sql, values);
        // console.log('cnn.query result:', result);
        return result.rows;
    }

    async queryResult(context, query, params) {
        console.log('PostgreSqlDatabase.queryResult', query, params);
        const {sql, values} = PostgreSqlDatabase.formatQuery(query, params);
        // console.log('sql:', sql);
        // console.log('values:', values);
        const cnn = await this.getConnection(context);
        const result = await cnn.query(sql, values);
        // console.log('cnn.query result:', result);
        return result;
    }

    async beginTransaction(cnn) {
        // console.log('PostgreSqlDatabase.beginTransaction');
    }

    async commit(cnn) {
        // console.log('PostgreSqlDatabase.commit');
    }

    async rollback(cnn, err) {
        console.log('PostgreSqlDatabase.rollback');
        throw err;
    }

    static formatQuery(query, params) {
        // console.log(`PostgreSqlDatabase.formatQuery: ${query}`);
        // console.log('params:', params);
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

    getDeleteQuery(tableName, rowKeyValues) {
        console.log('PostgreSqlDatabase.getDeleteQuery');
        const keyColumns = Object.keys(rowKeyValues);
        const whereString = keyColumns.map(keyColumn => `"${keyColumn}" = {${keyColumn}}`).join(' and ');
        const query = `delete from "${tableName}" where ${whereString}`;
        // console.log('query:', query);
        return query;
    }

    getUpdateQuery(tableName, values, where) {
        return PostgreSqlDatabase.getUpdateQuery(tableName, values, where);
    }

    // getUpdateQuery2(tableName, values, where) {
    //     return PostgreSqlDatabase.getUpdateQuery2(tableName, values, where);
    // }

    // static getUpdateQuery(tableName, values, where) {
    //     console.log('PostgreSqlDatabase.getUpdateQuery', tableName);
    //     const valueKeys = Object.keys(values);
    //     const whereKeys = Object.keys(where);
    //     if (valueKeys.length === 0) throw new Error('getUpdateQuery: no values');
    //     if (whereKeys.length === 0) throw new Error('getUpdateQuery: no where');
    //     const valuesString = valueKeys.map(name => `"${name}" = {${name}}`).join(', ');
    //     const whereString = whereKeys.map(name => `"${name}" = {${name}}`).join(' and ');
    //     return `update "${tableName}" set ${valuesString} where ${whereString}`;
    // }

    static getUpdateQuery(tableName, values, where) {
        console.log('PostgreSqlDatabase.getUpdateQuery', tableName);
        const valueKeys = Object.keys(values);
        const whereKeys = Object.keys(where);
        if (valueKeys.length === 0) throw new Error('getUpdateQuery: no values');
        if (whereKeys.length === 0) throw new Error('getUpdateQuery: no where');
        const valuesString = valueKeys.map(name => `"${name}" = {val_${name}}`).join(', ');
        const whereString = whereKeys.map(name => `"${name}" = {key_${name}}`).join(' and ');
        return `update "${tableName}" set ${valuesString} where ${whereString}`;
    }

    getInsertQuery(tableName, values) {
        // console.log('PostgreSqlDatabase.getInsertQuery');
        const columns = Object.keys(values);
        const columnsString = columns.map(column => `"${column}"`).join(', ');
        const valuesString = columns.map(column => `{${column}}`).join(', ');
        const query = `insert into "${tableName}"(${columnsString}) values (${valuesString})`;
        // console.log('query:', query);
        return query;
    }

    async getTableList() {
        console.log('PostgreSqlDatabase.getTableList');
        const config = this.getConfig();
        const client = new Client(config);
        await client.connect();
        const results = await client.query(`select "table_name" from information_schema.tables where table_schema = 'public'`);
        await client.end();
        const tableList = results.rows.map(row => row.table_name);
        console.log('tableList:', tableList);
        return tableList;
    }

    async getTableInfo(table) {
        console.log('PostgreSqlDatabase.getTableInfo');
        const keyColumns = await this.getTableKeyColumns(table);
        console.log('keyColumns:', keyColumns);
        const rows = await this.query2(`select * from INFORMATION_SCHEMA.COLUMNS where table_name = '${table}' order by ordinal_position`);
        console.log('getTableInfo rows:', rows);
        const tableInfo = rows.map(row => ({
            name    : row.column_name,
            type    : this.getColumnTypeByDataType(row.data_type),
            key     : !!keyColumns.find(keyColumn => keyColumn.attname === row.column_name),
            auto    : row.column_default && row.column_default.substr(0, 7) === 'nextval' ? true : false,
            nullable: row.is_nullable === 'YES',
            comment : null,
            dbType  : row.data_type
        }));
        console.log('tableInfo:', tableInfo);
        return tableInfo;
    }

    getColumnTypeByDataType(dataType) {
        switch (dataType) {
            case 'integer':
            case 'numeric':
            case 'bigint':
                return 'number';
            case 'character varying':
            case 'text':
                return 'string';
            case 'json':
            case 'ARRAY':
                return 'object';
            case 'boolean':
                return 'boolean';
            case 'timestamp with time zone':
                return 'date';
            default:
                return null;
        }
    }

    async getTableKeyColumns(table) {
        console.log('PostgreSqlDatabase.getTableKeyColumns');
        const rows = await this.query2(
            `SELECT a.attname, format_type(a.atttypid, a.atttypmod) AS data_type
FROM   pg_index i
JOIN   pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey)
WHERE  i.indrelid = '"${table}"'::regclass AND i.indisprimary;`
        );
        return rows;
    }

    async query2(query) {
        const config = this.getConfig();
        const client = new Client(config);
        await client.connect();
        const results = await client.query(query);
        await client.end();
        return results.rows;
    }

    getDefaultPort() {
        return 5432;
    }
}

module.exports = PostgreSqlDatabase;
