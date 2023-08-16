import { BkDataSource } from '../BkDataSource';
import { BkDatabase } from '../../BkDatabase/BkDatabase';
import { BkTable } from '../../BkTable/BkTable';
import { RawRow, ChangesByKey, Key, Row } from '../../../../../types';
import { BkModel } from '../../BkModel';
import { Context } from '../../../../Context';
import { DataSourceScheme } from '../../../../common/Scheme/DataSourceScheme';
export declare abstract class BkPersistentDataSource<TDatabase extends BkDatabase = BkDatabase> extends BkDataSource {
    table: BkTable | null;
    constructor(data: DataSourceScheme, parent: BkModel);
    getChanges(context: Context): Record<Key, any>;
    decodeChanges(changes: ChangesByKey): Record<Key, any>;
    decodeRow(rawRow: RawRow): Row;
    getDatabase(): TDatabase;
    getTable(): BkTable;
}
