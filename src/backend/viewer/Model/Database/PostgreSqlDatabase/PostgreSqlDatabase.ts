const { Pool, Client } = require('pg');
const colors = require('colors');

import Database from '../Database';
import Context from '../../../../Context';

class PostgreSqlDatabase extends Database {
    pool: any;
    constructor(data, parent?) {
        super(data, parent);
        // console.log('new PostgreSqlDatabase');
        this.pool = null;
    }

    /*static async create(data, parent) {
        // console.log('PostgreSqlDatabase.create');
        return new PostgreSqlDatabase(data, parent);
    }*/

    async deinit() {
        console.log('PostgreSqlDatabase.deinit: ' + this.getName());
        if (this.pool !== null) {
            return this.pool.end();
        }
    }

    getPool() {
        // console.log('PostgreSqlDatabase.getPool');
        if (this.pool === null) {
            const config = this.getConfig();
            // console.log('creating connection pool for: ' + this.getName(), config);
            this.pool = PostgreSqlDatabase.createPool(config);
        }
        return this.pool;
    }

    static createPool(config: any) {
        return new Pool(config);
    }

    async connect(context: Context): Promise<void> {
        console.log('PostgreSqlDatabase.connect', this.getName());
        const name = this.getName();
        if (context.connections[name]) {
            throw new Error(`already connected: ${name}`);
        }
        context.connections[name] = await this.getPool().connect();
    }

    getConnection(context: Context): any {
        // console.log('PostgreSqlDatabase.getConnection');
        const name = this.getName();
        if (!context.connections[name]) {
            throw new Error(`not connected: ${name}`);
        }
        return context.connections[name];
    }

    release(context: Context): void {
        console.log('PostgreSqlDatabase.release', this.getName());
        this.getConnection(context).release();
        context.connections[this.getName()] = null;
    }

    async queryResult(context: Context, query: string, params: any = null) {
        if (context.query.sql) console.log(colors.blue('PostgreSqlDatabase.queryResult'), {query, params}/*, params ? Object.keys(params).map(name => typeof params[name]) : null*/);
        Database.checkParams(query, params);
        const {sql, values} = PostgreSqlDatabase.formatQuery(query, params);
        // console.log('sql:', sql);
        // console.log('values:', values);
        const result = await this.getConnection(context).query(sql, values);
        // console.log('cnn.query result:', result);
        return result;
    }

    static async queryResult(cnn, query: string, params: any = null) {
        console.log(colors.blue('static PostgreSqlDatabase.queryResult'), {query, params}/*, params ? Object.keys(params).map(name => typeof params[name]) : null*/);
        Database.checkParams(query, params);
        const {sql, values} = PostgreSqlDatabase.formatQuery(query, params);
        // console.log('sql:', sql);
        // console.log('values:', values);
        const result = await cnn.query(sql, values);
        // console.log('cnn.query result:', result);
        return result;
    }

    async queryRows(context: Context, query: string, params: any = null): Promise<any[]> {
        // console.log('PostgreSqlDatabase.queryRows'/*, query, params*/);
        const result = await this.queryResult(context, query, params);
        return result.rows;
    }

    async beginTransaction(context: Context): Promise<void> {
        console.log('PostgreSqlDatabase.beginTransaction');
        await this.getConnection(context).query('begin');
    }

    async commit(context): Promise<void> {
        console.log('PostgreSqlDatabase.commit');
        await this.getConnection(context).query('commit');
    }

    async rollback(context, err): Promise<void> {
        console.log('PostgreSqlDatabase.rollback: ', err.message);
        await this.getConnection(context).query('rollback');
    }

    static formatQuery(query: string, params: any) {
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

    getDeleteQuery(tableName: string, rowKeyValues: any): string {
        // console.log('PostgreSqlDatabase.getDeleteQuery');
        const keyColumns = Object.keys(rowKeyValues);
        const whereString = keyColumns.map(keyColumn => `"${keyColumn}" = {${keyColumn}}`).join(' and ');
        const query = `delete from "${tableName}" where ${whereString}`;
        // console.log('query:', query);
        return query;
    }

    getUpdateQuery(tableName: string, values: any, where: any): string {
        return PostgreSqlDatabase.getUpdateQuery(tableName, values, where);
    }

    static getUpdateQuery(tableName: string, values: any, where: any): string {
        // console.log('PostgreSqlDatabase.getUpdateQuery', tableName, values, where/*, Object.keys(values).map(name => typeof values[name])*/);
        const valueKeys = Object.keys(values);
        const whereKeys = Object.keys(where);
        if (valueKeys.length === 0) throw new Error('getUpdateQuery: no values');
        if (whereKeys.length === 0) throw new Error('getUpdateQuery: no where');
        const valuesString = valueKeys.map(name => `"${name}" = {val_${name}}`).join(', ');
        const whereString = whereKeys.map(name => `"${name}" = {key_${name}}`).join(' and ');
        return `update "${tableName}" set ${valuesString} where ${whereString}`;
    }

    getInsertQuery(tableName: string, values: any): string {
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
        const rows = await this.query(
            `select "table_name" from information_schema.tables where table_schema = 'public'`
        );
        const tableList = rows.map(row => row.table_name);
        // console.log('tableList:', tableList);
        return tableList;
    }

    async getTableInfo(table: string) {
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
        // console.log('tableInfo:', tableInfo);
        return tableInfo;
    }

    getColumnTypeByDataType(dataType: string): string {
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

    async getTableKeyColumns(table: string) {
        console.log('PostgreSqlDatabase.getTableKeyColumns');
        const rows = await this.query(
            `SELECT a.attname, format_type(a.atttypid, a.atttypmod) AS data_type
FROM   pg_index i
JOIN   pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey)
WHERE  i.indrelid = '"${table}"'::regclass AND i.indisprimary;`
        );
        return rows;
    }

    async query(query: string): Promise<any[]> {
        const config = this.getConfig();
        const client = new Client(config);
        await client.connect();
        const results = await client.query(query);
        await client.end();
        return results.rows;
    }

    /*getDefaultPort(): number {
        return 5432;
    }*/

    async queryAutoValues(context: Context, table: string, autoColumnTypes: any) {
        console.log('PostgreSqlDatabase.queryAutoValues', autoColumnTypes);
        const autoColumns = Object.keys(autoColumnTypes);
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
                if (autoColumnTypes[name] === 'number' && typeof val === 'string') val = Number(val);
                if (typeof val !== autoColumnTypes[name]) throw new Error(`wrong type of auto value: ${typeof val}, should be ${autoColumnTypes[name]}`);
                acc[name] = val;
                return acc;
            }, {});
        } else {
            let [{currval: val}] = result.rows;
            const name = autoColumns[0];
            if (autoColumnTypes[name] === 'number' && typeof val === 'string') val = Number(val);
            if (typeof val !== autoColumnTypes[name]) throw new Error(`wrong type of auto value: ${typeof val}, should be ${autoColumnTypes[name]}`);
            return {[name]: val};
        }
    }

    async insertRow(context: Context, table: string, values: any, autoColumnTypes: any = {}) {
        console.log(`PostgreSqlDatabase.insertRow ${table}`, values, autoColumnTypes);
        const query = this.getInsertQuery(table, values);
        // console.log('insert query:', query, values);
        const result = await this.queryResult(context, query,  values);
        // console.log('insert result:', result);

        // auto
        if (Object.keys(autoColumnTypes).length > 0) {
            const auto = await this.queryAutoValues(context, table, autoColumnTypes);
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
