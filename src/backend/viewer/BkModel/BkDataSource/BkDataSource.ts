import path from 'path';

import { Result } from '../../../../Result';
import { BkModel } from '../BkModel';
import { BkHelper } from '../../../BkHelper';
import { Context } from '../../../Context';
import { BkApplication } from '../BkApplication/BkApplication';
import { BkDatabase } from '../BkDatabase/BkDatabase';
import { BkPage } from '../BkPage/BkPage';
import { BkForm } from '../BkForm/BkForm';
import { BkRowForm } from '../BkForm/BkRowForm/BkRowForm';
import { BkTableForm } from '../BkForm/BkTableForm/BkTableForm';
import { Key, KeyRecord, Row, KeyTuple, RawRow, Access, Nullable } from '../../../../types';
import { debug } from '../../../../console';
import { DataSourceScheme } from '../../../common/Scheme/DataSourceScheme';
import { DataSourceData } from '../../../../common/ModelData/DataSourceData';

export type ReadResult = [RawRow[], Nullable<number>];

export class BkDataSource extends BkModel<DataSourceScheme> {
    keyColumns: string[] = [];
    rows: RawRow[] = [];

    /* constructor(data, parent) {
        super(data, parent);
    } */

    getDirPath(): string {
        return path.join(
            this.getParent<BkForm | BkPage | BkApplication>().getDirPath(),
            'dataSources',
            this.getName(),
        );
    }

    getJsonFilePath(): string {
        return path.join(this.getDirPath(), `${this.getName()}.json`);
    }

    async init(context: Context): Promise<void> {
        // debug('DataSource.init', this.getFullName());
        await super.init(context);

        // keyColumns
        this.keyColumns = this.getKeyColumns();

        // rows
        const jsonFilePath = this.getJsonFilePath();
        const exists = await BkHelper.exists(jsonFilePath);
        if (exists) {
            const content = await BkHelper.readTextFile(jsonFilePath);
            this.rows = JSON.parse(content);
        }
    }

    getKeyColumns(): string[] {
        const keyColumns = this.getItemNames('keyColumns');
        // debug('keyColumns:', keyColumns);
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

    checkKeyFields() {
        const fieldsClumns = this.getForm().fields.map((field) => field.getAttr('column'));
        // debug('fieldsClumns:', fieldsClumns);
        for (const keyColumn of this.keyColumns) {
            if (!fieldsClumns.includes(keyColumn)) {
                throw new Error(`[${this.getFullName()}]: no field with key column: ${keyColumn}`);
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

    checkNotUsedColumns(row: Row) {
        const rowColumns = Object.keys(row);
        const formColumns = this.getForm()
            .fields.map((field) => field.getAttr('column'))
            .filter((column) => !!column);
        for (const rowColumn of rowColumns) {
            if (!formColumns.includes(rowColumn)) {
                debug('rowColumns:', rowColumns);
                debug('formColumns:', formColumns);
                debug('row:', row);
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

    encodeRows(rows: Row[]): RawRow[] {
        return rows.map((row) => this.encodeRow(row));
    }

    encodeRow(row: Row): RawRow {
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
                rawRow[name] = BkHelper.encodeValue(row[name]);
            }
        }
        return rawRow;
    }

    getApp(): BkApplication {
        return this.getParent().getApp();
    }

    getKeyValuesFromKey(key: Key): KeyRecord {
        const tuple: KeyTuple = JSON.parse(key);
        if (tuple.length !== this.keyColumns.length) {
            throw new Error(`key length mismatch: ${tuple.length} of ${this.keyColumns.length}`);
        }
        const record: KeyRecord = {};
        for (let i = 0; i < this.keyColumns.length; i++) {
            const keyColumn = this.keyColumns[i];
            record[keyColumn] = tuple[i];
        }
        return record;
    }

    getKeyFromValues(record: KeyRecord): Key {
        const tuple: KeyTuple = [];
        for (let i = 0; i < this.keyColumns.length; i++) {
            const column = this.keyColumns[i];
            const value = record[column];
            if (value === null || value === undefined) {
                throw new Error(`getKeyFromValues: no value of ${column} column`);
            }
            tuple.push(value);
        }
        return JSON.stringify(tuple) as Key;
    }

    getFullName(): string {
        if (this.isOnForm()) {
            return [
                this.getParent<BkForm>().getPage().getName(),
                this.getParent().getName(),
                this.getName(),
            ].join('.');
        } else if (this.getParent() instanceof BkPage) {
            return [this.getParent().getName(), this.getName()].join('.');
        } else {
            return this.getName();
        }
    }

    static keyToParams(key: Key, paramName = 'key'): KeyRecord {
        if (typeof key !== 'string') throw new Error('key not string');
        const params: KeyRecord = {};
        const arr: KeyTuple = JSON.parse(key);
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

    calcNewKeyValues(originalKeyValues: KeyRecord, values): KeyRecord {
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

    fillAttributes(response: DataSourceData): void {
        response.class = this.getClassName();
        response.name = this.getAttr('name');
        if (this.isAttr('database')) {
            response.database = this.getAttr('database');
        }
        if (this.isAttr('table')) {
            response.table = this.getAttr('table');
        }
    }

    async fill(context: Context): Promise<DataSourceData> {
        // debug('DataSource.fill', this.getFullName());
        const response: DataSourceData = (await super.fill(context)) as DataSourceData;

        // keyColumns
        response.keyColumns = this.keyColumns;

        // rows from JSON file
        response.rows = await this.getRows();
        return response;
    }

    async getRows(): Promise<RawRow[]> {
        // debug('DataSource.getRows');
        /* const jsonFilePath = this.getJsonFilePath();
        const exists = await BkHelper.exists(jsonFilePath);
        if (exists) {
            const content = await BkHelper.readTextFile(jsonFilePath);
            return JSON.parse(content);
        } */
        return this.rows;
    }

    isOnForm(): boolean {
        return this.getParent() instanceof BkForm;
    }

    isDefaultOnForm(): boolean {
        return this.getName() === 'default' && this.isOnForm();
    }

    isDefaultOnRowForm(): boolean {
        return this.getName() === 'default' && this.getParent() instanceof BkRowForm;
    }

    isDefaultOnTableForm(): boolean {
        return this.getName() === 'default' && this.getParent() instanceof BkTableForm;
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

    getForm(): BkForm {
        if (!this.isOnForm()) throw new Error(`${this.getFullName()}: not form data source`);
        return this.getParent();
    }

    getAccess(context: Context): Access {
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
