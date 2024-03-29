import { Pool, PoolClient } from 'pg';
import { DbConfig } from '../../BkDatabase';
import { BkSqlDatabase } from '../BkSqlDatabase';
import { Context } from '../../../../../Context';
import { Row } from '../../../../../../types';
export declare class BkPostgreSqlDatabase extends BkSqlDatabase<PoolClient> {
    pool: {
        [configString: string]: Pool;
    };
    deinit(): Promise<void>;
    getPool(context: Context): Pool;
    static createPool(config: DbConfig): Pool;
    connect(context: Context): Promise<void>;
    release(context: Context): Promise<void>;
    queryRows(context: Context, query: string, params?: {
        [name: string]: any;
    } | null): Promise<Row[]>;
    queryResult(context: Context, query: string, params?: {
        [name: string]: any;
    } | null): Promise<any>;
    static queryResult(pool: Pool, query: string, params?: {
        [name: string]: any;
    } | null): Promise<any>;
    begin(context: Context): Promise<void>;
    commit(context: Context): Promise<void>;
    rollback(context: Context, err: any): Promise<void>;
    static formatQuery(query: string, params: {
        [name: string]: any;
    } | null): {
        sql: string;
        values: any;
    };
    getDeleteQuery(tableName: string, rowKeyValues: any): string;
    getUpdateQuery(tableName: string, values: any, where: any): string;
    static getUpdateQuery(tableName: string, values: any, where: any): string;
    getInsertQuery(tableName: string, values: any): string;
    getTableList(): Promise<string[]>;
    getTableInfo(table: string): Promise<{
        name: any;
        type: string | null;
        key: boolean;
        auto: boolean;
        nullable: boolean;
        comment: null;
        dbType: any;
    }[]>;
    getColumnTypeByDataType(dataType: string): string | null;
    getTableKeyColumns(table: string): Promise<any[]>;
    query(query: string): Promise<any[]>;
    queryAutoValues(context: Context, table: string, autoColumnTypes: any): Promise<{}>;
    insertRow(context: Context, table: string, values: any, autoColumnTypes?: any): Promise<Row>;
    queryScalar(context: Context, query: string, params: any): Promise<any>;
}
