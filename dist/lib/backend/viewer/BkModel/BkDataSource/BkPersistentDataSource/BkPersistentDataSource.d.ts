import { BkDataSource } from '../BkDataSource';
import { BkDatabase } from '../../BkDatabase/BkDatabase';
import { BkTable } from '../../Table/Table';
import { RawRow, ChangesByKey } from '../../../../../types';
export declare abstract class BkPersistentDataSource<TDatabase extends BkDatabase = BkDatabase> extends BkDataSource {
    decodeChanges(changes: ChangesByKey): {};
    getValuesFromRow(row: RawRow): {};
    getDatabase(): TDatabase;
    getTable(): BkTable;
}
