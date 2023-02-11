import { PersistentDataSource, ReadResult } from '../PersistentDataSource';
import { Table } from '../../../Table/Table';
import { Context } from '../../../../../Context';
import { Result } from '../../../../../Result';
import { SqlDatabase } from '../../../Database/SqlDatabase/SqlDatabase';
export declare class SqlDataSource extends PersistentDataSource<SqlDatabase> {
    table: Table;
    constructor(data: any, parent: any);
    fill(context: Context): Promise<any>;
    getKeyColumns(): string[];
    getCountQuery(context: Context): string;
    getSingleQuery(context: Context): string;
    getMultipleQuery(context: Context): string;
    templateQuery(context: Context, _query: string): string;
    getSelectParams(context: Context): any;
    read(context: Context): Promise<ReadResult>;
    create(context: Context, _values?: any): Promise<Result>;
    update(context: Context): Promise<Result>;
    delete(context: Context): Promise<Result>;
    fillAttributes(response: any): void;
    getAutoColumns(): string[];
    getAutoColumnTypes(): {};
    getBuffer(context: Context, file: any): Promise<any>;
}
