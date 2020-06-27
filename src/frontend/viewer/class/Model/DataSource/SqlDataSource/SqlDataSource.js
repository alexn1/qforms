'use strict';

class SqlDataSource extends DataSource {
    constructor(data, parent) {
        super(data, parent);
        this.offset = 0;
        this.count  = data.count;
        this.length = null;
    }

    init() {
        super.init();
        if (this.data.table !== '') {
            const table = this.getTable();
            table.on('update', this.listeners.tableUpdated = this.onTableUpdated.bind(this));
            table.on('insert', this.listeners.tableInsert  = this.onTableInsert.bind(this));
            table.on('delete', this.listeners.tableDelete  = this.onTableDelete.bind(this));
        }
    }

    deinit() {
        super.deinit();
        if (this.data.table !== '') {
            const table = this.getTable();
            table.removeListener('update', this.listeners.tableUpdated);
            table.removeListener('insert', this.listeners.tableInsert);
            table.removeListener('delete', this.listeners.tableDelete);
        }
    }

    getColumnType(column) {
        // console.log('SqlDataSource.getColumnType', column);
        const type = this.getTable().getColumn(column).getType();
        // console.log('type:', type);
        return type;
    }

    async update() {
        console.log('DataSource.update', this.getFullName());
        if (this.data.table === '') throw new Error(`data source has no table: ${this.name}`);
        if (this.news[0]) return this.insert(this.news[0]);
        if (!this.changes.size) throw new Error(`no changes: ${this.getFullName()}`);
        const data = await this.getApp().request({
            action        : 'update',
            page          : this.form.page.name,
            form          : this.form.name,
            ds            : this.name,
            changes       : this.getChangesByKey(),
        });
        const [key] = Object.keys(data);
        if (!key) throw new Error('no updated row');
        this.changes.clear();
        const newValues = data[key];
        const newKey = this.getRowKey(newValues);
        const event = this.updateRow(key, newValues);
        this.parent.onDataSourceUpdate(event);
        this.getTable().emit('update', {source: this, changes: {[key]: newKey}});
        return newKey;
    }

    updateRow(key, newValues) {
        console.log('DataSource.updateRow', this.getFullName(), key, newValues);
        if (!key) throw new Error('no key');
        const row = this.rowsByKey[key];
        if (!row) throw new Error(`${this.getFullName()}: no row with key ${key}`);
        const i = this.data.rows.indexOf(row);
        if (i === -1) throw new Error(`cannot find row: ${key}`);
        const newKey = this.getRowKey(newValues);

        // copy new values to original row object
        for (const column in row) row[column] = newValues[column];
        if (key !== newKey) {
            delete this.rowsByKey[key];
            this.rowsByKey[newKey] = row;
        }
        console.log(`key: ${key} to ${newKey}`);
        // console.log('this.rowsByKey:', this.rowsByKey);
        // console.log('this.data.rows:', this.data.rows);

        const event = {source: this, key, i};
        this.emit('rowUpdate', event);
        return event;
    }

    getTable() {
        if (!this.data.database) throw new Error(`${this.getFullName()}: database prop empty`);
        if (!this.data.table) throw new Error(`${this.getFullName()}:table prop empty`);
        return this.getApp().getDatabase(this.data.database).getTable(this.data.table);
    }

    async onTableUpdated(e) {
        console.log('DataSource.onTableUpdated', this.getFullName(), this.getFullTableName(), e);
        if (e.source === this) return;
        console.log('changes:', e.changes);
        if (!Object.keys(e.changes).length) throw new Error(`${this.getFullName()}: no changes`);
        const key = Object.keys(e.changes)[0];
        const newKey = e.changes[key];
        console.log(`key: ${key} to ${newKey}`);
        const params = DataSource.keyToParams(newKey);
        const data = await this.selectSingle(params);
        this.updateRow(key, data.row);
    }

    async refresh() {
        console.log('DataSource.refresh', this.getFullName());
        if (this.isChanged()) throw new Error(`cannot refresh changed data source: ${this.getFullName()}`);
        await this._refresh();
        this.emit('refresh', {source: this});
    }

    async onTableInsert(e) {
        console.log('DataSource.onTableInsert', e);
        await this._refresh();
        if (this.rowsByKey[e.key]) {
            this.parent.onDataSourceUpdate({source: this, key: e.key});
            this.emit('insert', {source: this, key: e.key});
        }
    }

    async onTableDelete(e) {
        console.log('DataSource.onTableDelete', e);
        await this._refresh();
    }

    async refill(params) {
        this.offset = 0;
        const data = await this.select(params);
        const _new = this.getKeysAndChilds(data.rows);
        const _old = this;
        _old.rowsByKey = _new.rowsByKey;
        _old.childs    = _new.childs;
    }

