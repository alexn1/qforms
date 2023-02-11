"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersistentDataSource = void 0;
const DataSource_1 = require("../DataSource");
class PersistentDataSource extends DataSource_1.DataSource {
    async select(context) {
        throw new Error(`${this.constructor.name}.select not implemented`);
    }
    decodeChanges(changes) {
        const dChanges = {};
        for (const key in changes) {
            dChanges[key] = this.getValuesFromRow(changes[key]);
        }
        return dChanges;
    }
    getValuesFromRow(row) {
        console.log('PersistentDataSource.getValuesFromRow', row);
        const values = {};
        for (const field of this.getForm().fields) {
            const column = field.getAttr('column');
            if (row.hasOwnProperty(column)) {
                const value = field.rawToValue(row[column]);
                values[column] = field.valueToDbValue(value);
            }
        }
        return values;
    }
    getDatabase() {
        const databaseName = this.getAttr('database');
        if (!databaseName)
            throw new Error(`${this.getFullName()}: no database name`);
        return this.getApp().getDatabase(databaseName);
    }
    getTable() {
        const tableName = this.getAttr('table');
        if (!tableName)
            throw new Error(`${this.getFullName()}: no table name`);
        return this.getDatabase().getTable(tableName);
    }
}
exports.PersistentDataSource = PersistentDataSource;
