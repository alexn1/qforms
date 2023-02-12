import path from 'path';

import { Result } from '../../../Result';
import { Model } from '../Model';
import { Helper } from '../../../Helper';
import { Context } from '../../../Context';
import { BkApplication } from '../Application/Application';
import { Database } from '../Database/Database';
import { BkPage } from '../Page/Page';
import { Form } from '../Form/Form';
import { RowForm } from '../Form/RowForm/RowForm';
import { TableForm } from '../Form/TableForm/TableForm';

export type ReadResult = [any[], number | null];

export interface IAccess {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
}

export class BkDataSource extends Model {
    keyColumns: string[] = [];
    rows: any[] = [];

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

    prepareRows(context: Context, rows: any[]): void {
        // console.log('DataSource.prepareRows:', this.getFullName(), this.keyColumns);
        if (rows[0]) {
            for (const keyColumn of this.keyColumns) {
                if (!rows[0].hasOwnProperty(keyColumn)) {
                    throw new Error(
                        `${this.getFullName()}: no key column '${keyColumn}' in result set`,
                    );
                }
            }
            if (this.isDefaultOnForm()) {
                const rowColumns = Object.keys(rows[0]);
                const formColumns = this.getParent()
                    .fields.map((field) => field.getAttr('column'))
                    .filter((column) => !!column);
                for (const rowColumn of rowColumns) {
                    if (!formColumns.includes(rowColumn)) {
                        console.log('rowColumns:', rowColumns);
                        console.log('formColumns:', formColumns);
                        console.log('row:', rows[0]);
                        throw new Error(
                            `${this.getFullName()}: not used column "${rowColumn}" in result set`,
                        );
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

    checkColumns(row: any): void {
        for (const field of this.parent.fields) {
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

    encodeRows(rows: any[]) {
        for (const row of rows) {
            this.encodeRow(row);
        }
    }

    encodeRow(row: any): void {
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

    getApp(): BkApplication {
        return this.parent.getApp();
    }

    /*getKeyValuesFromRow(row) {
        const values = {};
        this.keyColumns.forEach(column => {
            values[column] = row[column];
        });
        return values;
    }*/

    getKeyValuesFromKey(key: string) {
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

    getKeyFromValues(values): string {
        const arr: string[] = [];
        for (let i = 0; i < this.keyColumns.length; i++) {
            const column = this.keyColumns[i];
            const value = values[column];
            if (value === null || value === undefined) {
                throw new Error(`getKeyFromValues: no value of ${column} column`);
            }
            arr.push(value);
        }
        return JSON.stringify(arr);
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

    static keyToParams(key: string, paramName: string = 'key') {
        if (typeof key !== 'string') throw new Error('key not string');
        const params = {};
        const arr = JSON.parse(key);
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

    calcNewKeyValues(originalKeyValues, values) {
        const newKeyValues = this.keyColumns.reduce((acc, name) => {
            if (originalKeyValues[name] === undefined)
                throw new Error(`no key column in values: ${name}`);
            acc[name] = values[name] !== undefined ? values[name] : originalKeyValues[name];
            return acc;
        }, {});
        return newKeyValues;
    }

    calcNewKey(key: string, values) {
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

    private async getRows(): Promise<any[]> {
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
        return this.parent instanceof Form;
    }

    isDefaultOnForm(): boolean {
        return this.getName() === 'default' && this.isOnForm();
    }

    isDefaultOnRowForm(): boolean {
        return this.getName() === 'default' && this.parent instanceof RowForm;
    }

    isDefaultOnTableForm(): boolean {
        return this.getName() === 'default' && this.parent instanceof TableForm;
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
    getForm(): Form | null {
        return this.isOnForm() ? this.getParent() : null;
    }

    getAccess(context: Context): IAccess {
        return {
            create: true,
            read: true,
            update: true,
            delete: true,
        };
    }

    getDatabase(): Database {
        throw new Error(`${this.constructor.name}.getDatabase not implemented`);
    }

    getLimit() {
        if (this.getAttr('limit') !== '') {
            return parseInt(this.getAttr('limit'));
        }
        return null;
    }
}
