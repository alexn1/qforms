import { PersistentDataSource } from '../PersistentDataSource';
import { Context } from '../../../../../Context';
import { Table } from '../../../Table/Table';
import { Result } from '../../../../../Result';
import { NoSqlDatabase } from '../../../Database/NoSqlDatabase/NoSqlDatabase';
export declare class NoSqlDataSource extends PersistentDataSource<NoSqlDatabase> {
    table: Table;
    constructor(data: any, parent: any);
    fill(context: Context): Promise<any>;
    select(context: Context): Promise<[any[], number | null]>;
    getSelectQuery(): string;
    getCountQuery(context: Context): string;
    getSelectParams(context: Context): any;
    update(context: Context): Promise<Result>;
}
