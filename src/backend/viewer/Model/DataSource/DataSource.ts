import Result from "../../../Result";

const path = require('path');

import Model from '../Model';
import Helper from '../../../Helper';
import Context from '../../../Context';
import Application from '../Application/Application';
import Database from '../Database/Database';
import Page from '../Page/Page';
import Form from '../Form/Form';
import RowForm from '../Form/RowForm/RowForm';
import TableForm from '../Form/TableForm/TableForm';

class DataSource extends Model {
    keyColumns: any;
    rows: any[];
    constructor(data, parent) {
        super(data, parent);
        this.keyColumns = [];
        this.rows = [];
    }

    getDirPath() {
        return path.join(this.parent.getDirPath(), 'dataSources', this.getName());
    }

    getJsonFilePath() {
        return path.join(this.getDirPath(), `${this.getName()}.json`);
    }

    async init(context) {
        // console.log('DataSource.init', this.getFullName());
        await super.init(context);

        // keyColumns
        this.keyColumns = this.getKeyColumns();

        // rows
        const jsonFilePath = this.getJsonFilePath();
        const exists = await Helper.exists(jsonFilePath);
        if (exists) {
            const content = await Helper.readTextFile(jsonFilePath);
            this.rows = JSON.parse(content);
        }
    }

    getKeyColumns(): string[] {
        const keyColumns = this.getItemNames('keyColumns');
        // console.log('keyColumns:', keyColumns);
        if (!keyColumns.length) throw new Error(`${this.getFullName()}: DataSource without table must have at least one key column`);
        return keyColumns;
    }

    prepareRows(context: Context, rows: any[]): void {
        // console.log('DataSource.prepareRows:', this.getFullName(), this.keyColumns);
        if (rows[0]) {
            for (const keyColumn of this.keyColumns) {
                if (!rows[0].hasOwnProperty(keyColumn)) {
                    throw new Error(`${this.getFullName()}: no key column '${keyColumn}' in result set`);
                }
            }
            if (this.isDefaultOnForm()) {
                const rowColumns = Object.keys(rows[0]);
                const formColumns = this.getParent().fields.map(field => field.getAttr('column')).filter(column => !!column);
                for (const rowColumn of rowColumns) {
                    if (!formColumns.includes(rowColumn)) {
                        console.log('rowColumns:', rowColumns);
                        console.log('formColumns:', formColumns);
                        console.log('row:', rows[0]);
                        throw new Error(`${this.getFullName()}: unknown column "${rowColumn}" in result set`);
                    }
                }
            }
        }
        if (this.isDefaultOnForm()) {
            for (const row of rows) {
                this.checkColumns(row);
            }
        }
        this.encodeRows(rows);
    }

    checkColumns(row) {
        for (const field of this.parent.fields) {
            const column = field.getAttr('column');
            if (column) {
                if (!row.hasOwnProperty(column)) {
                    throw new Error(`[${field.getFullName()}]: no column '${column}' in result set`);
                }
                continue;
            }
            if (field.getAttr('value')) {
                continue;
            }
            throw new Error(`[${field.getFullName()}]: no column and no value attr for calculation`);
        }
    }

    encodeRows(rows) {
        for (const row of rows) {
            this.encodeRow(row);
        }
    }

    encodeRow(row) {
        // console.log('DataSource.encodeRow');
        if (!row) throw new Error(`encodeRow: need row`);
        if (this.isDefaultOnForm()) {
            for (const field of this.getParent().fields) {
                const column = field.getAttr('column');
                row[column] = field.valueToRaw(row[column]);
            }
        } else {
            for (const name in row) {
                row[name] = Helper.encodeValue(row[name]);
            }
        }
    }

    getApp(): Application {
        return this.parent.getApp();
    }

    /*getKeyValuesFromRow(row) {
        const values = {};
        this.keyColumns.forEach(column => {
            values[column] = row[column];
        });
        return values;
    }*/

