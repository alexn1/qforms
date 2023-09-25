import { DataSource } from '../DataSource';
import {
    DeleteActionDto,
    CreateActionDto,
    JSONString,
    Key,
    Query,
    RawRow,
    ReadActionQuery,
    ReadActionResponse,
    UpdateActionDto,
    Action,
} from '../../../../../types';
import { Result } from '../../../../../Result';
import { Form } from '../../Form/Form';
import { Helper } from '../../../../common';

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

    async insert(row: RawRow): Promise<Result> {
        console.debug('PersistentDataSource.insert', row);
        const database = this.getAttr('database') as string;
        const table = this.getAttr('table') as string;
        if (table === '') throw new Error('no data source table to insert');

        const body: CreateActionDto = {
            action: Action.create,
            uuid: this.getApp().getAttr('uuid'),
            page: this.getForm()!.getPage().getName(),
            form: this.getForm()!.getName(),
            row: this.getRowWithChanges(row),
        };
        const result: Result = await this.getApp().request('POST', body);

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
        const body: UpdateActionDto = {
            action: Action.update,
            uuid: this.getApp().getAttr('uuid'),
            page: this.getForm()!.getPage().getName(),
            form: this.getForm()!.getName(),
            changes: this.getChangesByKey(),
        };
        const result: Result = await this.getApp().request2(
            'PATCH',
            window.location.pathname,
            body,
        );

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

    async delete(key: Key): Promise<Result> {
        console.debug('PersistentDataSource.delete:', this.getFullName(), key);
        if (!key) throw new Error('no key');
        const database = this.getAttr('database');
        const table = this.getAttr('table');
        if (!table) {
            throw new Error(`no table in data source: ${this.getFullName()}`);
        }
        const body: DeleteActionDto = {
            action: Action.delete,
            uuid: this.getApp().getAttr('uuid'),
            page: this.getForm()!.getPage().getName(),
            form: this.getForm()!.getName(),
            params: { key },
        };
        const result: Result = await this.getApp().request2(
            'DELETE',
            window.location.pathname,
            body,
        );
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

    onTableUpdate = async (e): Promise<void> => {
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

    onTableInsert = async (e): Promise<void> => {
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

    onTableDelete = async (e): Promise<void> => {
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

    onTableRefresh = async (e): Promise<void> => {
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

    getPageParams(): Record<string, any> {
        const page = this.getPage();
        return page ? page.getParams() : {};
    }

    async refresh(): Promise<void> {
        console.debug('PersistentDataSource.refresh', this.getFullName());
        await this.refill();
        if (this.getParent() instanceof Form) {
            this.getForm()!.onDataSourceRefresh({ source: this });
        }
    }

    async refill(): Promise<void> {
        console.debug('PersistentDataSource.refill', this.getFullName());
        if (this.isChanged())
            throw new Error(`cannot refill changed data source: ${this.getFullName()}`);
        const data = await this.select(this.getLimit() ? { frame: this.frame } : {});
        this.count = data.count;
        this.setRows(data.rows);
        this.lastFrame = 1;
    }

    async fill(frame: number): Promise<void> {
        if (this.isChanged())
            throw new Error(`cannot fill changed data source: ${this.getFullName()}`);
        const data = await this.select(this.getLimit() ? { frame } : {});
        this.count = data.count;
        this.addRows(data.rows);
    }

    async more(): Promise<void> {
        if (!this.hasMore()) throw new Error(`${this.getFullName()}: no more rows`);
        this.lastFrame++;
        await this.fill(this.lastFrame);
    }

    async select(params: Record<string, any> = {}): Promise<ReadActionResponse> {
        console.debug('PersistentDataSource.select', this.getFullName(), params);
        const page = this.getPage();
        const form = this.getForm();

        const query: ReadActionQuery = {
            action: Action.read,
            page: page ? page.getName() : undefined,
            form: form ? form.getName() : undefined,
            ds: this.getName(),
            params: Helper.encodeObject({
                ...this.getPageParams(),
                ...params,
            }),
        };
        const response = (await this.getApp().request2(
            'GET',
            `${window.location.pathname}?${Helper.queryToString(query as Query)}`,
        )) as ReadActionResponse;

        if (!(response.rows instanceof Array)) throw new Error('rows must be array');
        // if (response.time) console.debug(`select time of ${this.getFullName()}:`, response.time);
        return response;
    }

    isPersistent(): boolean {
        return true;
    }
}
