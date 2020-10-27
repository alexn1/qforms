'use strict';

class SqlDataSource extends DataSource {
    constructor(data, parent) {
        super(data, parent);
        this.frame  = 1;
        this.count  = data.count !== undefined ? data.count : null;
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
        // console.log('SqlDataSource.deinit', this.getFullName(), this.getTableName());
        if (this.data.table !== '') {
            const table = this.getTable();
            table.removeListener('update', this.listeners.tableUpdated);
            table.removeListener('insert', this.listeners.tableInsert);
            table.removeListener('delete', this.listeners.tableDelete);
        }
        super.deinit();
    }

    getType(column) {
        // console.log('SqlDataSource.getType', column);
        const type = this.getTable().getColumn(column).getType();
        // console.log('type:', type);
        return type;
    }

    /*static encodeChanges(changes) {
        const eChanges = {};
        for (const key in changes) {
            eChanges[key] = Helper.encodeObject(changes[key]);
        }
        return eChanges;
    }*/

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
        this.updateRow(key, newValues);
        if (this.parent.onDataSourceUpdate) {
            this.parent.onDataSourceUpdate({source: this, key: key});
        }
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
        // console.log(`key: ${key} to ${newKey}`);
        // console.log('this.rowsByKey:', this.rowsByKey);
        // console.log('this.data.rows:', this.data.rows);

        return {source: this, key};
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
            // console.error('onTableUpdated stop self update', this.getFullName());
            return;
        }
        console.log('changes:', e.changes);
        if (!Object.keys(e.changes).length) throw new Error(`${this.getFullName()}: no changes`);
        const key = Object.keys(e.changes)[0];
        const newKey = e.changes[key];
        // console.log(`key: ${key} to ${newKey}`);
        const params = DataSource.keyToParams(newKey);
        const data = await this.selectSingle(params);
        this.updateRow(key, data.row);
        if (this.parent.onDataSourceUpdate) {
            this.parent.onDataSourceUpdate({source: this, key: key});
        }
    }

    async onTableInsert(e) {
        console.log('SqlDataSource.onTableInsert', this.getFullName(), e);
        if (this.deinited) throw new Error(`${this.getFullName()}: this data source deinited for onTableInsert`);
        if (e.source === this) {
            // console.error('onTableInsert stop self insert', this.getFullName());
            return;
        }
        await this.refill();
        if (this.parent.onDataSourceInsert) {
            this.parent.onDataSourceInsert(e);
        }
    }

    async onTableDelete(e) {
        console.log('SqlDataSource.onTableDelete', this.getFullName(), this.getTableName(), e);
        if (this.deinited) throw new Error(`${this.getFullName()}: this data source deinited for onTableDelete`);
        if (e.source === this) {
            // console.error('onTableDelete stop self delete', this.getFullName());
            return;
        }
        await this.refill();
        if (this.parent.onDataSourceDelete) {
            this.parent.onDataSourceDelete(e);
        }
    }

    getPageParams() {
        const page = this.getPage();
        return page ? page.params : {};
    }

    async refresh() {
        console.log('SqlDataSource.refresh', this.getFullName());
        await this.refill();
        if (this.parent.onDataSourceRefresh) {
            this.parent.onDataSourceRefresh({source: this});
        }
    }

    async refill() {
        if (this.isChanged()) throw new Error(`cannot refill changed data source: ${this.getFullName()}`);
        const data = await this.select();
        this.count = data.count;
        this.setRows(data.rows);
    }

    async select() {
        console.log('SqlDataSource.select', this.getFullName());
        const page = this.getPage();
        const form = this.getForm();
        const data = await this.getApp().request({
            action        : 'select',
            parentPageName: page ? page.parentPageName : null,
            page          : page ? page.getName()      : null,
            form          : form ? form.getName()      : null,
            ds            : this.getName(),
            params        : Helper.encodeObject({
                ...this.params,
                ...this.getPageParams(),
                ...(this.getLimit() ? {
                    frame : this.frame,
                } : {}),
            })
        });
        if (!(data.rows instanceof Array)) throw new Error('rows must be array');
        // if (data.time) console.log(`select time of ${this.getFullName()}:`, data.time);
        return data;
    }

    async selectSingle(params) {
        console.log('SqlDataSource.selectSingle', this.getFullName());
        const page = this.getPage();
        const form = this.getForm();
        const data = await this.getApp().request({
            action        : 'selectSingle',
            parentPageName: page ? page.parentPageName : null,
            page          : page ? page.getName()      : null,
            form          : form ? form.getName()      : null,
            ds            : this.getName(),
            params        : Helper.encodeObject({
                ...this.params,
                ...this.getPageParams(),
                ...params,
            })
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
            row           : this.getRowWithChanges(row),
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
        this.addRow(row);

        // console.log('this.news:', this.news);

        // creating index with for rows
        // const vals = this.getKeysAndChilds(this.data.rows);
        /*const vals = this.getKeysAndChilds([row]);
        this.rowsByKey = vals.rowsByKey;
        this.childs    = vals.childs;*/


        // save key params for refill
        const keyParams = QForms.keyToParams(key);
        for (const name in keyParams) {
            this.params[name] = keyParams[name];
        }

        const e = {source: this, key, keyParams};
        if (this.parent.onDataSourceInsert) {
            this.parent.onDataSourceInsert(e);
        }
        this.getTable().emit('insert', e);

        return key;
    }

    addRow(row) {
        this.rows.push(row);
        const key = this.getRowKey(row);
        this.rowsByKey[key] = row;
    }

    async delete(key) {
        console.log('SqlDataSource.delete:', this.getFullName(), key);
        if (!this.data.table) {
            throw new Error(`no table in data source: ${this.getFullName()}`);
        }
        const page = this.getPage();
        const args = {
            action        : '_delete',
            page          : this.getForm().getPage().getName(),
            form          : this.getForm().getName(),
            ds            : this.getName(),
            // row           : this.getRowByKey(key),
            params        : Helper.encodeObject({key}),
            parentPageName: page ? page.parentPageName : null
        };
        const data = await this.getApp().request(args);
        // this.removeRow(key);
        await this.refill();
        if (this.parent.onDataSourceDelete) {
            this.parent.onDataSourceDelete({source: this, key: key});
        }
        this.getTable().emit('delete', {source: this, key: key});
    }

    getTableName() {
        if (!this.data.database) throw new Error('no database');
        if (!this.data.table) throw new Error('no table');
        return `${this.data.database}.${this.data.table}`;
    }

    getFramesCount() {
        if (this.count === 0) return 1;
        if (this.getLimit()) return Math.ceil(this.count / this.getLimit());
        return 1;
    }
    getLimit() {
        if (this.data.limit) return parseInt(this.data.limit);
        return null;
    }
    getCount() {
        if (this.count === null) throw new Error(`${this.getFullName()}: no count info`);
        return this.count;
    }
    getRowsLength() {
        return this.rows.length;
    }
    getFrame() {
        return this.frame;
    }
    setFrame(frame) {
        this.frame = frame;
    }
}
