import { Pool, PoolClient } from 'pg';
import { SqlDatabase } from '../SqlDatabase';
import { Context } from '../../../../../Context';
import { Row } from '../../../../../types';
export declare class BkPostgreSqlDatabase extends SqlDatabase<PoolClient> {
    pool: Pool | null;
    deinit(): Promise<void>;
    getPool(): Pool;
    static createPool(config: any): Pool;
    connect(context: Context): Promise<void>;
    release(context: Context): Promise<void>;
    queryResult(context: Context, query: string, params?: any): Promise<any>;
    static queryResult(cnn: any, query: string, params?: any): Promise<any>;
    queryRows(context: Context, query: string, params?: any): Promise<Row[]>;
    begin(context: Context): Promise<void>;
    commit(context: Context): Promise<void>;
    rollback(context: Context, err: any): Promise<void>;
    static formatQuery(query: string, params: any): {
        sql: string;
        values: any[];
    };
    getDeleteQuery(tableName: string, rowKeyValues: any): string;
    getUpdateQuery(tableName: string, values: any, where: any): string;
    static getUpdateQuery(tableName: string, values: any, where: any): string;
    getInsertQuery(tableName: string, values: any): string;
    getTableList(): Promise<string[]>;
    getTableInfo(table: string): Promise<{
        name: any;
        type: string;
        key: boolean;
        auto: boolean;
        nullable: boolean;
        comment: any;
        dbType: any;
    }[]>;
    getColumnTypeByDataType(dataType: string): string;
    getTableKeyColumns(table: string): Promise<any[]>;
    query(query: string): Promise<any[]>;
    queryAutoValues(context: Context, table: string, autoColumnTypes: any): Promise<{}>;
    insertRow(context: Context, table: string, values: any, autoColumnTypes?: any): Promise<any>;
    queryScalar(context: Context, query: string, params: any): Promise<any>;
}
