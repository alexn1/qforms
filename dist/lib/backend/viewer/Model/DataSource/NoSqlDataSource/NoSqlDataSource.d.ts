import { DataSource } from '../DataSource';
import { Context } from '../../../../Context';
import { MongoDbDatabase } from '../../Database/MongoDbDatabase/MongoDbDatabase';
import { Table } from '../../Table/Table';
export declare class NoSqlDataSource extends DataSource {
    table: Table;
    constructor(data: any, parent: any);
    fill(context: Context): Promise<any>;
    select(context: Context): Promise<[any[], number | null]>;
    getDatabase(): MongoDbDatabase;
    getSelectQuery(): string;
    getCountQuery(context: Context): string;
}
