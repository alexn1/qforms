class SqlDataSource extends DataSource {
    constructor(data, parent) {
        super(data, parent);
        this.frame  = 1;
        this.count  = data.count !== undefined ? data.count : null;
        this.lastFrame = 1;
    }

    /*init() {
        super.init();
    }*/

    /*deinit() {
        // console.log('SqlDataSource.deinit', this.getFullName(), this.getTableName());
        super.deinit();
    }*/

    async insert(row) {
        console.log('SqlDataSource.insert', row);
        const database = this.getAttr('database');
        const table = this.getAttr('table');
        if (table === '') throw new Error('no data source table to insert');

        const result = await this.getApp().request({
            uuid   : this.getApp().getAttr('uuid'),
            action: 'insert',
            page  : this.getForm().getPage().getName(),
            form  : this.getForm().getName(),
            row   : this.getRowWithChanges(row),
        });

        // key & values
        const [key] = Object.keys(result[database][table].insertEx);
        if (!key) throw new Error('no inserted row key');
        const values = result[database][table].insertEx[key];
        for (const column in values) {
            row[column] = values[column];
        }
        // console.log('key:', key);
        // console.log('row:', row);

        // clear news & changes
        this.news.splice(this.news.indexOf(row), 1);
        // console.log('this.news:', this.news);
        this.changes.clear();

        // add new row to rows
        this.addRow(row);

        // events
        const event = {source : this, inserts: result[database][table].insert};
        if (this.parent.onDataSourceInsert) {
            this.parent.onDataSourceInsert(event);
        }
        this.emit('insert', event);
        this.getApp().emitResult(result, this);

        return result;
    }

    async update() {
        console.log('SqlDataSource.update', this.getFullName());
        const database = this.getAttr('database');
        const table = this.getAttr('table');
        if (table === '') throw new Error('no data source table to update');
        if (this.news[0]) {
            return await this.insert(this.news[0]);
        }
        if (!this.changes.size) throw new Error(`no changes: ${this.getFullName()}`);

        // specific to SqlDataSource
        const result = await this.getApp().request({
            uuid   : this.getApp().getAttr('uuid'),
            action : 'update',
            page   : this.getForm().getPage().getName(),
            form   : this.getForm().getName(),
            changes: this.getChangesByKey(),
        });


        const [key] = Object.keys(result[database][table].updateEx);
        if (!key) throw new Error('no updated row');
        const newValues = result[database][table].updateEx[key];
        // const newKey = this.getRowKey(newValues);

        this.changes.clear();
        this.updateRow(key, newValues);

        // events
        const event = {source: this, updates: result[database][table].update};
        if (this.parent.onDataSourceUpdate) {
            this.parent.onDataSourceUpdate(event);
        }
        this.emit('update', event);
        this.getApp().emitResult(result, this);

        return result;
    }

    async delete(key) {
        console.log('SqlDataSource.delete:', this.getFullName(), key);
        if (!key) throw new Error('no key');
        const database = this.getAttr('database');
        const table = this.getAttr('table');
        if (!table) {
            throw new Error(`no table in SqlDataSource: ${this.getFullName()}`);
        }
        const result = await this.getApp().request({
            uuid   : this.getApp().getAttr('uuid'),
            action: '_delete',
            page  : this.getForm().getPage().getName(),
            form  : this.getForm().getName(),
            params: {key},
        });
        await this.refill();

        // events
        const event = {source: this, deletes: result[database][table].delete};
        if (this.parent.onDataSourceDelete) {
            this.parent.onDataSourceDelete(event);
        }
        this.emit('delete', event);
        this.getApp().emitResult(result, this);

        return result;
    }

    onTableUpdate = async e => {
        console.log('SqlDataSource.onTableUpdate', this.getFullName(), e);
        if (this.deinited) throw new Error(`${this.getFullName()}: this data source deinited for onTableUpdate`);
        if (e.source === this) {
            // console.error('onTableUpdate stop self update', this.getFullName());
            return;
        }
        // console.log('updates:', e.updates);
        if (!Object.keys(e.updates).length) throw new Error(`${this.getFullName()}: no updates`);

        // update rows
        await this.refill();
        /*
        for (const key in e.updates) {
            // check if updated row exists in this ds
            if (this.getRow(key)) {
                const newKey = e.updates[key];
                // console.log(`key: ${key} to ${newKey}`);
                const keyParams = DataSource.keyToParams(newKey);
                const result = await this.selectSingle(keyParams);
                this.updateRow(key, result.row);
            }
        }*/

        // events
        if (this.parent.onDataSourceUpdate) {
            this.parent.onDataSourceUpdate(e);
        }
        this.emit('update', e);
    }

    onTableInsert = async (e) => {
        console.log('SqlDataSource.onTableInsert', this.getFullName(), e);
        if (this.deinited) throw new Error(`${this.getFullName()}: this data source deinited for onTableInsert`);
        if (e.source === this) {
            // console.error('onTableInsert stop self insert', this.getFullName());
            return;
        }

        // update rows
        await this.refill();

        // events
        if (this.parent.onDataSourceInsert) {
            this.parent.onDataSourceInsert(e);
        }
        this.emit('insert', e);
    }

    onTableDelete = async (e) => {
        console.log('SqlDataSource.onTableDelete', this.getFullName(), e);
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
            page          : page ? page.getName()           : null,
            form          : form ? form.getName()           : null,
            ds            : this.getName(),
            params        : {
                ...this.getPageParams(),
                ...params,
            }
        });
        if (!(data.rows instanceof Array)) throw new Error('rows must be array');
        // if (data.time) console.log(`select time of ${this.getFullName()}:`, data.time);
        return data;
    }

    /*async selectSingle(params = {}) {
        console.log('SqlDataSource.selectSingle', this.getFullName(), params);
        const page = this.getPage();
        const form = this.getForm();
        const data = await this.getApp().request({
            action: 'selectSingle',
            page  : page ? page.getName()           : null,
            form  : form ? form.getName()           : null,
            ds    : this.getName(),
            params: {
                ...this.getPageParams(),
                ...params,
            }
        });
        if (!data.row) throw new Error('selectSingle must return row');
        // if (data.time) console.log(`select time of ${this.getFullName()}:`, data.time);
        return data;
    }*/

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
