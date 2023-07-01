import { BkDataSource } from '../BkDataSource';
import { BkDatabase } from '../../BkDatabase/BkDatabase';
import { BkTable } from '../../BkTable/BkTable';
import { RawRow, ChangesByKey, Key, Row } from '../../../../../types';

export abstract class BkPersistentDataSource<
    TDatabase extends BkDatabase = BkDatabase,
> extends BkDataSource {
    decodeChanges(changes: ChangesByKey) {
        const dChanges: Record<Key, any> = {};
        for (const key in changes) {
            dChanges[key as Key] = this.getValuesFromRow(changes[key as Key]);
        }
        return dChanges;
    }

    getValuesFromRow(rawRow: RawRow): Row {
        console.log('PersistentDataSource.getValuesFromRow', rawRow);
        const form = this.getForm();
        if (!form) throw new Error('not form ds');
        const values = {} as Row;
        for (const field of form.fields) {
            const column = field.getAttr('column');
            if (Object.prototype.hasOwnProperty.call(rawRow, column)) {
                const value = field.rawToValue(rawRow[column]);
                values[column] = field.valueToDbValue(value);
            }
        }
        return values;
    }

    getDatabase(): TDatabase {
        const databaseName = this.getAttr('database');
        if (!databaseName) throw new Error(`${this.getFullName()}: no database name`);
        return this.getApp().getDatabase(databaseName) as TDatabase;
    }

    getTable(): BkTable {
        const tableName = this.getAttr('table');
        if (!tableName) throw new Error(`${this.getFullName()}: no table name`);
        return this.getDatabase().getTable(tableName);
    }
}
