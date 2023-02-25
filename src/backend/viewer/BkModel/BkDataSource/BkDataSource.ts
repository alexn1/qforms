import path from 'path';

import { Result } from '../../../../Result';
import { BkModel } from '../BkModel';
import { Helper } from '../../../Helper';
import { Context } from '../../../Context';
import { BkApplication } from '../BkApplication/BkApplication';
import { BkDatabase } from '../BkDatabase/BkDatabase';
import { BkPage } from '../BkPage/BkPage';
import { BkForm } from '../BkForm/BkForm';
import { BkRowForm } from '../BkForm/BkRowForm/BkRowForm';
import { BkTableForm } from '../BkForm/BkTableForm/BkTableForm';
import { Key, KeyObject, Row, KeyArray, KeyParams, RawRow } from '../../../../types';

export type ReadResult = [RawRow[], number | null];

export class BkDataSource extends BkModel {
    keyColumns: string[] = [];
    rows: Row[] = [];

    /* constructor(data, parent) {
        super(data, parent);
    } */

    getDirPath(): string {
        return path.join(this.parent.getDirPath(), 'dataSources', this.getName());
    }

    getJsonFilePath(): string {
        return path.join(this.getDirPath(), `${this.getName()}.json`);
    }

    async init(context: Context): Promise<void> {
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
        if (!keyColumns.length) {
            throw new Error(
                `${this.getFullName()}: DataSource without table must have at least one key column`,
            );
        }

        return keyColumns;
    }

    checkKeyColumns(row: Row) {
        for (const keyColumn of this.keyColumns) {
            if (!row.hasOwnProperty(keyColumn)) {
                throw new Error(
                    `${this.getFullName()}: no key column '${keyColumn}' in result set`,
                );
            }
        }
    }

    checkRow(row: Row) {
        this.checkKeyColumns(row);
        if (this.isDefaultOnForm()) {
            // this.checkNotUsedColumns(row);
            this.checkFields(row);
        }
    }

    checkRows(rows: Row[]) {
        if (rows[0]) {
            this.checkRow(rows[0]);
        }
    }

    /* prepareRows(context: Context, rows: Row[]): void {
        // console.log('DataSource.prepareRows:', this.getFullName(), this.keyColumns);
        this.checkRows(rows);
        this.encodeRows(rows);
    } */

    checkNotUsedColumns(row: Row) {
        const rowColumns = Object.keys(row);
        const formColumns = this.getForm()
            .fields.map((field) => field.getAttr('column'))
            .filter((column) => !!column);
        for (const rowColumn of rowColumns) {
            if (!formColumns.includes(rowColumn)) {
                console.log('rowColumns:', rowColumns);
                console.log('formColumns:', formColumns);
                console.log('row:', row);
                throw new Error(
                    `${this.getFullName()}: not used column "${rowColumn}" in result set`,
                );
            }
        }
    }

    checkFields(row: Row): void {
        for (const field of this.getForm().fields) {
            const column = field.getAttr('column');
            if (column) {
                if (!row.hasOwnProperty(column)) {
                    throw new Error(
                        `[${field.getFullName()}]: no column '${column}' in result set`,
                    );
                }
                continue;
            }
            if (field.getAttr('value')) {
                continue;
            }
            throw new Error(
                `[${field.getFullName()}]: no column and no value attr for calculation`,
            );
        }
    }

    /* encodeRows(rows: Row[]) {
        for (const row of rows) {
            this.encodeRow(row);
        }
    } */

    encodeRows2(rows: Row[]): RawRow[] {
        return rows.map((row) => this.encodeRow2(row));
    }

    /* encodeRow(row: Row): void {
        // console.log('DataSource.encodeRow');
        if (!row) throw new Error(`encodeRow: need row`);
        if (this.isDefaultOnForm()) {
            for (const field of this.getForm().fields) {
                const column = field.getAttr('column');
                row[column] = field.valueToRaw(row[column]);
            }
        } else {
            for (const name in row) {
                row[name] = Helper.encodeValue(row[name]);
            }
        }
    } */

    encodeRow2(row: Row): RawRow {
        if (!row) throw new Error(`encodeRow: need row`);
        const rawRow: RawRow = {} as RawRow;
        if (this.isDefaultOnForm()) {
            for (const field of this.getForm().fields) {
                const column = field.getAttr('column');
                rawRow[column] = field.valueToRaw(row[column]);
                if (field.isAttr('displayColumn')) {
                    const displayColumn = field.getAttr('displayColumn');
                    rawRow[displayColumn] = field.valueToRaw(row[displayColumn]);
                }
            }
        } else {
            for (const name in row) {
                rawRow[name] = Helper.encodeValue(row[name]);
            }
        }
        return rawRow;
    }

    getApp(): BkApplication {
        return this.parent.getApp();
    }

