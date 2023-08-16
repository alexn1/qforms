import { Model } from '../Model';
import { Form } from '../Form/Form';
import { Page } from '../Page/Page';
import { Application } from '../Application/Application';
import { Helper } from '../../../common';
import {
    Key,
    KeyTuple,
    KeyRecord,
    RawRow,
    JSONString,
    ChangesByKey,
    keyTupleToKey,
    KeyElement,
} from '../../../../types';
import { Result } from '../../../../Result';
import { Field } from '../Field/Field';
import { debug } from '../../../../console';
import { DataSourceData } from '../../../../common/DataSourceData';

export class DataSource extends Model<DataSourceData> {
    rows: RawRow[] | null = null;
    rowsByKey: { [key: Key]: RawRow } | null = null;
    news: RawRow[] = [];
    changes = new Map<RawRow, RawRow>();
    frame: number = 1;
    count: number | null = null;
    lastFrame: number = 1;

    constructor(data, parent: Model) {
        super(data, parent);
        if (data.count !== undefined) {
            this.count = data.count;
        }
    }

    init() {
        // console.debug('DataSource.init', this.getFullName(), this.getClassName());
        this.setRows(this.getData().rows);
        if (this.getAttr('table')) {
            const table = this.getTable();
            table.on('insert', this.onTableInsert);
            table.on('update', this.onTableUpdate);
            table.on('delete', this.onTableDelete);
            table.on('refresh', this.onTableRefresh);
        }
    }

    deinit() {
        if (this.getAttr('table')) {
            const table = this.getTable();
            table.off('insert', this.onTableInsert);
            table.off('update', this.onTableUpdate);
            table.off('delete', this.onTableDelete);
            table.off('refresh', this.onTableRefresh);
        }
        super.deinit();
    }

    setRows(rows: RawRow[]) {
        this.rows = rows;
        this.fillRowsByKey();
    }

    addRow(row: RawRow) {
        this.rows!.push(row);
        const key = this.getRowKey(row);
        this.rowsByKey![key!] = row;
    }

    addRows(rows: RawRow[]) {
        for (let i = 0; i < rows.length; i++) {
            this.rows!.push(rows[i]);
        }
        this.fillRowsByKey();
    }

    getRowsLength(): number {
        return this.rows!.length;
    }

    fillRowsByKey() {
        // console.debug('DataSource.fillRowsByKey', this.getFullName())
        this.rowsByKey = {};
        for (let i = 0; i < this.rows!.length; i++) {
            const row = this.rows![i];
            const key = this.getRowKey(row);
            this.rowsByKey[key!] = row;
        }
        // console.debug('this.rowsByKey:', this.getFullName(), this.rowsByKey);
    }

    // deinit() {
    //     console.debug('DataSource.deinit', this.getFullName());
    //     super.deinit();
    // }

    /*getType(column) {
        // console.debug('DataSource.getType', this.getClassName(), column);
        throw new Error('DataSource column type not implemented');
    }*/

    discardRowColumn(row: RawRow, column: string) {
        if (this.changes.has(row) && this.changes.get(row)![column] !== undefined) {
            delete this.changes.get(row)![column];
        }
    }

    changeRowColumn(row: RawRow, column: string, newValue: JSONString) {
        if (!this.changes.has(row)) this.changes.set(row, {} as RawRow);
        this.changes.get(row)![column] = newValue;
    }

    setValue(row: RawRow, column: string, value: JSONString) {
        // console.debug('DataSource.setValue', this.getFullName(), column, value, typeof value);
        if (value === undefined)
            throw new Error(`${this.getFullName()}: undefined is wrong value for data source`);
        if (typeof value === 'object' && value !== null) {
            throw new Error(
                `setValue: ${this.getFullName()}.${column}: object must be in JSON format`,
            );
        }
        if (row[column] !== value) {
            this.changeRowColumn(row, column, value);
            if (row[column] === undefined && value === null) {
                // workaround for new rows
                this.discardRowColumn(row, column);
            }
        } else {
            this.discardRowColumn(row, column);
        }
        if (this.changes.has(row) && !Object.keys(this.changes.get(row)!).length)
            this.changes.delete(row);
        // console.debug('changes:', this.changes);
    }

    isChanged(): boolean {
        // console.debug('DataSource.isChanged', this.getFullName(), this.changes.size);
        return !!this.changes.size;
    }

    hasNew(): boolean {
        return !!this.news.length;
    }

