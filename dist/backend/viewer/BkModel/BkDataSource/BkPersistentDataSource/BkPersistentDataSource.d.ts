import { BkDataSource } from '../BkDataSource';
import { BkDatabase } from '../../BkDatabase/BkDatabase';
import { BkTable } from '../../BkTable/BkTable';
import { RawRow, ChangesByKey, Key, Row } from '../../../../../types';
export declare abstract class BkPersistentDataSource<TDatabase extends BkDatabase = BkDatabase> extends BkDataSource {
    decodeChanges(changes: ChangesByKey): Record<Key, any>;
    getValuesFromRow(rawRow: RawRow): Row;
    getDatabase(): TDatabase;
    getTable(): BkTable;
}