    getKeyValuesFromKey(key: Key): KeyObject {
        const arr: KeyArray = JSON.parse(key);
        if (arr.length !== this.keyColumns.length) {
            throw new Error(`key length mismatch: ${arr.length} of ${this.keyColumns.length}`);
        }
        const values: KeyObject = {};
        for (let i = 0; i < this.keyColumns.length; i++) {
            const keyColumn = this.keyColumns[i];
            values[keyColumn] = arr[i];
        }
        return values;
    }

    getKeyFromValues(values): Key {
        const arr: KeyArray = [];
        for (let i = 0; i < this.keyColumns.length; i++) {
            const column = this.keyColumns[i];
            const value = values[column];
            if (value === null || value === undefined) {
                throw new Error(`getKeyFromValues: no value of ${column} column`);
            }
            arr.push(value);
        }
        return JSON.stringify(arr) as Key;
    }

    getFullName(): string {
        if (this.isOnForm()) {
            return [this.parent.getPage().getName(), this.parent.getName(), this.getName()].join(
                '.',
            );
        } else if (this.parent instanceof BkPage) {
            return [this.parent.getName(), this.getName()].join('.');
        } else {
            return this.getName();
        }
    }

    static keyToParams(key: Key, paramName: string = 'key'): KeyParams {
        if (typeof key !== 'string') throw new Error('key not string');
        const params: KeyParams = {};
        const arr: KeyArray = JSON.parse(key);
        if (arr.length === 1) {
            params[paramName] = arr[0];
        } else if (arr.length > 1) {
            for (let i = 0; i < arr.length; i++) {
                params[`${paramName}${i + 1}`] = arr[i];
            }
        } else {
            throw new Error(`invalid key: ${key}`);
        }
        return params;
    }

    calcNewKeyValues(originalKeyValues: KeyObject, values): KeyObject {
        const newKeyValues = this.keyColumns.reduce((acc, name) => {
            if (originalKeyValues[name] === undefined)
                throw new Error(`no key column in values: ${name}`);
            acc[name] = values[name] !== undefined ? values[name] : originalKeyValues[name];
            return acc;
        }, {});
        return newKeyValues;
    }

    calcNewKey(key: Key, values) {
        const keyValues = this.getKeyValuesFromKey(key);
        const newKeyValues = this.calcNewKeyValues(keyValues, values);
        return this.getKeyFromValues(newKeyValues);
    }

    fillAttributes(response: any): void {
        response.class = this.getClassName();
        response.name = this.getAttr('name');
        if (this.isAttr('database')) {
            response.database = this.getAttr('database');
        }
        if (this.isAttr('table')) {
            response.table = this.getAttr('table');
        }
    }

    async fill(context: Context): Promise<any> {
        //console.log('DataSource.fill', this.getFullName());
        const response = await super.fill(context);

        // keyColumns
        response.keyColumns = this.keyColumns;

        // rows from JSON file
        response.rows = await this.getRows();
        return response;
    }

    private async getRows(): Promise<Row[]> {
        // console.log('DataSource.getRows');
        /*const jsonFilePath = this.getJsonFilePath();
        const exists = await Helper.exists(jsonFilePath);
        if (exists) {
            const content = await Helper.readTextFile(jsonFilePath);
            return JSON.parse(content);
        }*/
        return this.rows;
    }

    isOnForm(): boolean {
        return this.parent instanceof BkForm;
    }

    isDefaultOnForm(): boolean {
        return this.getName() === 'default' && this.isOnForm();
    }

    isDefaultOnRowForm(): boolean {
        return this.getName() === 'default' && this.parent instanceof BkRowForm;
    }

    isDefaultOnTableForm(): boolean {
        return this.getName() === 'default' && this.parent instanceof BkTableForm;
    }

    async read(context: Context): Promise<ReadResult> {
        throw new Error(`${this.constructor.name}.select not implemented`);
    }

    async create(context: Context, _values: any = null): Promise<Result> {
        throw new Error(`${this.constructor.name}.create not implemented`);
    }

    async update(context: Context): Promise<Result> {
        throw new Error(`${this.constructor.name}.update not implemented`);
    }

    async delete(context: Context): Promise<Result> {
        throw new Error(`${this.constructor.name}.delete not implemented`);
    }

    getForm(): BkForm | null {
        return this.isOnForm() ? this.getParent() : null;
    }

    getAccess(context: Context): {
        create: boolean;
        read: boolean;
        update: boolean;
        delete: boolean;
    } {
        return {
            create: true,
            read: true,
            update: true,
            delete: true,
        };
    }

    getDatabase(): BkDatabase {
        throw new Error(`${this.constructor.name}.getDatabase not implemented`);
    }

    getLimit(): number | null {
        if (this.getAttr('limit') !== '') {
            return parseInt(this.getAttr('limit'));
        }
        return null;
    }
}
