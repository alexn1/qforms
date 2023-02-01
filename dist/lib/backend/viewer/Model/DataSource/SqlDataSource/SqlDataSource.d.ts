import { DataSource } from '../DataSource';
import { Table } from '../../Table/Table';
import { Context } from '../../../../Context';
import { Result } from '../../../../Result';
export declare class SqlDataSource extends DataSource {
    table: Table;
    constructor(data: any, parent: any);
    fill(context: Context): Promise<any>;
    getKeyColumns(): string[];
    getCountQuery(context: Context): string;
    getSingleQuery(context: Context): any;
    getMultipleQuery(context: Context): any;
    templateQuery(context: Context, _query: string): string;
    getSelectParams(context: any): any;
    select(context: Context): Promise<[any[], number | null]>;
    insert(context: Context, _values?: any): Promise<Result>;
    update(context: Context): Promise<Result>;
    delete(context: Context): Promise<Result>;
    fillAttributes(response: any): void;
    getTable(): Table;
    getAutoColumns(): string[];
    getAutoColumnTypes(): {};
    getValuesFromRow(row: any): {};
    decodeChanges(changes: any): {};
    getBuffer(context: Context, file: any): Promise<any>;
}
