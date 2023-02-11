import { PersistentDataSource, ReadResult } from '../PersistentDataSource';
import { Context } from '../../../../../Context';
import { Table } from '../../../Table/Table';
import { Result } from '../../../../../Result';
import { NoSqlDatabase } from '../../../Database/NoSqlDatabase/NoSqlDatabase';
export declare class NoSqlDataSource extends PersistentDataSource<NoSqlDatabase> {
    table: Table;
    constructor(data: any, parent: any);
    fill(context: Context): Promise<any>;
    read(context: Context): Promise<ReadResult>;
    update(context: Context): Promise<Result>;
    getSelectQuery(): string;
    getCountQuery(context: Context): string;
    getSelectParams(context: Context): any;
}
