import { BkDataSource } from '../BkDataSource';
import { BkDatabase } from '../../Database/Database';
import { BkTable } from '../../Table/Table';
import { RawRow, Changes } from '../../../../../types';

export abstract class BkPersistentDataSource<
    TDatabase extends BkDatabase = BkDatabase,
> extends BkDataSource {
    decodeChanges(changes: Changes) {
        const dChanges = {};
        for (const key in changes) {
            dChanges[key] = this.getValuesFromRow(changes[key]);
        }
        return dChanges;
    }

    getValuesFromRow(row: RawRow) {
        console.log('PersistentDataSource.getValuesFromRow', row);
        const form = this.getForm();
        if (!form) throw new Error('not form ds');
        const values = {};
        for (const field of form.fields) {
            const column = field.getAttr('column');
            if (row.hasOwnProperty(column)) {
                const value = field.rawToValue(row[column]);
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
