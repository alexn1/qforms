import { Model } from '../Model';
import { Param } from '../Param/Param';
import { Application } from '../Application/Application';
import { Table } from '../Table/Table';
import { Context } from '../../../Context';
export declare class Database extends Model {
    tables: Table[];
    fillCollections: string[];
    init(context: Context): Promise<void>;
    deinit(): Promise<void>;
    fillAttributes(response: any): void;
    connect(context: Context): Promise<void>;
    getConnection(context: Context): any;
    release(context: Context): Promise<void>;
    queryResult(context: any, query: any, params?: any): Promise<void>;
    queryRows(context: Context, query: string, params?: any): Promise<any[]>;
    queryScalar(context: Context, query: string, params?: any): Promise<any>;
    begin(context: Context): Promise<void>;
    commit(context: Context): Promise<void>;
    rollback(context: Context, err: any): Promise<void>;
    getUpdateQuery(tableName: any, values: any, where: any): string;
    getInsertQuery(tableName: any, values: any): string;
    getDeleteQuery(tableName: any, rowKeyValues: any): string;
    createParam(name: any): Param;
    getConfig(): any;
    getDefaultPort(): number;
    getApp(): Application;
    findTable(name: any): Table;
    getTable(name: any): Table;
    static getUsedParams(query: any): any;
    static checkParams(query: any, params: any): void;
    insertRow(context: Context, table: string, values: any, autoColumnTypes?: any): Promise<void>;
    getTableList(): Promise<string[]>;
    getTableInfo(table: any): Promise<any[]>;
}
