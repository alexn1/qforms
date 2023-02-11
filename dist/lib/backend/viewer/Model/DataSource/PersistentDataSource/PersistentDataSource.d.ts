import { DataSource } from '../DataSource';
import { Database } from '../../Database/Database';
import { Table } from '../../Table/Table';
import { Context } from '../../../../Context';
export type SelectResult = [any[], number | null];
export declare class PersistentDataSource<TDatabase extends Database = Database> extends DataSource {
    select(context: Context): Promise<SelectResult>;
    decodeChanges(changes: any): {};
    getValuesFromRow(row: any): {};
    getDatabase(): TDatabase;
    getTable(): Table;
}
