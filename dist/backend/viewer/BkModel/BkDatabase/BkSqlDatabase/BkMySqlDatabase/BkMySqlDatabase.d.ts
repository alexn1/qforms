import { Pool, PoolConnection } from 'mysql';
import { BkSqlDatabase } from '../BkSqlDatabase';
import { Context } from '../../../../../Context';
import { Row } from '../../../../../../types';
export declare class BkMySqlDatabase extends BkSqlDatabase<PoolConnection> {
    pool: Pool | null;
    deinit(): Promise<void>;
    getPool(): Pool;
    getConfig(): any;
    static Pool_getConnection(pool: Pool): Promise<PoolConnection>;
    queryRows(context: Context, query: string, params?: {
        [name: string]: any;
    } | null): Promise<Row[]>;
    queryResult(context: Context, query: string, params?: {
        [name: string]: any;
    } | null): Promise<any>;
    _getRows(result: any, fields: any): any[];
    begin(context: Context): Promise<void>;
    commit(context: Context): Promise<void>;
    rollback(context: Context, err: any): Promise<void>;
    static queryFormat(query: string, params?: {}): string;
    static typeCast(field: any, next: any): any;
    getTableList(): Promise<string[]>;
    getTableInfo(table: any): Promise<any[]>;
    getColumnTypeByDataType(dataType: any): string | null;
    insertRow(context: any, table: any, values: any, autoColumnTypes?: {}): Promise<any>;
    connect(context: Context): Promise<void>;
    release(context: Context): Promise<void>;
}
