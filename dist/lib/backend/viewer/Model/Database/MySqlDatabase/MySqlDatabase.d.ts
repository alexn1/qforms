import Database from '../Database';
declare class MySqlDatabase extends Database {
    pool: any;
    constructor(data: any, parent?: any);
    deinit(): Promise<void>;
    getPool(): any;
    getConfig(): any;
    getConnection(context: any): Promise<any>;
    queryRows(context: any, query: any, params: any): Promise<any[]>;
    queryResult(context: any, query: any, params?: any): Promise<any>;
    _getRows(result: any, fields: any): any[];
    begin(cnn: any): Promise<void>;
    commit(cnn: any): Promise<void>;
    rollback(cnn: any, err: any): Promise<void>;
    static queryFormat(query: any, params?: {}): string;
    static typeCast(field: any, next: any): any;
    getTableList(): Promise<string[]>;
    getTableInfo(table: any): Promise<unknown>;
    getColumnTypeByDataType(dataType: any): string;
    insertRow(context: any, table: any, values: any, autoColumnTypes?: {}): Promise<any>;
}
export = MySqlDatabase;
