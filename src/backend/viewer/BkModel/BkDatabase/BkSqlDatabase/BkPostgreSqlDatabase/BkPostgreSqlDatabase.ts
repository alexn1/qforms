import colors from 'colors';
import { Pool, Client, PoolClient } from 'pg';

import { DbConfig } from '../../BkDatabase';
import { BkSqlDatabase } from '../BkSqlDatabase';
import { Context } from '../../../../../Context';
import { Row } from '../../../../../../types';
import { debug } from '../../../../../../console';

export class BkPostgreSqlDatabase extends BkSqlDatabase<PoolClient> {
    pool: { [configString: string]: Pool } = {};
    /* constructor(data, parent?) {
        debug('new PostgreSqlDatabase');
        super(data, parent);
    } */

    /* static async create(data, parent) {
        // debug('PostgreSqlDatabase.create');
        return new PostgreSqlDatabase(data, parent);
    } */

    async deinit(): Promise<void> {
        debug(`PostgreSqlDatabase.deinit: ${this.getName()}`);
        await super.deinit();

        for (const configString in this.pool) {
            const pool = this.pool[configString];
            debug('ending pool:', configString, pool.totalCount);
            await pool.end();
            debug('pool ended');
        }
        this.pool = {};
    }

    getPool(context: Context): Pool {
        // debug('PostgreSqlDatabase.getPool');
        const config = this.getConfig(context);
        const configString = JSON.stringify(config);
        if (!this.pool[configString]) {
            debug(`creating connection pool for ${this.getName()}(${configString})`);
            this.pool[configString] = BkPostgreSqlDatabase.createPool(config);
        }
        return this.pool[configString];
    }

    static createPool(config: DbConfig): Pool {
        return new Pool(config);
    }

    async connect(context: Context): Promise<void> {
        debug('PostgreSqlDatabase.connect', this.getName());
        if (!context) throw new Error('no context');
        this.checkDeinited();
        const name = this.getName();
        if (context.connections[name]) {
            throw new Error(`already connected: ${name}`);
        }
        const pool = this.getPool(context);
        context.connections[name] = await pool.connect();
    }

    async release(context: Context): Promise<void> {
        debug('PostgreSqlDatabase.release', this.getName());
        if (!context) throw new Error('no context');
        this.getConnection(context).release();
        context.connections[this.getName()] = null;
    }

    async queryRows(
        context: Context,
        query: string,
        params: { [name: string]: any } | null = null,
    ): Promise<Row[]> {
        // debug('PostgreSqlDatabase.queryRows', colors.bgGreen(colors.white(query)), params);
        const result = await this.queryResult(context, query, params);
        return result.rows;
    }

    async queryResult(
        context: Context,
        query: string,
        params: { [name: string]: any } | null = null,
    ): Promise<any> {
        // if (context.getReq() && context.getQuery().sql) {
        debug(
            'PostgreSqlDatabase.queryResult',
            colors.bgGreen(colors.white(query)),
            params,
            /* , params ? Object.keys(params).map(name => typeof params[name]) : null */
        );
        // }
        BkSqlDatabase.checkParams(query, params);
        const { sql, values } = BkPostgreSqlDatabase.formatQuery(query, params);
        // if (context.getReq() && context.getQuery().sql) {
        debug('sql:', colors.bgBlue(colors.white(sql)));
        debug('values:', values);
        // }
        const result = await this.getConnection(context).query(sql, values);
        // debug('cnn.query result:', result);
        return result;
    }

    static async queryResult(
        pool: Pool,
        query: string,
        params: { [name: string]: any } | null = null,
    ): Promise<any> {
        debug(
            colors.blue('static PostgreSqlDatabase.queryResult'),
            query /*, params*/ /*, params ? Object.keys(params).map(name => typeof params[name]) : null*/,
        );
        BkSqlDatabase.checkParams(query, params);
        const { sql, values } = BkPostgreSqlDatabase.formatQuery(query, params);
        // debug('sql:', sql);
        // debug('values:', values);
        const result = await pool.query(sql, values);
        // debug('cnn.query result:', result);
        return result;
    }

