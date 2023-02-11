import { DataSource } from '../DataSource';
import { Database } from '../../Database/Database';
export declare class PersistentDataSource<TDatabase extends Database = Database> extends DataSource {
    decodeChanges(changes: any): {};
    getValuesFromRow(row: any): {};
    getDatabase(): TDatabase;
}
