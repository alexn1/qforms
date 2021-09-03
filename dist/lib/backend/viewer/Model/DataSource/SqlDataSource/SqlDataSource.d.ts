import DataSource from '../DataSource';
import Table from '../../Table/Table';
import Context from '../../../../Context';
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
    insert(context: Context, _values?: any): Promise<any>;
    update(context: Context): Promise<any>;
    delete(context: Context): Promise<any>;
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
    static addInsertToResult(result: any, table: any, key: any): void;
    static addInsertExToResult(result: any, table: any, key: any, row: any): void;
    static addUpdateToResult(result: any, table: any, oldKey: any, newKey: any): void;
    static addUpdateExToResult(result: any, table: any, oldKey: any, row: any): void;
    static addDeleteToResult(result: any, table: any, key: any): void;
}
export = SqlDataSource;