    async begin(context: Context): Promise<void> {
        debug('PostgreSqlDatabase.begin', this.getName());
        if (!context) throw new Error('no context');
        await this.getConnection(context).query('begin');
    }

    async commit(context: Context): Promise<void> {
        debug('PostgreSqlDatabase.commit', this.getName());
        if (!context) throw new Error('no context');
        await this.getConnection(context).query('commit');
    }

    async rollback(context: Context, err): Promise<void> {
        debug(colors.red('PostgreSqlDatabase.rollback: '), this.getName(), err.message);
        if (!context) throw new Error('no context');
        await this.getConnection(context).query('rollback');
    }

    static formatQuery(
        query: string,
        params: { [name: string]: any } | null,
    ): { sql: string; values: any } {
        // debug(`BkPostgreSqlDatabase.formatQuery: ${query}`);
        // debug('params:', params);
        if (!params) {
            return { sql: query, values: null };
        }
        const usedValues = BkSqlDatabase.getUsedParams(query);
        // debug('usedValues:', usedValues);
        const keys = Object.keys(params).filter((key) => usedValues.indexOf(key) > -1);
        // debug('keys:', keys);
        const values = keys.map((key) => params[key]);
        const sql = query.replace(/\{([\w\.@]+)\}/g, (text, name) => {
            if (keys.indexOf(name) > -1) {
                return `$${keys.indexOf(name) + 1}`;
            }
            return text;
        });
        return { sql, values };
    }

    getDeleteQuery(tableName: string, rowKeyValues: any): string {
        // debug('PostgreSqlDatabase.getDeleteQuery');
        const keyColumns = Object.keys(rowKeyValues);
        const whereString = keyColumns
            .map((keyColumn) => `"${keyColumn}" = {${keyColumn}}`)
            .join(' and ');
        const query = `delete from "${tableName}" where ${whereString}`;
        // debug('query:', query);
        return query;
    }

    getUpdateQuery(tableName: string, values: any, where: any): string {
        return BkPostgreSqlDatabase.getUpdateQuery(tableName, values, where);
    }

    static getUpdateQuery(tableName: string, values: any, where: any): string {
        // debug('PostgreSqlDatabase.getUpdateQuery', tableName, values, where/*, Object.keys(values).map(name => typeof values[name])*/);
        const valueKeys = Object.keys(values);
        const whereKeys = Object.keys(where);
        if (valueKeys.length === 0) throw new Error('getUpdateQuery: no values');
        if (whereKeys.length === 0) throw new Error('getUpdateQuery: no where');
        const valuesString = valueKeys.map((name) => `"${name}" = {val_${name}}`).join(', ');
        const whereString = whereKeys.map((name) => `"${name}" = {key_${name}}`).join(' and ');
        return `update "${tableName}" set ${valuesString} where ${whereString}`;
    }

    getInsertQuery(tableName: string, values: any): string {
        // debug('PostgreSqlDatabase.getInsertQuery');
        const columns = Object.keys(values);
        if (!columns.length) return `insert into "${tableName}" default values`;
        const columnsString = columns.map((column) => `"${column}"`).join(', ');
        const valuesString = columns.map((column) => `{${column}}`).join(', ');
        const query = `insert into "${tableName}"(${columnsString}) values (${valuesString})`;
        // debug('query:', query);
        return query;
    }

    async getTableList(): Promise<string[]> {
        debug('PostgreSqlDatabase.getTableList');
        const rows = await this.query(
            `select "table_name" from information_schema.tables where table_schema = 'public'`,
        );
        const tableList = rows.map((row) => row.table_name);
        // debug('tableList:', tableList);
        return tableList;
    }

