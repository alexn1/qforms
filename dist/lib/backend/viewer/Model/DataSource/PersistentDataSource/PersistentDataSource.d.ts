import { DataSource } from '../DataSource';
import { Database } from '../../Database/Database';
import { Table } from '../../Table/Table';
export declare abstract class PersistentDataSource<TDatabase extends Database = Database> extends DataSource {
    decodeChanges(changes: any): {};
    getValuesFromRow(row: any): {};
    getDatabase(): TDatabase;
    getTable(): Table;
}
