import Context from "../../../../Context";
import Database from '../Database';
declare class MySqlDatabase extends Database {
    pool: any;
    constructor(data: any, parent?: any);
    deinit(): Promise<void>;
    getPool(): any;
    getConfig(): any;
    static Pool_getConnection(pool: any): Promise<any>;
    queryRows(context: any, query: any, params: any): Promise<any[]>;
    queryResult(context: any, query: any, params?: any): Promise<any>;
    _getRows(result: any, fields: any): any[];
    begin(context: Context): Promise<void>;
    commit(context: Context): Promise<void>;
    rollback(context: Context, err: any): Promise<void>;
    static queryFormat(query: any, params?: {}): string;
    static typeCast(field: any, next: any): any;
    getTableList(): Promise<string[]>;
    getTableInfo(table: any): Promise<any[]>;
    getColumnTypeByDataType(dataType: any): string;
    insertRow(context: any, table: any, values: any, autoColumnTypes?: {}): Promise<any>;
    connect(context: Context): Promise<void>;
    release(context: Context): void;
}
export = MySqlDatabase;