    async _refresh() {
        console.log('DataSource._refresh');
        const page = this.getPage();
        const params = page ? page.params : {};
        const data = await this.select(params);
        if (this.data.dumpFirstRowToParams === 'true') {
            this.dumpFirstRowToParams(data.rows);
        }
        const _old = this;
        const _new = this.getKeysAndChilds(data.rows);		// generate hash table with new keys
        this.sync(_old, _new, '[null]');
    }

    async frame(params, frame) {
        this.offset = (frame - 1) * this.getLimit();
        const data = await this.select(params);
        const _new = this.getKeysAndChilds(data.rows);
        const _old = this;
        _old.rowsByKey = _new.rowsByKey;
        _old.childs    = _new.childs;
        this.emit('newFrame', {source: this});
    }

    async select(params) {
        console.log('DataSource.select', this.getFullName());
        const page = this.getPage();
        const form = this.getForm();
        // const _params = QForms.merge(params, this.params);
        const _params = {...params, ...this.params};
        if (this.getLimit()) _params.offset = this.offset;
        const data = await this.getApp().request({
            action        : 'select',
            page          : page ? page.name : null,
            form          : form ? form.name : null,
            ds            : this.name,
            params        : _params,
            parentPageName: page ? page.parentPageName : null
        });
        if (!(data.rows instanceof Array)) throw new Error('rows must be array');
        if (data.time) console.log(`select time of ${this.getFullName()}:`, data.time);
        this.count  = data.count;
        this.length = data.rows.length;
        return data;
    }

    async selectSingle(params) {
        console.log('DataSource.selectSingle', this.getFullName());
        const page = this.getPage();
        const form = this.getForm();
        const _params = {...params, ...this.params};
        if (this.getLimit()) _params.offset = this.offset;
        const data = await this.getApp().request({
            action        : 'selectSingle',
            page          : page ? page.name : null,
            form          : form ? form.name : null,
            ds            : this.name,
            params        : _params,
            parentPageName: page ? page.parentPageName : null
        });
        if (!data.row) throw new Error('no row');
        if (data.time) console.log(`selectSingle time of ${this.getFullName()}:`, data.time);
        return data;
    }

    async insert(row) {
        console.log('DataSource.insert', row);
        if (this.data.table === '') throw new Error('no data source table to insert');
        const page = this.getPage();
        let args = {
            action        : 'insert',
            page          : this.form.page.name,
            form          : this.form.name,
            ds            : this.name,
            row           : this.getRowValuesWithChanges(row),
            parentPageName: page.parentPageName || null
        };
        /*
        const fileColumns = [];
        for (const column in row) {
            if (row[column] instanceof File) {
                fileColumns.push(column);
            }
        }
        if (fileColumns.length > 0) {
            const formData = new FormData();
            fileColumns.forEach((column) => {
                formData.append(column, row[column]);
                delete row[column];
            });
            formData.append('__data', JSON.stringify(data));
            args = formData;
        }
        */


        const data = await this.getApp().request(args);
        const [key] = Object.keys(data);
        if (!key) throw new Error('no inserted row key');
        console.log('key:', key);
        const values = data[key];
        for (const column in values) row[column] = values[column];
        console.log('row:', row);


        this.news.splice(this.news.indexOf(row), 1);
        this.changes.clear();
        // console.log('this.news:', this.news);

        // creating index with for rows
        const vals = this.getKeysAndChilds(this.data.rows);
        this.rowsByKey = vals.rowsByKey;
        this.childs    = vals.childs;

        // save key params for refill
        const params = QForms.keyToParams(key);
        for (const name in params) {
            this.params[name] = params[name];
        }

        const i = this.data.rows.indexOf(row);
        const event = {source: this, key, i};
        this.emit('rowUpdate', event);

        // fire insert event
        this.getTable().emit('insert', {source: this, key: key});

        return key;
    }

    async delete(key) {
        console.log('DataSource.delete:', key);
        const page = this.getPage();
        if (!this.data.table) {
            throw new Error(`no table in data source: ${this.name}`);
        }
        // check if removed row has child rows
        if (this.childs[key] !== undefined) {
            //console.log(this.childs[key]);
            alert("Row can't be removed as it contains child rows.");
            return;
        }
        const args = {
            action        : '_delete',
            page          : this.form.page.name,
            form          : this.form.name,
            ds            : this.name,
            row           : this.rowsByKey[key],
            parentPageName: page ? page.parentPageName : undefined
        };
        const data = await this.getApp().request(args);
        this.getTable().emit('delete', {source: this, key: key});
    }

    getFullTableName() {
        if (!this.data.database) throw new Error('no database');
        if (!this.data.table) throw new Error('no table');
        return `${this.data.database}.${this.data.table}`;
    }

    getFramesCount() {
        return this.getLimit() ? Math.ceil(this.count / this.getLimit()) : null;
    }

    getLimit() {
        return this.data.limit;
    }
}