    async getTableInfo(table: string) {
        debug('PostgreSqlDatabase.getTableInfo');
        const keyColumns = await this.getTableKeyColumns(table);
        // debug('keyColumns:', keyColumns);
        const rows = await this.query(
            `select * from INFORMATION_SCHEMA.COLUMNS where table_name = '${table}' order by ordinal_position`,
        );
        // debug('getTableInfo rows:', rows);
        const tableInfo = rows.map((row) => ({
            name: row.column_name,
            type: this.getColumnTypeByDataType(row.data_type),
            key: !!keyColumns.find((keyColumn) => keyColumn.attname === row.column_name),
            auto:
                row.column_default && row.column_default.substr(0, 7) === 'nextval' ? true : false,
            nullable: row.is_nullable === 'YES',
            comment: null,
            dbType: row.data_type,
        }));
        // debug('tableInfo:', tableInfo);
        return tableInfo;
    }

    getColumnTypeByDataType(dataType: string): string | null {
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
            case 'timestamp without time zone':
                return 'date';
            default:
                return null;
        }
    }

    async getTableKeyColumns(table: string) {
        debug('PostgreSqlDatabase.getTableKeyColumns');
        const rows = await this.query(
            `SELECT a.attname, format_type(a.atttypid, a.atttypmod) AS data_type
FROM   pg_index i
JOIN   pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey)
WHERE  i.indrelid = '"${table}"'::regclass AND i.indisprimary;`,
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

    /* getDefaultPort(): number {
        return 5432;
    } */

    async queryAutoValues(context: Context, table: string, autoColumnTypes: any) {
        debug('PostgreSqlDatabase.queryAutoValues', autoColumnTypes);
        const autoColumns = Object.keys(autoColumnTypes);
        if (!autoColumns.length) throw new Error('no auto columns');
        const queries = autoColumns.map((column) => `select currval('"${table}_${column}_seq"')`);
        const query = queries.join('; ');
        // debug('query:', query);
        const result = await this.queryResult(context, query);
        // debug('result:', result);
        if (result instanceof Array) {
            return autoColumns.reduce((acc, name, i) => {
                // debug('name:', name);
                const r = result[i];
                let [{ currval: val }] = r.rows;
                if (autoColumnTypes[name] === 'number' && typeof val === 'string')
                    val = Number(val);
                if (typeof val !== autoColumnTypes[name])
                    throw new Error(
                        `wrong type of auto value: ${typeof val}, should be ${
                            autoColumnTypes[name]
                        }`,
                    );
                acc[name] = val;
                return acc;
            }, {});
        } else {
            let [{ currval: val }] = result.rows;
            const name = autoColumns[0];
            if (autoColumnTypes[name] === 'number' && typeof val === 'string') val = Number(val);
            if (typeof val !== autoColumnTypes[name])
                throw new Error(
                    `wrong type of auto value: ${typeof val}, should be ${autoColumnTypes[name]}`,
                );
            return { [name]: val };
        }
    }

    async insertRow(
        context: Context,
        table: string,
        values: any,
        autoColumnTypes: any = {},
    ): Promise<Row> {
        debug(`PostgreSqlDatabase.insertRow ${table}`, values, autoColumnTypes);
        const query = this.getInsertQuery(table, values);
        // debug('insert query:', query, values);
        const result = await this.queryResult(context, query, values);
        // debug('insert result:', result);

        // auto
        if (Object.keys(autoColumnTypes).length > 0) {
            const auto = await this.queryAutoValues(context, table, autoColumnTypes);
            debug('auto:', auto);
            return {
                ...auto,
                ...values,
            };
        }
        return {
            ...values,
        };
    }

    async queryScalar(context: Context, query: string, params): Promise<any> {
        const rows = await this.queryRows(context, query, params);
        const row = rows[0];
        if (!row) throw new Error('queryScalar must return one row');
        const [column] = Object.keys(row);
        if (!column) throw new Error('no column in result set');
        const value = row[column];
        if (value === undefined) throw new Error('scalar value undefined');
        return value;
    }
}
