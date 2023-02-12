import { BkDataSource } from '../DataSource';
import { BkDatabase } from '../../Database/Database';
import { BkTable } from '../../Table/Table';
export declare abstract class BkPersistentDataSource<TDatabase extends BkDatabase = BkDatabase> extends BkDataSource {
    decodeChanges(changes: any): {};
    getValuesFromRow(row: any): {};
    getDatabase(): TDatabase;
    getTable(): BkTable;
}