    isRowColumnChanged(row: RawRow, column: string) {
        // console.debug('DataSource.isRowColumnChanged', this.getFullName());
        return row[column] !== this.getValue(row, column);
    }

    getValue(row: RawRow, column: string): JSONString {
        // console.debug('DataSource.getValue', column);
        let value: JSONString;
        if (this.changes.has(row) && this.changes.get(row)![column] !== undefined) {
            value = this.changes.get(row)![column];
        } else {
            value = row[column];
        }
        if (value !== undefined && typeof value !== 'string') {
            throw new Error(
                `getValue: ${this.getFullName()}.${column}: object must be in JSON format, value: ${value}`,
            );
        }
        // console.debug('DataSource.getValue:', value);
        return value;
    }

    getKeyValues(row: RawRow): KeyRecord {
        return this.getData().keyColumns.reduce((keyValues, column) => {
            keyValues[column] = JSON.parse(row[column]);
            return keyValues;
        }, {});
    }

    getRowKey(row: RawRow): Key | null {
        // console.debug('DataSource.getRowKey', row);
        const arr: KeyTuple = [];
        for (const column of this.getData().keyColumns) {
            if (row[column] === undefined) return null;
            if (row[column] === null) throw new Error('wrong value null for data source value');
            try {
                const value = JSON.parse(row[column]) as KeyElement;
                arr.push(value);
            } catch (err) {
                console.debug('getRowKey: cannot parse: ', row[column]);
                throw err;
            }
        }
        return keyTupleToKey(arr);
    }

    removeRow(key: Key) {
        const row = this.getRow(key);
        if (!row) throw new Error(`${this.getFullName()}: no row with key ${key} to remove`);
        const i = this.rows!.indexOf(row);
        if (i === -1) throw new Error(`${this.getFullName()}: no row with i ${i} to remove`);
        this.rows!.splice(i, 1);
        delete this.rowsByKey![key];
    }

    newRow(row: RawRow) {
        console.debug('DataSource.newRow', this.getFullName(), row);
        if (this.rows!.length > 0) {
            throw new Error('rows can be added to empty data sources only in new mode');
        }
        this.news.push(row);
    }

    getSingleRow(withChanges = false): RawRow {
        if (this.news[0]) return this.news[0];
        const row = this.rows![0];
        if (!row) throw new Error('no single row');
        if (withChanges) {
            return this.getRowWithChanges(row);
        }
        return row;
    }

    getForm(): Form | null {
        return this.getParent() instanceof Form ? (this.getParent() as Form) : null;
    }

    getPage(): Page | null {
        if (this.getParent() instanceof Form) return this.getParent().getParent() as Page;
        if (this.getParent() instanceof Page) return this.getParent() as Page;
        return null;
    }

    getApp(): Application {
        debug('DataSource.getApp', this.getFullName());
        if (this.getParent() instanceof Application) return this.getParent() as Application;
        if (this.getParent() instanceof Page) return this.getParent().getParent() as Application;
        if (this.getParent() instanceof Form)
            return this.getParent().getParent().getParent() as Application;
        if (this.getParent() instanceof Field)
            return this.getParent().getParent().getParent().getParent() as Application;

        throw new Error(
            `unknown parent: ${
                this.getParent().constructor.name
            }(${this.getParent().getFullName()})`,
        );
    }

    /*getNamespace() {
        if (this.parent instanceof Form) {
            return this.parent.getPage().getName() + '.' + this.parent.getName() + '.' + this.getName();
        }
        if (this.parent instanceof Page) {
            return this.parent.getName() + '.' + this.getName();
        }
        return this.getName();
    }*/

    getRow(key: Key): RawRow | null {
        return this.rowsByKey![key] || null;
    }

    /*getRowByKey(key) {
        return this.rowsByKey[key] || null;
    }*/

    getRows(): RawRow[] {
        if (!this.rows) throw new Error('no rows');
        return this.rows;
    }

    getRowByIndex(i: number): RawRow {
        return this.rows![i];
    }

    discard() {
        console.debug('DataSource.discard', this.getFullName());
        if (!this.isChanged()) throw new Error(`no changes in data source ${this.getFullName()}`);
        this.changes.clear();
    }

