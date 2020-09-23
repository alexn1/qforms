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
        console.log('SqlDataSource.deinit', this.getFullName(), this.getTableName());
        if (this.data.table !== '') {
            const table = this.getTable();
            table.removeListener('update', this.listeners.tableUpdated);
            table.removeListener('insert', this.listeners.tableInsert);
            table.removeListener('delete', this.listeners.tableDelete);
        }
        super.deinit();
    }

    getColumnType(column) {
        // console.log('SqlDataSource.getColumnType', column);
        const type = this.getTable().getColumn(column).getType();
        // console.log('type:', type);
        return type;
    }

    async update() {
        console.log('SqlDataSource.update', this.getFullName());
        if (this.data.table === '') throw new Error(`data source has no table: ${this.getName()}`);
        if (this.news[0]) return this.insert(this.news[0]);
        if (!this.changes.size) throw new Error(`no changes: ${this.getFullName()}`);
        const data = await this.getApp().request({
            action        : 'update',
            page          : this.getForm().getPage().getName(),
            form          : this.getForm().getName(),
            ds            : this.getName(),
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
        console.log('SqlDataSource.updateRow', this.getFullName(), key, newValues);
        if (!key) throw new Error('no key');
        const row = this.rowsByKey[key];
        if (!row) throw new Error(`${this.getFullName()}: no row with key ${key}`);
        /*const i = this.data.rows.indexOf(row);
        if (i === -1) {
            console.log('this.data.rows:', this.data.rows);
            throw new Error(`${this.getFullName()}: cannot find row with key ${key}`);
        }*/
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

        const event = {source: this, key};
        this.emit('rowUpdate', event);
        return event;
    }

    getTable() {
        if (!this.data.database) throw new Error(`${this.getFullName()}: database prop empty`);
        if (!this.data.table) throw new Error(`${this.getFullName()}:table prop empty`);
        return this.getApp().getDatabase(this.data.database).getTable(this.data.table);
    }

    async onTableUpdated(e) {
        console.log('SqlDataSource.onTableUpdated', this.getFullName(), this.getTableName(), e);
        if (this.deinited) throw new Error(`${this.getFullName()}: this data source deinited for onTableUpdated`);
        if (e.source === this) {
            console.error('stop self update', this.getFullName());
            return;
        }
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
        console.log('SqlDataSource.refresh', this.getFullName());
        if (this.isChanged()) throw new Error(`cannot refresh changed data source: ${this.getFullName()}`);
        await this._refresh();
        this.emit('refresh', {source: this});
    }

    async onTableInsert(e) {
        console.log('SqlDataSource.onTableInsert', this.getFullName(), e);
        if (this.deinited) throw new Error(`${this.getFullName()}: this data source deinited for onTableInsert`);
        if (e.source === this) {
            console.error('stop self insert', this.getFullName());
            return;
        }
        await this._refresh();
        console.log('this.data.rows:', this.data.rows);
        console.log('this.rowsByKey:', this.rowsByKey);
        if (!this.rowsByKey[e.key]) throw new Error(`${this.getFullName()}: no updated row in rowsByKey: ${e.key}`);
        this.parent.onDataSourceUpdate({source: this, key: e.key});
        this.emit('insert', {source: this, key: e.key});
    }

    async onTableDelete(e) {
        console.log('SqlDataSource.onTableDelete', this.getFullName(), this.getTableName(), e);
        if (this.deinited) throw new Error(`${this.getFullName()}: this data source deinited for onTableDelete`);
        if (e.source === this) {
            console.error('stop self delete', this.getFullName());
            return;
        }
        throw new Error(`${this.getFullName()}: delete remove now implemented yet`);
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
        console.log('SqlDataSource._refresh', this.getFullName());
        const page = this.getPage();
        const params = page ? page.params : {};
        const data = await this.select(params);
        // if (this.data.dumpFirstRowToParams === 'true') {
        //     this.dumpFirstRowToParams(data.rows);
        // }
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
        console.log('SqlDataSource.select', this.getFullName());
        const page = this.getPage();
        const form = this.getForm();
        // const _params = QForms.merge(params, this.params);
        const _params = {...params, ...this.params};
        if (this.getLimit()) _params.offset = this.offset;
        const data = await this.getApp().request({
            action        : 'select',
            page          : page ? page.getName() : null,
            form          : form ? form.getName() : null,
            ds            : this.getName(),
            params        : _params,
            parentPageName: page ? page.parentPageName : null
        });
        if (!(data.rows instanceof Array)) throw new Error('rows must be array');
        // if (data.time) console.log(`select time of ${this.getFullName()}:`, data.time);
        this.count  = data.count;
        this.length = data.rows.length;
        return data;
    }

    async selectSingle(params) {
        console.log('SqlDataSource.selectSingle', this.getFullName());
        const page = this.getPage();
        const form = this.getForm();
        const _params = {...params, ...this.params};
        if (this.getLimit()) _params.offset = this.offset;
        const data = await this.getApp().request({
            action        : 'selectSingle',
            page          : page ? page.getName() : null,
            form          : form ? form.getName() : null,
            ds            : this.getName(),
            params        : _params,
            parentPageName: page ? page.parentPageName : null
        });
        if (!data.row) throw new Error('no row');
        if (data.time) console.log(`selectSingle time of ${this.getFullName()}:`, data.time);
        return data;
    }

    async insert(row) {
        console.log('SqlDataSource.insert', this.getTableName(), row);
        if (this.data.table === '') throw new Error('no data source table to insert');
        const page = this.getPage();
        let args = {
            action        : 'insert',
            page          : this.getForm().getPage().getName(),
            form          : this.getForm().getName(),
            ds            : this.getName(),
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

        this.emit('rowUpdate', {source: this, key});

        // fire insert event
        this.getTable().emit('insert', {source: this, key: key});

        return key;
    }

    async delete(key) {
        console.log('SqlDataSource.delete:', this.getFullName(), key);
        const page = this.getPage();
        if (!this.data.table) {
            throw new Error(`no table in data source: ${this.getFullName()}`);
        }
        // check if removed row has child rows
        if (this.childs[key] !== undefined) {
            //console.log(this.childs[key]);
            alert("Row can't be removed as it contains child rows.");
            return;
        }
        const args = {
            action        : '_delete',
            page          : this.getForm().getPage().getName(),
            form          : this.getForm().getName(),
            ds            : this.getName(),
            row           : this.rowsByKey[key],
            parentPageName: page ? page.parentPageName : null
        };
        const data = await this.getApp().request(args);
        this.removeRow(key);
        this.fireRemoveRow(key);
        // console.log('this.data.rows:', this.data.rows);
        // console.log('this.rowsByKey:', this.rowsByKey);
        // console.log('this.childs:', this.childs);
        this.getTable().emit('delete', {source: this, key: key});
    }

    getTableName() {
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
