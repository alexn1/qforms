"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkPersistentDataSource = void 0;
const BkDataSource_1 = require("../BkDataSource");
class BkPersistentDataSource extends BkDataSource_1.BkDataSource {
    constructor(data, parent) {
        super(data, parent);
        this.table = null;
        if (this.getAttr('table')) {
            this.table = this.getDatabase().getTable(this.getAttr('table'));
        }
    }
    decodeChanges(changes) {
        const dChanges = {};
        for (const key in changes) {
            dChanges[key] = this.getValuesFromRow(changes[key]);
        }
        return dChanges;
    }
    getValuesFromRow(rawRow) {
        console.log('PersistentDataSource.getValuesFromRow', rawRow);
        const form = this.getForm();
        if (!form)
            throw new Error('not form ds');
        const values = {};
        for (const field of form.fields) {
            const column = field.getAttr('column');
            if (Object.prototype.hasOwnProperty.call(rawRow, column)) {
                const value = field.rawToValue(rawRow[column]);
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
        if (!this.table)
            throw new Error(`${this.getFullName()}: no table`);
        return this.table;
    }
}
exports.BkPersistentDataSource = BkPersistentDataSource;
