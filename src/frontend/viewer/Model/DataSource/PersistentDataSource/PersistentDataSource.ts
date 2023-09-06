import { DataSource } from '../DataSource';
import { DeleteActionDto, InsertActionDto, Key, RawRow, SelectActionDto, UpdateActionDto } from '../../../../../types';
import { Result } from '../../../../../Result';
import { Form } from '../../Form/Form';

export class PersistentDataSource extends DataSource {
    /* constructor(data, parent) {
        super(data, parent);
    } */

    /*init() {
        super.init();
    }*/

    /*deinit() {
        super.deinit();
    }*/

    async insert(row: RawRow) {
        console.debug('PersistentDataSource.insert', row);
        const database = this.getAttr('database') as string;
        const table = this.getAttr('table') as string;
        if (table === '') throw new Error('no data source table to insert');

        const result: Result = await this.getApp().request('POST', {
            action: 'insert',
            uuid: this.getApp().getAttr('uuid'),
            page: this.getForm()!.getPage().getName(),
            form: this.getForm()!.getName(),
            row: this.getRowWithChanges(row),
        } as InsertActionDto);

        // key & values
        const [key] = Object.keys(result[database][table].insertEx!) as [Key];
        if (!key) throw new Error('no inserted row key');
        const values = result[database][table].insertEx![key];
        for (const column in values) {
            row[column] = values[column];
        }
        // console.debug('key:', key);
        // console.debug('row:', row);

        // clear news & changes
        this.news.splice(this.news.indexOf(row), 1);
        // console.debug('this.news:', this.news);
        this.changes.clear();

        // add new row to rows
        this.addRow(row);

        // events
        const event = { source: this, inserts: result[database][table].insert };
        if (this.getParent() instanceof Form) {
            this.getForm()!.onDataSourceInsert(event);
        }
        this.emit('insert', event);
        await this.getApp().emitResult(result, this);

        return result;
    }

    async update(): Promise<Result | null> {
        console.debug('PersistentDataSource.update', this.getFullName());
        const database = this.getAttr('database');
        const table = this.getAttr('table');
        if (table === '') throw new Error('no data source table to update');
        if (this.news[0]) {
            return await this.insert(this.news[0]);
        }
        if (!this.changes.size) throw new Error(`no changes: ${this.getFullName()}`);

        // specific to PersistentDataSource
        const result: Result = await this.getApp().request('POST', {
            action: 'update',
            uuid: this.getApp().getAttr('uuid'),
            page: this.getForm()!.getPage().getName(),
            form: this.getForm()!.getName(),
            changes: this.getChangesByKey(),
        } as UpdateActionDto);

        const [key] = Object.keys(result[database][table].updateEx!) as [Key];
        if (!key) throw new Error('no updated row');
        const newValues = result[database][table].updateEx![key];
        // const newKey = this.getRowKey(newValues);

        this.changes.clear();
        this.updateRow(key as Key, newValues);

        // events
        const event = { source: this, updates: result[database][table].update };
        if (this.getParent() instanceof Form) {
            this.getForm()!.onDataSourceUpdate(event);
        }
        this.emit('update', event);
        await this.getApp().emitResult(result, this);
        return result;
    }

    async delete(key: Key) {
        console.debug('PersistentDataSource.delete:', this.getFullName(), key);
        if (!key) throw new Error('no key');
        const database = this.getAttr('database');
        const table = this.getAttr('table');
        if (!table) {
            throw new Error(`no table in data source: ${this.getFullName()}`);
        }
        const result: Result = await this.getApp().request('POST', {
            action: '_delete',
            uuid: this.getApp().getAttr('uuid'),
            page: this.getForm()!.getPage().getName(),
            form: this.getForm()!.getName(),
            params: { key },
        } as DeleteActionDto);
        await this.refill();

        // events
        const event = { source: this, deletes: result[database][table].delete };
        if (this.getParent() instanceof Form) {
            this.getForm()!.onDataSourceDelete(event);
        }
        this.emit('delete', event);
        await this.getApp().emitResult(result, this);

        return result;
    }

