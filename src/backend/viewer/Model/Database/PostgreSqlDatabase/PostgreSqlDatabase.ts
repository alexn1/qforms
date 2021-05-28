const { Pool, Client } = require('pg');
const colors = require('colors');

import Database from '../Database';

class PostgreSqlDatabase extends Database {
    pool: any;
    constructor(data, parent) {
        super(data, parent);
        // console.log('new PostgreSqlDatabase');
        this.pool = null;
    }

    static async create(data, parent) {
        // console.log('PostgreSqlDatabase.create');
        return new PostgreSqlDatabase(data, parent);
    }

    async deinit() {
        console.log('PostgreSqlDatabase.deinit: ' + this.getName());
        if (this.pool !== null) {
            return this.pool.end();
        }
    }

    _getPool() {
        // console.log('PostgreSqlDatabase._getPool');
        if (this.pool === null) {
            const config = this.getConfig();
            // console.log('creating connection pool for: ' + this.getName(), config);
            this.pool = PostgreSqlDatabase.createPool(config);
        }
        return this.pool;
    }

    static createPool(config) {
        return new Pool(config);
    }

    async getConnection(context) {
        // console.log('PostgreSqlDatabase.getConnection');
        const name = this.getName();
        if (context.connections[name]) {
            return context.connections[name];
        } else {
            return context.connections[name] = this._getPool();
        }
    }

    async queryResult(context, query, params = null) {
        console.log(colors.blue('PostgreSqlDatabase.queryResult'), {query, params}/*, params ? Object.keys(params).map(name => typeof params[name]) : null*/);
        Database.checkParams(query, params);
        const {sql, values} = PostgreSqlDatabase.formatQuery(query, params);
        // console.log('sql:', sql);
        // console.log('values:', values);
        const cnn = await this.getConnection(context);
        const result = await cnn.query(sql, values);
        // console.log('cnn.query result:', result);
        return result;
    }

    static async queryResult(cnn, query, params = null) {
        console.log(colors.blue('static PostgreSqlDatabase.queryResult'), {query, params}/*, params ? Object.keys(params).map(name => typeof params[name]) : null*/);
        Database.checkParams(query, params);
        const {sql, values} = PostgreSqlDatabase.formatQuery(query, params);
        // console.log('sql:', sql);
        // console.log('values:', values);
        const result = await cnn.query(sql, values);
        // console.log('cnn.query result:', result);
        return result;
    }

    async queryRows(context, query, params = null): Promise<any[]> {
        // console.log('PostgreSqlDatabase.queryRows'/*, query, params*/);
        const result = await this.queryResult(context, query, params);
        return result.rows;
    }

    async beginTransaction(cnn) {
        // console.log('PostgreSqlDatabase.beginTransaction');
    }

    async commit(cnn) {
        // console.log('PostgreSqlDatabase.commit');
    }

    async rollback(cnn, err) {
        console.log('PostgreSqlDatabase.rollback: ', err.message);
        // throw err;
    }

