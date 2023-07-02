import { BkDataSource } from '../BkDataSource';
import { BkDatabase } from '../../BkDatabase/BkDatabase';
import { BkTable } from '../../BkTable/BkTable';
import { RawRow, ChangesByKey, Key, Row } from '../../../../../types';
import { BkModelScheme } from '../../../../viewer/BkModelData/BkModelData';
import { BkModel } from '../../BkModel';
export declare abstract class BkPersistentDataSource<TDatabase extends BkDatabase = BkDatabase> extends BkDataSource {
    table: BkTable | null;
    constructor(data: BkModelScheme, parent: BkModel);
    decodeChanges(changes: ChangesByKey): Record<Key, any>;
    getValuesFromRow(rawRow: RawRow): Row;
    getDatabase(): TDatabase;
    getTable(): BkTable;
}
