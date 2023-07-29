import { BkDataSource } from '../BkDataSource';
import { BkDatabase } from '../../BkDatabase/BkDatabase';
import { BkTable } from '../../BkTable/BkTable';
import { RawRow, ChangesByKey, Key, Row } from '../../../../../types';
import { BkModelScheme } from '../../../BkModelScheme/BkModelScheme';
import { BkModel } from '../../BkModel';
import { Context } from '../../../../Context';

export abstract class BkPersistentDataSource<
    TDatabase extends BkDatabase = BkDatabase,
> extends BkDataSource {
    table: BkTable | null = null;

    constructor(data: BkModelScheme, parent: BkModel) {
        super(data, parent);
        if (this.getAttr('table')) {
            this.table = this.getDatabase().getTable(this.getAttr('table'));
        }
    }

    getChanges(context: Context) {
        return this.decodeChanges(context.getBody().changes);
    }

    decodeChanges(changes: ChangesByKey): Record<Key, any> {
        const dChanges: Record<Key, any> = {};
        for (const key in changes) {
            dChanges[key as Key] = this.decodeRow(changes[key as Key]);
        }
        return dChanges;
    }

    decodeRow(rawRow: RawRow): Row {
        // console.debug('PersistentDataSource.decodeRow', rawRow);
        const form = this.getForm();
        if (!form) throw new Error('not form ds');

        const row = {} as Row;
        for (const field of form.fields) {
            const column = field.getAttr('column');
            if (Object.prototype.hasOwnProperty.call(rawRow, column)) {
                const value = field.rawToValue(rawRow[column]);
                row[column] = field.valueToDbValue(value);
            }
        }

        return row;
    }

    getDatabase(): TDatabase {
        const databaseName = this.getAttr('database');
        if (!databaseName) throw new Error(`${this.getFullName()}: no database name`);
        return this.getApp().getDatabase(databaseName) as TDatabase;
    }

    getTable(): BkTable {
        if (!this.table) throw new Error(`${this.getFullName()}: no table`);
        return this.table;
    }
}