    onTableUpdate = async (e) => {
        console.debug('PersistentDataSource.onTableUpdate', this.getFullName(), e);
        if (this.deinited)
            throw new Error(`${this.getFullName()}: this data source deinited for onTableUpdate`);
        if (e.source === this) {
            // console.error('onTableUpdate stop self update', this.getFullName());
            return;
        }
        // console.debug('updates:', e.updates);
        if (!Object.keys(e.updates).length) throw new Error(`${this.getFullName()}: no updates`);

        // update rows
        await this.refill();

        // events
        if (this.getParent() instanceof Form) {
            this.getForm()!.onDataSourceUpdate(e);
        }
        this.emit('update', e);
    };

    onTableInsert = async (e) => {
        console.debug('PersistentDataSource.onTableInsert', this.getFullName(), e);
        if (this.deinited)
            throw new Error(`${this.getFullName()}: this data source deinited for onTableInsert`);
        if (e.source === this) {
            // console.error('onTableInsert stop self insert', this.getFullName());
            return;
        }

        // update rows
        await this.refill();

        // events
        if (this.getParent() instanceof Form) {
            this.getForm()!.onDataSourceInsert(e);
        }
        this.emit('insert', e);
    };

    onTableDelete = async (e) => {
        console.debug('PersistentDataSource.onTableDelete', this.getFullName(), e);
        if (this.deinited)
            throw new Error(`${this.getFullName()}: this data source deinited for onTableDelete`);
        if (e.source === this) {
            // console.error('onTableDelete stop self delete', this.getFullName());
            return;
        }
        await this.refill();
        if (this.getParent() instanceof Form) {
            this.getForm()!.onDataSourceDelete(e);
        }
        this.emit('delete', e);
    };

    onTableRefresh = async (e) => {
        console.debug('PersistentDataSource.onTableRefresh', this.getFullName(), e);
        if (this.deinited)
            throw new Error(`${this.getFullName()}: this data source deinited for onTableDelete`);
        if (e.source) throw new Error('refresh is foreign result so source must be null');
        await this.refill();
        if (this.getParent() instanceof Form) {
            this.getForm()!.onDataSourceRefresh(e);
        }
        this.emit('refresh', e);
    };

    getPageParams() {
        const page = this.getPage();
        return page ? page.getParams() : {};
    }

    async refresh() {
        console.debug('PersistentDataSource.refresh', this.getFullName());
        await this.refill();
        if (this.getParent() instanceof Form) {
            this.getForm()!.onDataSourceRefresh({ source: this });
        }
    }

    async refill() {
        console.debug('PersistentDataSource.refill', this.getFullName());
        if (this.isChanged())
            throw new Error(`cannot refill changed data source: ${this.getFullName()}`);
        const data = await this.select(this.getLimit() ? { frame: this.frame } : {});
        this.count = data.count;
        this.setRows(data.rows);
        this.lastFrame = 1;
    }

    async fill(frame) {
        if (this.isChanged())
            throw new Error(`cannot fill changed data source: ${this.getFullName()}`);
        const data = await this.select(this.getLimit() ? { frame } : {});
        this.count = data.count;
        this.addRows(data.rows);
    }

    async more() {
        if (!this.hasMore()) throw new Error(`${this.getFullName()}: no more rows`);
        this.lastFrame++;
        await this.fill(this.lastFrame);
    }

    async select(params: Record<string, any> = {}) {
        console.debug('PersistentDataSource.select', this.getFullName(), params);
        const page = this.getPage();
        const form = this.getForm();
        const data = await this.getApp().request('POST', {
            action: 'select',
            page: page ? page.getName() : null,
            form: form ? form.getName() : null,
            ds: this.getName(),
            params: {
                ...this.getPageParams(),
                ...params,
            },
        } as SelectActionDto);
        if (!(data.rows instanceof Array)) throw new Error('rows must be array');
        // if (data.time) console.debug(`select time of ${this.getFullName()}:`, data.time);
        return data;
    }

    isPersistent(): boolean {
        return true;
    }
}
