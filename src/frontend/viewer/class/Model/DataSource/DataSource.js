'use strict';

class DataSource extends Model {
    constructor(name, parent, data) {
        super(data, parent);
        this.page   = parent instanceof Page ? parent : null;
        this.form   = parent instanceof RowForm || parent instanceof TableForm || parent instanceof TreeForm ? parent : null;
        this.offset = 0;
        this.limit  = data.limit;
        this.count  = data.count;
        this.length = null;
        this.insertRow = null;
        this.rowsByKey = {};						// for row search by key
        this.childs    = {};						// for child row search by key
        this.params    = {};   						// refill params of row
        this.changes   = {};                        // changed rows
    }

    init() {
        console.log('DataSource.init', this.getFullName(), this.data.class);
        //console.log('limit', this.limit);
        //console.log('count', this.count);
        // creating index
        this.length = this.data.rows.length;
        const vals = this.getKeysAndChilds(this.data.rows);
        this.rowsByKey = vals.rowsByKey;
        this.childs    = vals.childs;
        if (this.data.table !== '') {
            const table = this.getTable();
            table.on('update', this.listeners.tableUpdated = this.onTableUpdated.bind(this));
            table.on('insert', this.listeners.tableInsert  = this.onTableInsert.bind(this));
            table.on('delete', this.listeners.tableDelete  = this.onTableDelete.bind(this));
        }
    }

    deinit() {
        if (this.data.table !== '') {
            const table = this.getTable();
            table.removeListener('update', this.listeners.tableUpdated);
            table.removeListener('insert', this.listeners.tableInsert);
            table.removeListener('delete', this.listeners.tableDelete);
        }
    }

    // fill lists to find row index and child rows by row key
    getKeysAndChilds(rows) {
        const rowsByKey = {};
        const childs    = {};
        for (let i = 0; i < rows.length; i++) {
            const row       = rows[i];
            const key       = this.getRowKey(row);
            const parentKey = this.getRowParentKey(row);
            // filling
            if (rowsByKey[key]) {
                throw new Error('Duplicate key in the result set, i = ' + i + ', key = ' + key);
            }
            rowsByKey[key] = row;
            if (!childs[parentKey]) {
                childs[parentKey] = {
                    rowsByIndex: [],
                    keysByIndex: [],
                    rowsByKey  : {}
                };
            }
            childs[parentKey].rowsByIndex.push(row);
            childs[parentKey].keysByIndex.push(key);
            childs[parentKey].rowsByKey[key] = row;
        }
        return {
            childs   : childs,
            rowsByKey: rowsByKey
        };
    }

    getFramesCount() {
        return this.limit ? Math.ceil(this.count / this.limit) : null;
    }

    getColumnType(column) {
        // console.log('DataSource.getColumnType', column);
        const type = this.getTable().getColumn(column).getType();
        // console.log('type:', type);
        return type;
    }

    getNewValue(row, column, value) {
        if (typeof value === 'string' && value.trim() === '') return null;
        if (this.getColumnType(column) === 'number' && !isNaN(Number(value))) return Number(value);
        return value;
    }

    setValue(row, column, value) {
        console.log('DataSource.setValue', this.getFullName(), column, value, typeof value);
        const newValue = this.getNewValue(row, column, value);
        console.log('newValue:', newValue, typeof newValue);
        if (this.insertRow) {
            if (this.insertRow !== row) throw new Error('wrong insert row');
            row[column] = newValue;
            console.log('row:', row);
        } else {
            const key = this.getRowKey(row);
            if (!this.compareValue(row, column, newValue)) {
                if (!this.changes[key]) this.changes[key] = {};
                this.changes[key][column] = newValue;
            } else {
                if (this.changes[key] && this.changes[key][column]) {
                    delete this.changes[key][column];
                }
            }
            if (this.changes[key] && !Object.keys(this.changes[key]).length) delete this.changes[key];
            console.log('changes:', Object.keys(this.changes).length, this.changes);
        }
        return newValue;
    }

    compareValue(row, column, newValue) {
        const type = this.getColumnType(column);
        if (type === 'object') {
            return JSON.stringify(row[column]) === JSON.stringify(newValue);
        }
        return row[column] === newValue;
    }

