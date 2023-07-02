import { BkModel } from '../BkModel';
import { BkParam } from '../BkParam/BkParam';
import { BkApplication } from '../BkApplication/BkApplication';
import { BkTable } from '../BkTable/BkTable';
import { Context } from '../../../Context';
import { Row } from '../../../../types';
import { BkDatabaseData } from '../../BkModelData/BkDatabaseData/BkDatabaseData';
export interface DbConfig {
    host: string;
    database: string;
    user: string;
    password: string;
    port?: number;
}
export declare class BkDatabase<TConnection = any> extends BkModel<BkDatabaseData> {
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
    getTableInfo(table: any): Promise<any[]>;
    useTransaction(context: Context, cb: () => Promise<void>): Promise<void>;
}
