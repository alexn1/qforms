class DataSource extends Model {

    constructor(data, parent) {
        super(data, parent);
        this.rows      = null;
        this.rowsByKey = null;						// for row search by key
        this.news      = [];                        // new rows
        this.changes   = new Map();
    }

    init() {
        // console.log('DataSource.init', this.getFullName(), this.getClassName());
        this.setRows(this.data.rows);
        if (this.getAttr('table')) {
            const table = this.getTable();
            table.on('insert', this.onTableInsert);
            table.on('update', this.onTableUpdate);
            table.on('delete', this.onTableDelete);
        }
    }

    deinit() {
        if (this.getAttr('table')) {
            const table = this.getTable();
            table.off('insert', this.onTableInsert);
            table.off('update', this.onTableUpdate);
            table.off('delete', this.onTableDelete);
        }
        super.deinit();
    }

    setRows(rows) {
        this.rows = rows;
        this.fillRowsByKey();
    }

    addRow(row) {
        this.rows.push(row);
        const key = this.getRowKey(row);
        this.rowsByKey[key] = row;
    }

    addRows(rows) {
        for (let i = 0; i < rows.length; i++) {
            this.rows.push(rows[i]);
        }
        this.fillRowsByKey();
    }

    getRowsLength() {
        return this.rows.length;
    }

    fillRowsByKey() {
        // console.log('DataSource.fillRowsByKey', this.getFullName())
        this.rowsByKey = {};
        for (let i = 0; i < this.rows.length; i++) {
            const row = this.rows[i];
            const key = this.getRowKey(row);
            this.rowsByKey[key] = row;
        }
        // console.log('this.rowsByKey:', this.getFullName(), this.rowsByKey);
    }

    // deinit() {
    //     console.log('DataSource.deinit', this.getFullName());
    //     super.deinit();
    // }

    getType(column) {
        // console.log('DataSource.getType', this.getClassName(), column);
        throw new Error('DataSource column type not implemented');
    }

    discardRowColumn(row, column) {
        if (this.changes.has(row) && this.changes.get(row)[column] !== undefined) {
            delete this.changes.get(row)[column];
        }
    }

    changeRowColumn(row, column, newValue) {
        if (!this.changes.has(row)) this.changes.set(row, {});
        this.changes.get(row)[column] = newValue;
    }

    setValue(row, column, value) {
        // console.log('DataSource.setValue', this.getFullName(), column, value, typeof value);
        if (value === undefined) throw new Error(`${this.getFullName()}: undefined is wrong value for data source`);
        if (typeof value === 'object' && value !== null) {
            throw new Error(`setValue: ${this.getFullName()}.${column}: object must be in JSON format`);
        }
        if (row[column] !== value) {
            this.changeRowColumn(row, column, value);
            if (row[column] === undefined && value === null) {  // workaround for new rows
                this.discardRowColumn(row, column);
            }
        } else {
            this.discardRowColumn(row, column);
        }
        if (this.changes.has(row) && !Object.keys(this.changes.get(row)).length) this.changes.delete(row);
        // console.log('changes:', this.changes);
    }

    isChanged() {
        // console.log('DataSource.isChanged', this.getFullName());
        return !!this.changes.size;
    }

    hasNew() {
        return !!this.news.length;
    }

    isRowColumnChanged(row, column) {
        // console.log('DataSource.isRowColumnChanged', this.getFullName());
        return row[column] !== this.getValue(row, column);
    }

    getValue(row, column) {
        // console.log('DataSource.getValue', column);
        let value;
        if (this.changes.has(row) && this.changes.get(row)[column] !== undefined) {
            value = this.changes.get(row)[column];
        } else {
            value = row[column];
        }
        if (value !== undefined && typeof value !== 'string') {
            throw new Error(`getValue: ${this.getFullName()}.${column}: object must be in JSON format, value: ${value}`);
        }
        // console.log('DataSource.getValue:', value);
        return value;
    }

    getKeyValues(row) {
        return this.data.keyColumns.reduce((key, column) => {
            key[column] = JSON.parse(row[column]);
            return key;
        }, {});
    }

    getRowKey(row) {
        // console.log('DataSource.getRowKey', row);
        const arr = [];
        for (const column of this.data.keyColumns) {
            if (row[column] === undefined) return null;
            if (row[column] === null) throw new Error('wrong value null for data source value');
            try {
                const value = JSON.parse(row[column]);
                arr.push(value);
            } catch (err) {
                console.log('getRowKey: cannot parse: ', row[column]);
                throw err;
            }
        }
        return JSON.stringify(arr);
    }

    removeRow(key) {
        const row = this.rowsByKey[key];
        if (!row) throw new Error(`${this.getFullName()}: no row with key ${key} to remove`);
        const i = this.rows.indexOf(row);
        if (i === -1) throw new Error(`${this.getFullName()}: no row with i ${i} to remove`);
        this.rows.splice(i, 1);
        delete this.rowsByKey[key];
    }

    newRow(row) {
        console.log('DataSource.newRow', this.getFullName(), row);
        if (this.rows.length > 0) {
            throw new Error('rows can be added to empty data sources only in new mode');
        }
        this.news.push(row);
    }

    getSingleRow(withChanges = false) {
        if (this.news[0]) return this.news[0];
        const row = this.rows[0];
        if (!row) throw new Error('no single row');
        if (withChanges) return this.getRowWithChanges(row);
        return row;
    }

    getForm() {
        return this.parent instanceof Form ? this.parent : null;
    }

    getPage() {
        if (this.parent instanceof Page) return this.parent;
        if (this.parent instanceof Form) return this.parent.getPage();
        return null;
    }

    getApp() {
        if (this.parent instanceof Application) return this.parent;
        return this.parent.getApp();
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

    getRow(key) {
        return this.rowsByKey[key];
    }

    getRows() {
        return this.rows;
    }

    getRowByIndex(i) {
        return this.rows[i];
    }

    getRowByKey(key) {
        return this.rowsByKey[key] || null;
    }

    discard() {
        console.log('DataSource.discard', this.getFullName());
        if (!this.isChanged()) throw new Error(`no changes in data source ${this.getFullName()}`);
        this.changes.clear();
    }

    static keyToParams(key, paramName = 'key') {
        if (typeof key !== 'string') throw new Error('key not string');
        const params = {};
        const arr = JSON.parse(key);
        if (arr.length === 1) {
            params[paramName] = arr[0];
        } else  if (arr.length > 1) {
            for (let i = 0; i < arr.length; i++) {
                params[`${paramName}${i + 1}`] = arr[i];
            }
        } else {
            throw new Error(`invalid key: ${key}`);
        }
        return params;
    }

    getChangesByKey() {
        const changes = {};
        for (const row of this.changes.keys()) {
            changes[this.getRowKey(row)] = this.changes.get(row);
        }
        return changes;
    }

    getRowWithChanges(row) {
        if (this.changes.has(row)) {
            return {...row, ...this.changes.get(row)};
        }
        return row;
    }

    hasNewRows() {
        return this.news.length > 0;
    }

    static copyNewValues(row, newValues) {
        for (const name in newValues) {
            row[name] = newValues[name];
        }
    }

    updateRow(key, newValues) {
        console.log('DataSource.updateRow', this.getFullName(), key, newValues);
        if (!key) throw new Error('no key');
        const row = this.rowsByKey[key];
        if (!row) throw new Error(`${this.getFullName()}: no row with key ${key}`);
        const newKey = this.getRowKey(newValues);
        DataSource.copyNewValues(row, newValues);// copy new values to original row object
        if (key !== newKey) {
            delete this.rowsByKey[key];
            this.rowsByKey[newKey] = row;
        }
        // console.log(`key: ${key} to ${newKey}`);
        // console.log('this.rowsByKey:', this.rowsByKey);
        // console.log('this.data.rows:', this.data.rows);
    }

    getTable() {
        if (!this.getAttr('table')) throw new Error(`${this.getFullName()}: table attr empty`);
        return this.getDatabase().getTable(this.getAttr('table'));
    }

    getDatabase() {
        // console.log('DataSource.getDatabase', this.getFullName(), this.getAttr('database'));
        if (!this.getAttr('database')) throw new Error(`${this.getFullName()}: database attr empty`);
        return this.getApp().getDatabase(this.getAttr('database'));
    }

    /*getTableName() {
        if (!this.getAttr('database')) throw new Error('no database');
        if (!this.getAttr('table')) throw new Error('no table');
        return `${this.getAttr('database')}.${this.getAttr('table')}`;
    }*/

    getType(columnName) {
        // console.log('DataSource.getType', columnName);
        const type = this.getTable().getColumn(columnName).getType();
        // console.log('type:', type);
        return type;
    }

    async insert() {
        console.log('DataSource.insert', this.news);
        if (!this.news.length) throw new Error('no new rows to insert');
        const inserts = [];
        for (const row of this.news) {
            const newValues = this.getRowWithChanges(row);
            // console.log('newValues:', newValues);
            DataSource.copyNewValues(row, newValues);
            // console.log('row:', row);
            const key = this.getRowKey(row);
            if (!key) throw new Error('invalid insert row, no key');
            // console.log('key:', key);
            inserts.push(key);
        }
        this.changes.clear();
        for (const row of this.news) {
            this.addRow(row);
        }
        this.news = [];
        console.log('rows:', this.getRows());
        console.log('inserts:', inserts);

        // events
        if (this.parent.onDataSourceInsert) {
            this.parent.onDataSourceInsert({source: this, inserts});
        }
        this.emit('insert', {source: this, inserts});
        const table = this.getAttr('table');
        if (table) {
            this.getDatabase().emitResult({
                insert: {[table]: inserts}
            }, this);
        }
    }

    async delete(row) {
        console.log('DataSource.delete', row);
        if (!row) throw new Error('no row');
        const i = this.getRows().indexOf(row);
        console.log('i:', i);
        const key = this.getRowKey(row);
        if (i === -1) throw new Error(`${this.getFullName()}: no row to delete: ${key}`);
        this.getRows().splice(i, 1);

        // events
        const deletes = [key];
        if (this.parent.onDataSourceDelete) {
            this.parent.onDataSourceDelete({source: this, deletes});
        }
        this.emit('delete', {source: this, deletes});
        const table = this.getAttr('table');
        if (table) {
            this.getDatabase().emitResult({
                'delete': {[table]: deletes}
            }, this);
        }
    }

    async update() {
        console.log('DataSource.update', this.getFullName());
        if (this.news.length) {
            await this.insert();
            return;
        }
        if (!this.changes.size) throw new Error(`no changes: ${this.getFullName()}`);
        const changes = this.getChangesByKey();
        // console.log('changes:', changes);

        // apply changes to rows
        const updates = {};
        for (const key in changes) {
            // console.log('key:', key);
            const row = this.getRowByKey(key);
            // console.log('row:', row);
            const newValues = this.getRowWithChanges(row);
            // console.log('newValues:', newValues);
            const newKey = this.getRowKey(newValues);
            // console.log('newKey:', newKey);
            this.updateRow(key, newValues);
            updates[key] = newKey;
        }
        this.changes.clear();

        // events
        if (this.parent.onDataSourceUpdate) {
            this.parent.onDataSourceUpdate({source: this, updates});
        }
        this.emit('update', {source: this, updates});
        if (this.getAttr('table')) {
            this.getDatabase().emitResult({
                update: {
                    [this.getAttr('table')]: updates
                }
            }, this);
        }
    }

    onTableInsert = async e => {
        if (this.deinited) throw new Error(`${this.getFullName()}: this data source deinited for onTableUpdate`);
        if (e.source === this) {
            // console.error('onTableInsert stop self insert', this.getFullName());
            return;
        }
        console.log('DataSource.onTableInsert', this.getFullName(), e);
        if (!e.inserts.length) throw new Error(`${this.getFullName()}: no inserts`);

        for (const key of e.inserts) {
            if (this.rowsByKey[key]) throw new Error('row already in this data source');
            const newValues = e.source.getRowByKey(key);
            const newRow = {};
            DataSource.copyNewValues(newRow, newValues);
            // console.log('newRow:', newRow);
            this.addRow(newRow);
        }

        // events
        if (this.parent.onDataSourceInsert) {
            this.parent.onDataSourceInsert(e);
        }
        this.emit('insert', e);
    }

    onTableUpdate = async e => {
        if (this.deinited) throw new Error(`${this.getFullName()}: this data source deinited for onTableUpdate`);
        if (e.source === this) {
            // console.error('onTableUpdate stop self update', this.getFullName());
            return;
        }
        console.log('DataSource.onTableUpdate', this.getFullName(), e);
        if (!Object.keys(e.updates).length) throw new Error(`${this.getFullName()}: no updates`);
        for (const key in e.updates) {
            if (this.rowsByKey[key]) {
                const newKey = e.updates[key];
                const sourceRow = e.source.getRowByKey(newKey);
                this.updateRow(key, sourceRow);
            }
        }

        // events
        if (this.parent.onDataSourceUpdate) {
            this.parent.onDataSourceUpdate(e);
        }
        this.emit('update', e);
    }

    onTableDelete = async e => {
        if (this.deinited) throw new Error(`${this.getFullName()}: this data source deinited for onTableDelete`);
        if (e.source === this) {
            // console.error('onTableDelete stop self update', this.getFullName());
            return;
        }
        console.log('DataSource.onTableDelete', this.getFullName(), e);
        if (!e.deletes.length) throw new Error(`${this.getFullName()}: no deletes`);
        for (const key of e.deletes) {
            const row = this.rowsByKey[key];
            if (row) {
                const i = this.getRows().indexOf(row);
                console.log('i:', i);
                if (i === -1) throw new Error(`${this.getFullName()}: no row to delete: ${key}`);
                this.getRows().splice(i, 1);
            }
        }

        // events
        if (this.parent.onDataSourceDelete) {
            this.parent.onDataSourceDelete(e);
        }
        this.emit('delete', e);

    }

}
window.QForms.DataSource = DataSource;