    isChanged() {
        // console.log('DataSource.isChanged', this.getFullName());
        if (this.insertRow) return true;
        return !!Object.keys(this.changes).length;
    }

    isRowColumnChanged(row, column) {
        // console.log('DataSource.isRowColumnChanged', this.name);
        return row[column] !== this.getValue(row, column);
    }

    getValue(row, column) {
        // console.log('DataSource.getValue', column);
        const key = this.getRowKey(row);
        if (this.changes[key] && this.changes[key][column]) {
            return this.changes[key][column];
        }
        const value = row[column];
        // console.log('DataSource.getValue:', value);
        return value;
    }

    getKeyValues(row) {
        return this.data.keyColumns.reduce((key, column) => {
            key[column] = row[column];
            return key;
        }, {});
    }

    getRowKey(row) {
        // console.log('DataSource.getRowKey', row);
        const arr = [];
        for (let i = 0; i < this.data.keyColumns.length; i++) {
            const column = this.data.keyColumns[i];
            const value = row[column];
            if (value === null || value === undefined) return null;
            arr.push(value);
        }
        return JSON.stringify(arr);
    }

    getRowParentKey(row) {
        const key = [];
        if (this.data.parentKeyColumns) {
            for (let i = 0; i < this.data.parentKeyColumns.length; i++) {
                key.push(row[this.data.parentKeyColumns[i]]);
            }
        } else {
            key.push(null);
        }
        return JSON.stringify(key);
    }

    setRowKey(row, key) {
        const values = this.splitKey(key);
        for (const name in values) {
            row[name] = values[name];
        }
        this.rowsByKey[key] = row;
    }

    splitKey(key) {
        const values = {};
        const arr = JSON.parse(key);
        for (let i = 0; i < arr.length; i++) {
            const columnName = this.data.keyColumns[i];
            values[columnName] = arr[i];
        }
        return values;
    }

    async update() {
        console.log('DataSource.update', this.getFullName());
        if (this.data.table === '') throw new Error(`data source has no table: ${this.name}`);
        if (this.insertRow !== null) return this.insert(this.insertRow);
        if (!Object.keys(this.changes).length) throw new Error(`no changes: ${this.getFullName()}`);
        const data = await this.getApp().request({
            action        : 'update',
            page          : this.form.page.name,
            form          : this.form.name,
            ds            : this.name,
            changes       : this.changes,
        });
        const [key] = Object.keys(data);
        if (!key) throw new Error('no updated row');
        this.changes = {};
        const newValues = data[key];
        const newKey = this.getRowKey(newValues);
        const event = this.updateRow(key, newValues);
        this.parent.onDataSourceUpdate(event);
        this.getTable().emit('update', {source: this, changes: {[key]: newKey}});
        return newKey;
    }

    updateRow(key, newValues) {
        console.log('DataSource.updateRow', this.getFullName(), key, newValues);
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
        if (!this.data.database) throw new Error('no database');
        if (!this.data.table) throw new Error('no table');
        return this.getApp().databases[this.data.database].tables[this.data.table];
    }

