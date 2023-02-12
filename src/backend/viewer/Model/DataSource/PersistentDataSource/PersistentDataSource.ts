import { DataSource } from '../DataSource';
import { Database } from '../../Database/Database';
import { Table } from '../../Table/Table';

export abstract class PersistentDataSource<
    TDatabase extends Database = Database
> extends DataSource {
    decodeChanges(changes) {
        const dChanges = {};
        for (const key in changes) {
            dChanges[key] = this.getValuesFromRow(changes[key]);
        }
        return dChanges;
    }

    getValuesFromRow(row) {
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

    getTable(): Table {
        const tableName = this.getAttr('table');
        if (!tableName) throw new Error(`${this.getFullName()}: no table name`);
        return this.getDatabase().getTable(tableName);
    }
}
