import { BkDataSource } from '../BkDataSource';
import { BkDatabase } from '../../Database/Database';
import { BkTable } from '../../Table/Table';
import { RawRow, Changes } from '../../../../../types';
export declare abstract class BkPersistentDataSource<TDatabase extends BkDatabase = BkDatabase> extends BkDataSource {
    decodeChanges(changes: Changes): {};
    getValuesFromRow(row: RawRow): {};
    getDatabase(): TDatabase;
    getTable(): BkTable;
}
