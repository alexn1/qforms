import { DataSource } from '../DataSource';
import { Database } from '../../Database/Database';
import { Table } from '../../Table/Table';
import { Context } from '../../../../Context';
export type ReadResult = [any[], number | null];
export declare class PersistentDataSource<TDatabase extends Database = Database> extends DataSource {
    read(context: Context): Promise<ReadResult>;
    decodeChanges(changes: any): {};
    getValuesFromRow(row: any): {};
    getDatabase(): TDatabase;
    getTable(): Table;
}
