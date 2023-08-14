import { BkModel } from '../BkModel';
import { BkParam } from '../BkParam/BkParam';
import { BkApplication } from '../BkApplication/BkApplication';
import { BkTable } from '../BkTable/BkTable';
import { Context } from '../../../Context';
import { Row } from '../../../../types';
import { DatabaseScheme } from '../../../common/Scheme/DatabaseScheme';
export interface DbConfig {
    host: string;
    database: string;
    user: string;
    password: string;
    port?: number;
}
export declare class BkDatabase<TConnection = any> extends BkModel<DatabaseScheme> {
    tables: BkTable[];
    params: BkParam[];
    fillCollections: string[];
    init(context: Context): Promise<void>;
    fillAttributes(response: any): void;
    connect(context: Context): Promise<void>;
    isConnected(context: Context): boolean;
    getConnection(context: Context): TConnection;
    release(context: Context): Promise<void>;
    queryResult(context: Context, query: string, params?: {
        [name: string]: any;
    } | null): Promise<any>;
    queryRows(context: Context, query: string, params?: {
        [name: string]: any;
    } | null): Promise<Row[]>;
    queryScalar(context: Context, query: string, params?: {
        [name: string]: any;
    } | null): Promise<any>;
    begin(context: Context): Promise<void>;
    commit(context: Context): Promise<void>;
    rollback(context: Context, err: any): Promise<void>;
    getDatabaseName(context?: Context): string;
    getConfig(context?: Context): DbConfig;
    getDefaultPort(): number;
    getApp(): BkApplication;
    findTable(name: string): BkTable | undefined;
    findParam(name: string): BkParam | undefined;
    getTable(name: string): BkTable;
    getParam(name: string): BkParam;
    insertRow(context: Context, table: string, values: any, autoColumnTypes?: any): Promise<Row>;
    getTableList(): Promise<string[]>;
    getTableInfo(table: string): Promise<any[]>;
    transaction<TResult = any>(context: Context, cb: () => Promise<TResult>): Promise<TResult>;
    use<TResult = any>(context: Context, cb: (db: BkDatabase) => Promise<TResult>): Promise<TResult>;
}
