import { BkDataSource } from '../DataSource';
import { Database } from '../../Database/Database';
import { BkTable } from '../../Table/Table';
export declare abstract class BkPersistentDataSource<TDatabase extends Database = Database> extends BkDataSource {
    decodeChanges(changes: any): {};
    getValuesFromRow(row: any): {};
    getDatabase(): TDatabase;
    getTable(): BkTable;
}
