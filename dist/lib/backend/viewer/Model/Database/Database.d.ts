import { Model } from '../Model';
import { Param } from '../Param/Param';
import { Application } from '../Application/Application';
import { Table } from '../Table/Table';
import { Context } from '../../../Context';
interface IConfig {
    host: string;
    database: string;
    user: string;
    password: string;
    port?: number;
}
export declare class Database<TConnection = any> extends Model {
    tables: Table[];
    fillCollections: string[];
    init(context: Context): Promise<void>;
    deinit(): Promise<void>;
    fillAttributes(response: any): void;
    connect(context: Context): Promise<void>;
    getConnection(context: Context): TConnection;
    release(context: Context): Promise<void>;
    queryResult(context: Context, query: string, params?: any): Promise<any>;
    queryRows(context: Context, query: string, params?: any): Promise<any[]>;
    queryScalar(context: Context, query: string, params?: any): Promise<any>;
    begin(context: Context): Promise<void>;
    commit(context: Context): Promise<void>;
    rollback(context: Context, err: any): Promise<void>;
    createParam(name: any): Param;
    getConfig(): IConfig;
    getDefaultPort(): number;
    getApp(): Application;
    findTable(name: string): Table;
    getTable(name: string): Table;
    insertRow(context: Context, table: string, values: any, autoColumnTypes?: any): Promise<void>;
    getTableList(): Promise<string[]>;
    getTableInfo(table: any): Promise<any[]>;
}
export {};
