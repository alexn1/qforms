class SqlDataSource extends DataSource {
    constructor(data, parent) {
        super(data, parent);
        this.frame  = 1;
        this.count  = data.count !== undefined ? data.count : null;
        this.lastFrame = 1;
    }

    init() {
        super.init();
        if (this.getAttr('table') !== '') {
            const table = this.getTable();
            table.on('update', this.onTableUpdate);
            table.on('insert', this.onTableInsert);
            table.on('delete', this.onTableDelete);
        }
    }

    deinit() {
        // console.log('SqlDataSource.deinit', this.getFullName(), this.getTableName());
        if (this.getAttr('table') !== '') {
            const table = this.getTable();
            table.removeListener('update', this.onTableUpdate);
            table.removeListener('insert', this.onTableInsert);
            table.removeListener('delete', this.onTableDelete);
        }
        super.deinit();
    }

    getType(columnName) {
        // console.log('SqlDataSource.getType', columnName);
        const type = this.getTable().getColumn(columnName).getType();
        // console.log('type:', type);
        return type;
    }

    /*getDbType(columnName) {
        return this.getTable().getColumn(columnName).getDbType();
    }*/

    async update() {
        console.log('SqlDataSource.update', this.getFullName());
        if (this.getAttr('table') === '') throw new Error(`data source has no table: ${this.getFullName()}`);
        if (this.news[0]) return this.insert(this.news[0]);
        if (!this.changes.size) throw new Error(`no changes: ${this.getFullName()}`);
        const result = await this.getApp().request({
            action : 'update',
            page   : this.getForm().getPage().getName(),
            form   : this.getForm().getName(),
            changes: this.getChangesByKey(),
        });
        const [key] = Object.keys(result);
        if (!key) throw new Error('no updated row');
        const newValues = result[key];
        const newKey = this.getRowKey(newValues);
        this.changes.clear();
        this.updateRow(key, newValues);
        if (this.parent.onDataSourceUpdate) {
            this.parent.onDataSourceUpdate({source: this, key});
        }
        this.emit('update', {source: this, key});
        // this.getTable().emit('update', {source: this, changes: {[key]: newKey}});
        this.getDatabase().emitResult({
            update: {
                [this.getAttr('table')]: {
                    [key]: newKey
                }
            }
        }, this);
        return newKey;
    }

    updateRow(key, newValues) {
        console.log('SqlDataSource.updateRow', this.getFullName(), key, newValues);
        if (!key) throw new Error('no key');
        const row = this.rowsByKey[key];
        if (!row) throw new Error(`${this.getFullName()}: no row with key ${key}`);
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
        if (!this.getAttr('table')) throw new Error(`${this.getFullName()}: table attr empty`);
        return this.getDatabase().getTable(this.getAttr('table'));
    }

    getDatabase() {
        if (!this.getAttr('database')) throw new Error(`${this.getFullName()}: database attr empty`);
        return this.getApp().getDatabase(this.getAttr('database'));
    }

    onTableUpdate = async (e) => {
        console.log('SqlDataSource.onTableUpdate', this.getFullName(), this.getTableName(), e);
        if (this.deinited) throw new Error(`${this.getFullName()}: this data source deinited for onTableUpdate`);
        if (e.source === this) {
            // console.error('onTableUpdate stop self update', this.getFullName());
            return;
        }
        // console.log('changes:', e.changes);
        if (!Object.keys(e.changes).length) throw new Error(`${this.getFullName()}: no changes`);
        const key = Object.keys(e.changes)[0];

        // check if updated row exists in this ds
        if (this.rowsByKey[key]) {
            const newKey = e.changes[key];
            // console.log(`key: ${key} to ${newKey}`);
            const keyParams = DataSource.keyToParams(newKey);
            const result = await this.selectSingle(keyParams);
            this.updateRow(key, result.row);
            if (this.parent.onDataSourceUpdate) {
                this.parent.onDataSourceUpdate({source: this, key});
            }
            this.emit('update', e);
        }
    }

    onTableInsert = async (e) => {
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
        this.emit('insert', e);
    }

    onTableDelete = async (e) => {
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
        this.emit('delete', e);
    }

    getPageParams() {
        const page = this.getPage();
        return page ? page.getParams() : {};
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
        const data = await this.select(this.getLimit() ? {frame : this.frame} : {});
        this.count = data.count;
        this.setRows(data.rows);
        this.lastFrame = 1;
    }

    async fill(frame) {
        if (this.isChanged()) throw new Error(`cannot fill changed data source: ${this.getFullName()}`);
        const data = await this.select(this.getLimit() ? {frame} : {});
        this.count = data.count;
        this.addRows(data.rows);
    }

    async more() {
        if (!this.hasMore()) throw new Error(`${this.getFullName()}: no more rows`);
        this.lastFrame++;
        await this.fill(this.lastFrame);
    }

    async select(params = {}) {
        console.log('SqlDataSource.select', this.getFullName(), params);
        const page = this.getPage();
        const form = this.getForm();
        const data = await this.getApp().request({
            action        : 'select',
            // parentPageName: page ? page.getParentPageName() : null,
            page          : page ? page.getName()           : null,
            form          : form ? form.getName()           : null,
            ds            : this.getName(),
            params        : Helper.encodeObject({
                ...this.getPageParams(),
                ...params,
            })
        });
        if (!(data.rows instanceof Array)) throw new Error('rows must be array');
        // if (data.time) console.log(`select time of ${this.getFullName()}:`, data.time);
        return data;
    }

    async selectSingle(params = {}) {
        console.log('SqlDataSource.selectSingle', this.getFullName(), params);
        const page = this.getPage();
        const form = this.getForm();
        const data = await this.getApp().request({
            action        : 'selectSingle',
            // parentPageName: page ? page.getParentPageName() : null,
            page          : page ? page.getName()           : null,
            form          : form ? form.getName()           : null,
            ds            : this.getName(),
            params        : Helper.encodeObject({
                ...this.getPageParams(),
                ...params,
            })
        });
        if (!data.row) throw new Error('selectSingle must return row');
        // if (data.time) console.log(`select time of ${this.getFullName()}:`, data.time);
        return data;
    }


    async insert(row) {
        console.log('SqlDataSource.insert', this.getTableName(), row);
        const table = this.getAttr('table');
        if (table === '') throw new Error('no data source table to insert');

        const result = await this.getApp().request({
            action        : 'insert',
            page          : this.getForm().getPage().getName(),
            form          : this.getForm().getName(),
            // parentPageName: this.getPage().getParentPageName(),
            params        : this.getRowWithChanges(row),
        });

        // key & values
        const [key] = Object.keys(result.insert[table]);
        if (!key) throw new Error('no inserted row key');
        const values = result.insert[table][key];
        for (const column in values) row[column] = values[column];
        // console.log('key:', key);
        // console.log('row:', row);

        // add new row to rows
        this.news.splice(this.news.indexOf(row), 1);
        // console.log('this.news:', this.news);
        this.changes.clear();
        this.addRow(row);

        // events
        if (this.parent.onDataSourceInsert) {
            this.parent.onDataSourceInsert({source: this, key});
        }
        this.emit('insert', {source: this, key});
        this.getDatabase().emitResult(result, this);
        return key;
    }



    async delete(key) {
        console.log('SqlDataSource.delete:', this.getFullName(), key);
        if (!this.getAttr('table')) {
            throw new Error(`no table in data source: ${this.getFullName()}`);
        }
        const page = this.getPage();
        const result = await this.getApp().request({
            action        : '_delete',
            page          : this.getForm().getPage().getName(),
            form          : this.getForm().getName(),
            params        : Helper.encodeObject({key}),
            // parentPageName: page ? page.getParentPageName() : null
        });
        await this.refill();
        if (this.parent.onDataSourceDelete) {
            this.parent.onDataSourceDelete({source: this, key});
        }
        this.emit('delete', {source: this, key});
        this.getDatabase().emitResult(result, this);
        return result;
    }

    getTableName() {
        if (!this.getAttr('database')) throw new Error('no database');
        if (!this.getAttr('table')) throw new Error('no table');
        return `${this.getAttr('database')}.${this.getAttr('table')}`;
    }

    getFramesCount() {
        if (this.count === null) throw new Error(`${this.getFullName()}: no count info`);
        if (this.count === 0) return 1;
        if (this.getLimit()) return Math.ceil(this.count / this.getLimit());
        return 1;
    }
    getLimit() {
        if (this.getAttr('limit')) return parseInt(this.getAttr('limit'));
        return null;
    }
    getCount() {
        if (this.count === null) throw new Error(`${this.getFullName()}: no count info`);
        return this.count;
    }
    getFrame() {
        return this.frame;
    }
    getLastFrame() {
        return this.lastFrame;
    }
    setFrame(frame) {
        this.frame = frame;
    }
    hasMore() {
        return this.lastFrame < this.getFramesCount();
    }
}
window.QForms.SqlDataSource = SqlDataSource;
