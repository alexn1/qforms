import { Pool, PoolConnection } from 'mysql';
import { Context } from '../../../../../Context';
import { SqlDatabase } from '../SqlDatabase';
export declare class MySqlDatabase extends SqlDatabase<PoolConnection> {
    pool: Pool;
    deinit(): Promise<void>;
    getPool(): Pool;
    getConfig(): any;
    static Pool_getConnection(pool: Pool): Promise<PoolConnection>;
    queryRows(context: Context, query: string, params?: any): Promise<any[]>;
    queryResult(context: any, query: any, params?: any): Promise<any>;
    _getRows(result: any, fields: any): any[];
    begin(context: Context): Promise<void>;
    commit(context: Context): Promise<void>;
    rollback(context: Context, err: any): Promise<void>;
    static queryFormat(query: string, params?: {}): string;
    static typeCast(field: any, next: any): any;
    getTableList(): Promise<string[]>;
    getTableInfo(table: any): Promise<any[]>;
    getColumnTypeByDataType(dataType: any): string;
    insertRow(context: any, table: any, values: any, autoColumnTypes?: {}): Promise<any>;
    connect(context: Context): Promise<void>;
    release(context: Context): Promise<void>;
}
