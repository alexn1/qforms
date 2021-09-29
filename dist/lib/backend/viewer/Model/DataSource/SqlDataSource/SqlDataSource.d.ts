import DataSource from '../DataSource';
import Table from '../../Table/Table';
import Context from '../../../../Context';
import Result from "../../../../Result";
declare class SqlDataSource extends DataSource {
    table: Table;
    constructor(data: any, parent: any);
    getKeyColumns(): string[];
    getCountQuery(context: Context): any;
    getSingleQuery(context: Context): any;
    getMultipleQuery(context: Context): any;
    selectSingle(context: Context): Promise<any>;
    selectMultiple(context: Context): Promise<any[]>;
    select(context: Context): Promise<any[]>;
    getBuffer(context: Context, file: any): Promise<any>;
    insert(context: Context, _values?: any): Promise<Result>;
    update(context: Context): Promise<Result>;
    delete(context: Context): Promise<Result>;
    fillAttributes(response: any): void;
    fill(context: Context): Promise<any>;
    getRows(): Promise<any>;
    getTable(): Table;
    getAutoColumns(): string[];
    getAutoColumnTypes(): {};
    getAccess(context: Context): {
        select: boolean;
        insert: boolean;
        update: boolean;
        delete: boolean;
    };
    getValuesFromRow(row: any): {};
    decodeChanges(changes: any): {};
    static addInsertToResult(result: Result, database: string, table: string, key: any): void;
    static addInsertExToResult(result: Result, database: string, table: string, key: any, row: any): void;
    static addUpdateToResult(result: Result, database: string, table: string, oldKey: any, newKey: any): void;
    static addUpdateExToResult(result: Result, database: string, table: string, oldKey: any, row: any): void;
    static addDeleteToResult(result: Result, database: string, table: string, key: any): void;
}
export = SqlDataSource;