    async onTableUpdated(e) {
        console.log('DataSource.onTableUpdated', this.getFullName(), this.getFullTableName(), e);
        if (e.source === this) return;
        console.log('changes:', e.changes);
        if (!Object.keys(e.changes).length) throw new Error('no changes');
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
        this.offset = (frame - 1) * this.limit;
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
        if (this.limit) _params.offset = this.offset;
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
        if (this.limit) _params.offset = this.offset;
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

    // copy new values to data source row
    copyNewValues(oldRow, newRow) {
        for (const columnName in newRow) {
            oldRow[columnName] = newRow[columnName];
        }
    }

    // remove row from current tree item list and move it ot it's new tree item list
    _goneRow(_old, _new, parentKey, i, key) {
        const newRow = _new.rowsByKey[key];
        const oldRow = _old.rowsByKey[key];
        const newParentKey = this.getRowParentKey(newRow);
        const index = _new.childs[newParentKey].keysByIndex.indexOf(key);
        this.removeFromChilds(_old.childs, parentKey, i, key);
        this.addToChilds(_old.childs, newParentKey, index, key, oldRow);
    }

    // add row to new tree item list after deleting from it old tree item list
    _comeRow(_old, _new, parentKey, i, key) {
        const oldRow = _old.rowsByKey[key];
        const oldParentKey = this.getRowParentKey(oldRow);
        const index = _old.childs[oldParentKey].keysByIndex.indexOf(key);
        this.removeFromChilds(_old.childs, oldParentKey, index, key);
        this.addToChilds(_old.childs, parentKey, i, key, oldRow);
    }

    removeFromChilds(childs, parentKey, i, key) {
        childs[parentKey].rowsByIndex.splice(i, 1);
        childs[parentKey].keysByIndex.splice(i, 1);
        delete childs[parentKey].rowsByKey[key];
        // remove empty list
        if (childs[parentKey].rowsByIndex.length === 0) {
            delete childs[parentKey];
        }
    }

    addToChilds(childs, parentKey, i, key, row) {
        if (childs[parentKey] === undefined) {
            childs[parentKey] = {
                rowsByIndex:[],
                keysByIndex:[],
                rowsByKey:{}
            };
        }
        childs[parentKey].rowsByIndex.splice(i, 0, row);
        childs[parentKey].keysByIndex.splice(i, 0, key);
        childs[parentKey].rowsByKey[key] = row;
    }

    moveChilds(childs, oldIndex, newIndex) {
        QForms.moveArrayElement(childs.rowsByIndex, oldIndex, newIndex);
        QForms.moveArrayElement(childs.keysByIndex, oldIndex, newIndex);
    }

    // tree sync algorithm
    // compare old and new list, change it and send notification to every row that has been changed
    // add, remove, move, come, gone for widgets to be able update it's view
    //
    sync(_old, _new, parentKey) {
        const oldChilds = _old.childs[parentKey];
        const newChilds = _new.childs[parentKey];
        if (oldChilds === undefined && newChilds === undefined) {
            return;
        }
        var nKey = oKey = null, i = 0;
        do {
            if (newChilds !== undefined) {
                var nKey = i < newChilds.rowsByIndex.length ? newChilds.keysByIndex[i] : null;
            } else {
                var nKey = null;
            }
            if (oldChilds !== undefined) {
                var oKey = i < oldChilds.rowsByIndex.length ? oldChilds.keysByIndex[i] : null;
            } else {
                var oKey = null;
            }
            if (nKey !== null && oKey !== null) { // if not reached the end of each list
                if (nKey === oKey) {
                    this.copyNewValues(oldChilds.rowsByIndex[i], newChilds.rowsByIndex[i]);
                    this.sync(_old, _new, oKey);// for the child rows
                    this.fireRefillRow(oKey, i);
                    i++;
                } else { // if keys not equal then
                    if (!(oKey in newChilds.rowsByKey)) { // if the old key in a new local is not listed, then ...
                        if (!(oKey in _new.rowsByKey)) {  // if the old key in a new global list does not exists, then the row is removed
                            this.sync(_old, _new, oKey);
                            this.removeFromChilds(_old.childs, parentKey, i, oKey);
                            delete _old.rowsByKey[oKey];
                            this.fireRemoveRow(oKey);
                        } else {
                            this._goneRow(_old, _new, parentKey, i, oKey);
                            this.copyNewValues(_old.rowsByKey[oKey], _new.rowsByKey[oKey]);
                            const newRow = _new.rowsByKey[oKey];
                            const newParentKey = this.getRowParentKey(newRow);
                            const newIndex = _new.childs[newParentKey].keysByIndex.indexOf(oKey);
                            this.fireGoneRow(parentKey, oKey, newParentKey, newIndex);
                        }
                    } else if (!(nKey in oldChilds.rowsByKey)) {  // If the new key in the old local list is not listed, then ...
                        // if the new key in the old global list does not listed, the row is added
                        if (!(nKey in _old.rowsByKey)) {
                            this.addToChilds(_old.childs, parentKey, i, nKey, newChilds.rowsByIndex[i]);
                            _old.rowsByKey[nKey] = newChilds.rowsByIndex[i];
                            this.sync(_old, _new, nKey);
                            this.fireNewRow(i, parentKey, nKey);
                        } else {
                            this._comeRow(_old, _new, parentKey, i, nKey);
                            this.copyNewValues(_old.rowsByKey[nKey], _new.rowsByKey[nKey]);
                            this.sync(_old, _new, nKey);
                            const oldRow = _old.rowsByKey[nKey];
                            const oldParentKey = this.getRowParentKey(oldRow);
                            this.fireComeRow(parentKey, nKey, oldParentKey, i);
                        }
                        i++;
                    } else { // if the key is in both of local lists, then the row moved
                        const oldIndexOfNewKey = oldChilds.keysByIndex.indexOf(nKey);
                        const newIndexOfOldKey = newChilds.keysByIndex.indexOf(oKey);
                        if (Math.abs(newIndexOfOldKey - i) > Math.abs(oldIndexOfNewKey - i)) {
                            this.moveChilds(oldChilds, i, newIndexOfOldKey);
                            this.copyNewValues(oldChilds.rowsByIndex[i], newChilds.rowsByIndex[i]);
                            this.sync(_old, _new, oldChilds.keysByIndex[i]);
                            this.fireMoveRow(i, newIndexOfOldKey, oKey, parentKey);
                            i++;
                        } else {
                            this.moveChilds(oldChilds, oldIndexOfNewKey, i);
                            this.copyNewValues(oldChilds.rowsByIndex[i], newChilds.rowsByIndex[i]);
                            this.sync(_old, _new, oldChilds.keysByIndex[i]);
                            this.fireMoveRow(oldIndexOfNewKey, i, nKey, parentKey);
                            i++;
                        }
                    }
                }
            } else { // if one of the lists has ended
                if (nKey === null && oKey !== null) { // if last element has been removed
                    if (!(oKey in _new.rowsByKey)) { // if the old key in a new global list does not listed, then the row is removed
                        this.sync(_old, _new, oKey);
                        this.removeFromChilds(_old.childs, parentKey, i, oKey);
                        delete _old.rowsByKey[oKey];
                        this.fireRemoveRow(oKey);
                    } else {
                        this._goneRow(_old, _new, parentKey, i, oKey);
                        this.copyNewValues(_old.rowsByKey[oKey], _new.rowsByKey[oKey]);
                        const newRow = _new.rowsByKey[oKey];
                        const newParentKey = this.getRowParentKey(newRow);
                        const newIndex = _new.childs[newParentKey].keysByIndex.indexOf(oKey);
                        this.fireGoneRow(parentKey, oKey, newParentKey, newIndex);
                    }
                }
                if (nKey !== null && oKey === null) { // if last element appeared
                    if (!(nKey in _old.rowsByKey)) { // if the new key in the old global list does not listed, the row is added
                        this.addToChilds(_old.childs, parentKey, i, nKey, newChilds.rowsByIndex[i]);
                        _old.rowsByKey[nKey] = newChilds.rowsByIndex[i];
                        this.sync(_old, _new, nKey);
                        this.fireNewRow(i, parentKey, nKey);
                    } else {
                        this._comeRow(_old, _new, parentKey, i, nKey);
                        this.copyNewValues(_old.rowsByKey[nKey], _new.rowsByKey[nKey]);
                        this.sync(_old, _new, nKey);
                        const oldRow = _old.rowsByKey[nKey];
                        const oldParentKey = this.getRowParentKey(oldRow);
                        this.fireComeRow(parentKey, nKey, oldParentKey, i);
                    }
                    i++;
                }
            }
        } while (nKey !== null || oKey !== null);
    }

    fireRefillRow(key, i) {
        this.emit('rowUpdate', {source: this, key: key, i: i});
    }

    fireRemoveRow(key) {
        this.emit('removeRow', {source: this, key: key});
    }

    fireNewRow(i, parentKey, key) {
        //console.log('fireNewRow: ' + i);
        this.emit('newRow', {source: this, i: i, parentKey: parentKey, key: key});
    }

    fireMoveRow(oldIndex, newIndex, key, parentKey) {
        this.emit('moveRow', {source: this, oldIndex: oldIndex, newIndex: newIndex, key: key, parentKey: parentKey});
    }

    fireGoneRow(parentKey, key, newParentKey, newIndex) {
        //console.log('fireGoneRow');
        this.emit('goneRow', {source: this, parentKey: parentKey, key: key, newParentKey: newParentKey, newIndex: newIndex});
    }

    fireComeRow(parentKey, key, oldParentKey, newIndex) {
        //console.log('fireComeRow');
        this.emit('comeRow', {source: this, parentKey: parentKey, key: key, oldParentKey: oldParentKey, newIndex: newIndex});
    }

    async insert(row) {
        console.log('DataSource.insert', row);
        if (this.data.table === '') throw new Error('no data source table to insert');
        const page = this.getPage();
        let data = {
            action        : 'insert',
            page          : this.form.page.name,
            form          : this.form.name,
            ds            : this.name,
            row           : row,
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
            data = formData;
        }
        */
        const data2 = await this.getApp().request(data);

        /*
        // this code is actual only in new mode for row form
        if (row === this.insertRow) {

            // set row key and add inserted row to rows
            this.setRowKey(this.insertRow, data2.key);
            this.data.rows.push(this.insertRow);
            this.insertRow = null;

            // creating index with for rows
            const vals = this.getKeysAndChilds(this.data.rows);
            this.rowsByKey = vals.rowsByKey;
            this.childs    = vals.childs;

            // save key params for refill
            const params = QForms.keyToParams(data2.key);
            for (const name in params) {
                this.params[name] = params[name];
            }
        }*/

        // fire insert event
        // this.getTable().emit('insert', {source: this, key: data2.key});
        return data2.key;
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

    newRow(row) {
        console.log('DataSource.newRow', row);
        if (this.data.rows.length > 0) {
            throw new Error('Rows can be added to empty data sources only in new mode.');
        }
        this.insertRow = row;
    }

    getSingleRow() {
        if (this.insertRow) return this.insertRow;
        if (this.data.rows.length > 0) return this.data.rows[0];
        throw new Error('no single row');
    }

    getForm() {
        return this.form;
    }

    getPage() {
        if (this.page !== null) {
            return this.page;
        } else if (this.form !== null) {
            return this.form.page;
        } else {
            return null;
        }
    }

    getApp() {
        if (this.form !== null) {
            return this.form.page.app;
        } else if (this.page !== null) {
            return this.page.app;
        } else if (this.parent instanceof Application) {
            return this.parent;
        }
    }

    dumpFirstRowToParams(rows) {
        const page = this.getPage();
        if (page !== null && rows[0] !== undefined) {
            const row = rows[0];
            const ns = this.getNamespace();
            for (const column in row) {
                const name = ns + '.' + column;
                page.params[name] = row[column];
            }
        }
    }

    getNamespace() {
        const form = this.getForm();
        const page = this.getPage();
        if (form !== null) {
            return this.form.page.name + '.' + this.form.name + '.' + this.name;
        } else if (page !== null) {
            return this.page.name + '.' + this.name;
        } else {
            return this.name;
        }
    }

    getRow(key) {
        return this.rowsByKey[key];
    }

    getRows(parentKey) {
        if (parentKey === undefined) {
            parentKey = '[null]';
        }
        return (this.childs[parentKey] !== undefined) ? this.childs[parentKey].rowsByIndex : [];
    }

    getRowByIndex(i) {
        if (i === 0 && this.insertRow !== null) {
            return this.insertRow;
        } else {
            return this.childs['[null]'].rowsByIndex[i];
        }
    }

    getFullName() {
        return `${this.parent.getFullName()}.${this.name}`;
    }

    discard() {
        console.log('DataSource.discard', this.getFullName());
        if (this.insertRow) throw new Error('discard not allowed in insert mode');
        if (!this.isChanged()) throw new Error(`no changes in data source ${this.getFullName()}`);
        const key = Object.keys(this.changes)[0];
        const columns = Object.keys(this.changes[key]);
        this.changes = {};
        // this.emit('discard', {source: this, columns});
        return columns;
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

    getFullTableName() {
        if (!this.data.database) throw new Error('no database');
        if (!this.data.table) throw new Error('no table');
        return `${this.data.database}.${this.data.table}`;
    }
}