    static formatQuery(query, params) {
        // console.log(`PostgreSqlDatabase.formatQuery: ${query}`);
        // console.log('params:', params);
        if (!params) {
            return {sql: query, values: null};
        }
        const usedValues = Database.getUsedParams(query);
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

    getDeleteQuery(tableName, rowKeyValues): string {
        // console.log('PostgreSqlDatabase.getDeleteQuery');
        const keyColumns = Object.keys(rowKeyValues);
        const whereString = keyColumns.map(keyColumn => `"${keyColumn}" = {${keyColumn}}`).join(' and ');
        const query = `delete from "${tableName}" where ${whereString}`;
        // console.log('query:', query);
        return query;
    }

    getUpdateQuery(tableName, values, where): string {
        return PostgreSqlDatabase.getUpdateQuery(tableName, values, where);
    }

    static getUpdateQuery(tableName, values, where): string {
        // console.log('PostgreSqlDatabase.getUpdateQuery', tableName, values, where/*, Object.keys(values).map(name => typeof values[name])*/);
        const valueKeys = Object.keys(values);
        const whereKeys = Object.keys(where);
        if (valueKeys.length === 0) throw new Error('getUpdateQuery: no values');
        if (whereKeys.length === 0) throw new Error('getUpdateQuery: no where');
        const valuesString = valueKeys.map(name => `"${name}" = {val_${name}}`).join(', ');
        const whereString = whereKeys.map(name => `"${name}" = {key_${name}}`).join(' and ');
        return `update "${tableName}" set ${valuesString} where ${whereString}`;
    }

    getInsertQuery(tableName, values): string {
        // console.log('PostgreSqlDatabase.getInsertQuery');
        const columns = Object.keys(values);
        if (!columns.length) return `insert into "${tableName}" default values`;
        const columnsString = columns.map(column => `"${column}"`).join(', ');
        const valuesString = columns.map(column => `{${column}}`).join(', ');
        const query = `insert into "${tableName}"(${columnsString}) values (${valuesString})`;
        // console.log('query:', query);
        return query;
    }

    async getTableList(): Promise<string[]> {
        console.log('PostgreSqlDatabase.getTableList');
        const config = this.getConfig();
        const client = new Client(config);
        await client.connect();
        const results = await client.query(
            `select "table_name" from information_schema.tables where table_schema = 'public'`
        );
        await client.end();
        const tableList = results.rows.map(row => row.table_name);
        console.log('tableList:', tableList);
        return tableList;
    }

    async getTableInfo(table) {
        console.log('PostgreSqlDatabase.getTableInfo');
        const keyColumns = await this.getTableKeyColumns(table);
        // console.log('keyColumns:', keyColumns);
        const rows = await this.query(
            `select * from INFORMATION_SCHEMA.COLUMNS where table_name = '${table}' order by ordinal_position`
        );
        // console.log('getTableInfo rows:', rows);
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

    getColumnTypeByDataType(dataType): string {
        switch (dataType) {
            case 'integer':
            case 'numeric':
            case 'bigint':
                return 'number';
            case 'character varying':
            case 'text':
            case 'bytea':
                return 'string';
            case 'json':
            case 'jsonb':
            case 'ARRAY':
                return 'object';
            case 'boolean':
                return 'boolean';
            case 'timestamp with time zone':
            case 'time without time zone':
                return 'date';
            default:
                return null;
        }
    }

    async getTableKeyColumns(table) {
        console.log('PostgreSqlDatabase.getTableKeyColumns');
        const rows = await this.query(
            `SELECT a.attname, format_type(a.atttypid, a.atttypmod) AS data_type
FROM   pg_index i
JOIN   pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey)
WHERE  i.indrelid = '"${table}"'::regclass AND i.indisprimary;`
        );
        return rows;
    }

    async query(query): Promise<any[]> {
        const config = this.getConfig();
        const client = new Client(config);
        await client.connect();
        const results = await client.query(query);
        await client.end();
        return results.rows;
    }

    getDefaultPort(): number {
        return 5432;
    }

    async queryAutoValues(context, table, autoColumns, autoTypes) {
        console.log('PostgreSqlDatabase.queryAutoValues', autoColumns, autoTypes);
        if (!autoColumns.length) throw new Error('no auto columns');
        const queries = autoColumns.map(column => `select currval('"${table}_${column}_seq"')`);
        const query = queries.join('; ');
        // console.log('query:', query);
        const result = await this.queryResult(context, query);
        // console.log('result:', result);
        if (result instanceof Array) {
            return autoColumns.reduce((acc, name, i) => {
                // console.log('name:', name);
                const r = result[i];
                let [{currval: val}] = r.rows;
                if (autoTypes[name] === 'number' && typeof val === 'string') val = Number(val);
                if (typeof val !== autoTypes[name]) throw new Error(`wrong type of auto value: ${typeof val}, should be ${autoTypes[name]}`);
                acc[name] = val;
                return acc;
            }, {});
        } else {

            let [{currval: val}] = result.rows;
            const name = autoColumns[0];
            if (autoTypes[name] === 'number' && typeof val === 'string') val = Number(val);
            if (typeof val !== autoTypes[name]) throw new Error(`wrong type of auto value: ${typeof val}, should be ${autoTypes[name]}`);
            return {[name]: val};
        }
    }

    async insertRow(context, table, autoColumns, values, autoTypes) {
        console.log(`PostgreSqlDatabase.insertRow ${table}`, autoColumns, values, autoTypes);
        const query = this.getInsertQuery(table, values);
        // console.log('insert query:', query, values);

        const result = await this.queryResult(context, query,  values);
        // console.log('insert result:', result);

        // auto
        if (autoColumns.length > 0) {
            const auto = await this.queryAutoValues(context, table, autoColumns, autoTypes);
            console.log('auto:', auto);
            return {
                ...auto,
                ...values
            };
        }
        return {
            ...values
        };
    }


}

export = PostgreSqlDatabase;