    static keyToParams(key: Key, paramName: string = 'key'): KeyRecord {
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

    getChangesByKey(): ChangesByKey {
        const changes: ChangesByKey = {};
        for (const row of this.changes.keys()) {
            changes[this.getRowKey(row)!] = this.changes.get(row)!;
        }
        return changes;
    }

    getRowWithChanges(row: RawRow): RawRow {
        if (this.changes.has(row)) {
            return { ...row, ...this.changes.get(row) };
        }
        return row;
    }

    hasNewRows(): boolean {
        return this.news.length > 0;
    }

    static copyNewValues(row: RawRow, newValues: RawRow) {
        for (const name in newValues) {
            row[name] = newValues[name];
        }
    }

    updateRow(key: Key, newValues: RawRow) {
        console.debug('DataSource.updateRow', this.getFullName(), key, newValues);
        if (!key) throw new Error('no key');
        const row = this.getRow(key);
        if (!row) throw new Error(`${this.getFullName()}: no row with key ${key}`);
        const newKey = this.getRowKey(newValues);
        DataSource.copyNewValues(row, newValues); // copy new values to original row object
        if (key !== newKey) {
            delete this.rowsByKey![key];
            this.rowsByKey![newKey!] = row;
        }
        // console.debug(`key: ${key} to ${newKey}`);
        // console.debug('this.rowsByKey:', this.rowsByKey);
        // console.debug('this.getData().rows:', this.getData().rows);
    }

    getTable() {
        if (!this.getAttr('table')) throw new Error(`${this.getFullName()}: table attr empty`);
        return this.getDatabase().getTable(this.getAttr('table'));
    }

    getDatabase() {
        // console.debug('DataSource.getDatabase', this.getFullName(), this.getAttr('database'));
        if (!this.getAttr('database'))
            throw new Error(`${this.getFullName()}: database attr empty`);
        return this.getApp().getDatabase(this.getAttr('database'));
    }

    getType(columnName: string) {
        // console.debug('DataSource.getType', columnName);
        const type = this.getTable().getColumn(columnName).getType();
        // console.debug('type:', type);
        return type;
    }

    async insert(row?: RawRow): Promise<any> {
        console.debug('DataSource.insert', this.news);
        if (!this.news.length) throw new Error('no new rows to insert');
        const inserts: Key[] = [];
        for (const row of this.news) {
            const newValues = this.getRowWithChanges(row);
            // console.debug('newValues:', newValues);
            DataSource.copyNewValues(row, newValues);
            // console.debug('row:', row);
            const key = this.getRowKey(row);
            if (!key) throw new Error('invalid insert row, no key');
            // console.debug('key:', key);
            inserts.push(key);
        }
        this.changes.clear();
        for (const row of this.news) {
            this.addRow(row);
        }
        this.news = [];
        console.debug('rows:', this.getRows());
        console.debug('inserts:', inserts);

        // events
        if (this.getParent() instanceof Form) {
            this.getForm()!.onDataSourceInsert({ source: this, inserts });
        }
        this.emit('insert', { source: this, inserts });
        const database = this.getAttr('database');
        const table = this.getAttr('table');
        if (database && table) {
            const result = {
                [database]: {
                    [table]: { insert: inserts },
                },
            };
            await this.getApp().emitResult(result, this);
            return result;
        }
        return null;
    }

    async delete(key: Key): Promise<Result | null> {
        console.debug('DataSource.delete', key);
        if (!key) throw new Error('no key');
        this.removeRow(key);

        // events
        const deletes = [key];
        if (this.getParent() instanceof Form) {
            this.getForm()!.onDataSourceDelete({ source: this, deletes });
        }
        this.emit('delete', { source: this, deletes });
        const database = this.getAttr('database');
        const table = this.getAttr('table');
        if (database && table) {
            const result = {
                [database]: {
                    [table]: { delete: deletes },
                },
            };
            await this.getApp().emitResult(result, this);
            return result;
        }
        return null;
    }

    async update(): Promise<Result | null> {
        console.debug('DataSource.update', this.getFullName());
        if (this.news.length) {
            await this.insert();
            return null;
        }
        if (!this.changes.size) throw new Error(`no changes: ${this.getFullName()}`);
        const changes = this.getChangesByKey();
        // console.debug('changes:', changes);

        // apply changes to rows
        const updates: { [key: Key]: Key } = {};
        for (const key in changes) {
            // console.debug('key:', key);
            const row = this.getRow(key as Key);
            // console.debug('row:', row);
            const newValues = this.getRowWithChanges(row!);
            // console.debug('newValues:', newValues);
            const newKey = this.getRowKey(newValues);
            // console.debug('newKey:', newKey);
            this.updateRow(key as Key, newValues);
            updates[key] = newKey;
        }
        this.changes.clear();

        // events
        if (this.getParent() instanceof Form) {
            this.getForm()!.onDataSourceUpdate({ source: this, updates });
        }
        this.emit('update', { source: this, updates });

        const database = this.getAttr('database');
        const table = this.getAttr('table');
        if (database && table) {
            const reuslt = {
                [database]: {
                    [table]: {
                        update: updates,
                    },
                },
            };
            await this.getApp().emitResult(reuslt, this);
            return reuslt;
        }
        return null;
    }

    onTableInsert = async (e) => {
        if (this.deinited)
            throw new Error(`${this.getFullName()}: this data source deinited for onTableUpdate`);
        if (e.source === this) {
            // console.error('onTableInsert stop self insert', this.getFullName());
            return;
        }
        console.debug('DataSource.onTableInsert', this.getFullName(), e);
        if (!e.inserts.length) throw new Error(`${this.getFullName()}: no inserts`);

        for (const key of e.inserts) {
            if (this.getRow(key)) {
                console.debug('rows:', this.rows);
                console.debug('rowsByKey:', this.rowsByKey);
                throw new Error(`${this.getFullName()}: row already in this data source: ${key}`);
            }
            const newValues = e.source.getRow(key);
            const newRow = {} as RawRow;
            DataSource.copyNewValues(newRow, newValues);
            // console.debug('newRow:', newRow);
            this.addRow(newRow);
        }

        // events
        if (this.getParent() instanceof Form) {
            this.getForm()!.onDataSourceInsert(e);
        }
        this.emit('insert', e);
    };

    onTableUpdate = async (e) => {
        if (this.deinited)
            throw new Error(`${this.getFullName()}: this data source deinited for onTableUpdate`);
        if (e.source === this) {
            // console.error('onTableUpdate stop self update', this.getFullName());
            return;
        }
        console.debug('DataSource.onTableUpdate', this.getFullName(), e);
        if (!Object.keys(e.updates).length) throw new Error(`${this.getFullName()}: no updates`);
        for (const key in e.updates) {
            if (this.getRow(key as Key)) {
                const newKey = e.updates[key];
                const sourceRow = e.source.getRow(newKey);
                this.updateRow(key as Key, sourceRow);
            }
        }

        // events
        if (this.getParent() instanceof Form) {
            this.getForm()!.onDataSourceUpdate(e);
        }
        this.emit('update', e);
    };

    onTableDelete = async (e) => {
        if (this.deinited)
            throw new Error(`${this.getFullName()}: this data source deinited for onTableDelete`);
        if (e.source === this) {
            // console.error('onTableDelete stop self update', this.getFullName());
            return;
        }
        console.debug('DataSource.onTableDelete', this.getFullName(), e);
        if (!e.deletes.length) throw new Error(`${this.getFullName()}: no deletes`);
        for (const key of e.deletes) {
            if (this.getRow(key)) {
                this.removeRow(key);
            }
        }

        // events
        if (this.getParent() instanceof Form) {
            this.getForm()!.onDataSourceDelete(e);
        }
        this.emit('delete', e);
    };

    onTableRefresh = async (e): Promise<any> => {
        throw new Error('DataSource.onTableRefresh: not implemented');
    };

    isSurrogate() {
        return this.isAttr('database');
    }

    moveRow(row: RawRow, offset: number) {
        console.debug('DataSource.moveRow');
        Helper.moveArrItem(this.rows, row, offset);

        // refresh event
        const event = { source: this };
        if (this.getParent() instanceof Form) {
            this.getForm()!.onDataSourceRefresh(event);
        }
        this.emit('refresh', event);
    }

    getLimit(): number | null {
        if (this.getAttr('limit')) {
            return parseInt(this.getAttr('limit'));
        }
        return null;
    }

    getCount(): number {
        if (this.count === null) throw new Error(`${this.getFullName()}: no count info`);
        return this.count;
    }

    getFrame(): number {
        return this.frame;
    }

    getLastFrame(): number {
        return this.lastFrame;
    }

    setFrame(frame: number) {
        this.frame = frame;
    }

    getFramesCount(): number {
        if (this.count === null) throw new Error(`${this.getFullName()}: no count info`);
        if (this.count === 0) return 1;
        if (this.getLimit()) return Math.ceil(this.count / this.getLimit()!);
        return 1;
    }

    hasMore(): boolean {
        return this.lastFrame < this.getFramesCount();
    }

    isPersistent(): boolean {
        return false;
    }

    async refresh() {
        throw new Error('DataSource.refresh not implemented');
    }
}

Helper.registerGlobalClass(DataSource);
