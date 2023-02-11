import { PersistentDataSource } from '../PersistentDataSource';
import { Context } from '../../../../../Context';
import { MongoDbDatabase } from '../../../Database/NoSqlDatabase/MongoDbDatabase/MongoDbDatabase';
import { Table } from '../../../Table/Table';
import { Result } from '../../../../../Result';
export declare class NoSqlDataSource extends PersistentDataSource {
    table: Table;
    constructor(data: any, parent: any);
    fill(context: Context): Promise<any>;
    select(context: Context): Promise<[any[], number | null]>;
    getDatabase(): MongoDbDatabase;
    getSelectQuery(): string;
    getCountQuery(context: Context): string;
    getSelectParams(context: Context): any;
    update(context: Context): Promise<Result>;
}