    getKeyValuesFromKey(key) {
        const arr = JSON.parse(key);
        if (arr.length !== this.keyColumns.length) {
            throw new Error(`key length mismatch: ${arr.length} of ${this.keyColumns.length}`);
        }
        const values = {};
        for (let i = 0; i < this.keyColumns.length; i++) {
            const keyColumn = this.keyColumns[i];
            values[keyColumn] = arr[i];
        }
        return values;
    }

    getKeyFromValues(values) {
        const arr = [];
        for (let i = 0; i < this.keyColumns.length; i++) {
            const column = this.keyColumns[i];
            const value = values[column];
            if (value === null || value === undefined) return null;
            arr.push(value);
        }
        return JSON.stringify(arr);
    }

    getFullName(): string {
        if (this.isOnForm()) {
            return [this.parent.getPage().getName(), this.parent.getName(), this.getName()].join('.');
        } else if (this.parent instanceof Page) {
            return [this.parent.getName(), this.getName()].join('.');
        } else {
            return this.getName();
        }
    }

    static keyToParams(key, paramName = 'key') {
        if (typeof key !== 'string') throw new Error('key not string');
        const params = {};
        const arr = JSON.parse(key);
        if (arr.length === 1) {
            params[paramName] = arr[0];
        } else  if (arr.length > 1) {
            for (let i = 0; i < arr.length; i++) {
                params[`${paramName}${i + 1}`] = arr[i];
            }
        } else {
            throw new Error(`invalid key: ${key}`);
        }
        return params;
    }

    calcNewKeyValues(originalKeyValues, values) {
        const newKeyValues = this.keyColumns.reduce((acc, name) => {
            if (originalKeyValues[name] === undefined) throw new Error(`no key column in values: ${name}`);
            acc[name] = values[name] !== undefined ? values[name] : originalKeyValues[name];
            return acc;
        }, {});
        return newKeyValues;
    }

    calcNewKey(key, values) {
        const keyValues = this.getKeyValuesFromKey(key);
        const newKeyValues = this.calcNewKeyValues(keyValues, values);
        return this.getKeyFromValues(newKeyValues);
    }

    fillAttributes(response: any): void {
        response.class = this.getClassName();
        response.name  = this.getAttr('name');
        if (this.isAttr('database')) {
            response.database = this.getAttr('database');
        }
        if (this.isAttr('table')) {
            response.table = this.getAttr('table');
        }
    }

    async fill(context: Context) {
        //console.log('DataSource.fill', this.getFullName());
        let response = await super.fill(context);

        // keyColumns
        response.keyColumns = this.keyColumns;

        // rows from JSON file
        response.rows = await this.getRows();
        return response;
    }

    async getRows() {
        // console.log('DataSource.getRows');
        /*const jsonFilePath = this.getJsonFilePath();
        const exists = await Helper.exists(jsonFilePath);
        if (exists) {
            const content = await Helper.readTextFile(jsonFilePath);
            return JSON.parse(content);
        }*/
        return this.rows;
    }

    isOnForm() {
        return this.parent instanceof Form;
    }

    isDefaultOnForm() {
        return this.getName() === 'default' && this.isOnForm();
    }

    isDefaultOnRowForm() {
        return this.getName() === 'default' && this.parent instanceof RowForm;
    }

    isDefaultOnTableForm() {
        return this.getName() === 'default' && this.parent instanceof TableForm;
    }

    getDatabase(): Database {
        const databaseName = this.getAttr('database');
        if (!databaseName) throw new Error(`${this.getFullName()}: no database name`);
        return this.getApp().getDatabase(databaseName);
    }
    async update(context: Context): Promise<Result> {
        throw new Error('DataSource.update not implemented');
    }
    async insert(context: Context, values: any = null): Promise<Result> {
        throw new Error('DataSource.insert not implemented');
    }
    async delete(context: Context): Promise<Result> {
        throw new Error('DataSource.delete not implemented');
    }

}

export = DataSource;
