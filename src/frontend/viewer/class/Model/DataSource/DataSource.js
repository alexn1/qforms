'use strict';

class DataSource extends Model {

    constructor(data, parent) {
        super(data, parent);
        this.rows      = null;
        this.rowsByKey = null;						// for row search by key
        // this.childs    = {};						// for child row search by key
        this.params    = {};   						// refill params of row
        this.news      = [];                        // new rows
        this.changes   = new Map();
    }

    init() {
        // console.log('DataSource.init', this.getFullName(), this.getClassName());
        this.setRows(this.data.rows);
    }

    setRows(rows) {
        this.rows = rows;
        this.fillRowsByKey();
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

    // fill lists to find row index and child rows by row key
    /*getKeysAndChilds(rows) {
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
    }*/

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
        console.log('DataSource.setValue', this.getFullName(), column, value, typeof value);
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
        console.log('changes:', this.changes);
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
        for (let i = 0; i < this.data.keyColumns.length; i++) {
            const column = this.data.keyColumns[i];
            if (row[column] === undefined) return null;
            if (row[column] === null) throw new Error('wrong value null for data source value');
            try {
                const value = JSON.parse(row[column]);
                arr.push(value);
            } catch (err) {
                console.log('cannot parse: ', row[column]);
                throw err;
            }
        }
        return JSON.stringify(arr);
    }

    /*getRowParentKey(row) {
        const key = [];
        if (this.data.parentKeyColumns) {
            for (let i = 0; i < this.data.parentKeyColumns.length; i++) {
                key.push(row[this.data.parentKeyColumns[i]]);
            }
        } else {
            key.push(null);
        }
        return JSON.stringify(key);
    }*/

    // splitKey(key) {
    //     const values = {};
    //     const arr = JSON.parse(key);
    //     for (let i = 0; i < arr.length; i++) {
    //         const columnName = this.data.keyColumns[i];
    //         values[columnName] = arr[i];
    //     }
    //     return values;
    // }

    // copy new values to data source row
    copyNewValues(oldRow, newRow) {
        for (const columnName in newRow) {
            oldRow[columnName] = newRow[columnName];
        }
    }

    // remove row from current tree item list and move it ot it's new tree item list
    /*_goneRow(_old, _new, parentKey, i, key) {
        const newRow = _new.rowsByKey[key];
        const oldRow = _old.rowsByKey[key];
        const newParentKey = this.getRowParentKey(newRow);
        const index = _new.childs[newParentKey].keysByIndex.indexOf(key);
        this.removeFromChilds(_old.childs, parentKey, i, key);
        this.addToChilds(_old.childs, newParentKey, index, key, oldRow);
    }*/

    // add row to new tree item list after deleting from it old tree item list
    /*_comeRow(_old, _new, parentKey, i, key) {
        const oldRow = _old.rowsByKey[key];
        const oldParentKey = this.getRowParentKey(oldRow);
        const index = _old.childs[oldParentKey].keysByIndex.indexOf(key);
        this.removeFromChilds(_old.childs, oldParentKey, index, key);
        this.addToChilds(_old.childs, parentKey, i, key, oldRow);
    }*/

    /*removeFromChilds(childs, parentKey, i, key) {
        childs[parentKey].rowsByIndex.splice(i, 1);
        childs[parentKey].keysByIndex.splice(i, 1);
        delete childs[parentKey].rowsByKey[key];
        // remove empty list
        if (childs[parentKey].rowsByIndex.length === 0) {
            delete childs[parentKey];
        }
    }*/

    /*addToChilds(childs, parentKey, i, key, row) {
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
    }*/

    /*moveChilds(childs, oldIndex, newIndex) {
        QForms.moveArrayElement(childs.rowsByIndex, oldIndex, newIndex);
        QForms.moveArrayElement(childs.keysByIndex, oldIndex, newIndex);
    }*/

    // tree sync algorithm
    // compare old and new list, change it and send notification to every row that has been changed
    // add, remove, move, come, gone for widgets to be able update it's view
    //
    /*sync(_old, _new, parentKey) {
        console.log('DataSource.sync', this.getFullName(), parentKey);
        // console.log('_old:', _old);
        // console.log('_new:', _new);
        const oldChilds = _old.childs[parentKey];
        const newChilds = _new.childs[parentKey];
        if (oldChilds === undefined && newChilds === undefined) {
            return;
        }
        let nKey = null;
        let oKey = null;
        let i = 0;
        do {
            if (newChilds !== undefined) {
                nKey = i < newChilds.rowsByIndex.length ? newChilds.keysByIndex[i] : null;
            } else {
                nKey = null;
            }
            if (oldChilds !== undefined) {
                oKey = i < oldChilds.rowsByIndex.length ? oldChilds.keysByIndex[i] : null;
            } else {
                oKey = null;
            }
            if (nKey !== null && oKey !== null) { // if not reached the end of each list
                if (nKey === oKey) {
                    this.copyNewValues(oldChilds.rowsByIndex[i], newChilds.rowsByIndex[i]);
                    this.sync(_old, _new, oKey);// for the child rows
                    this.fireRefillRow(oKey);
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
    }*/

    /*fireRefillRow(key) {
        this.emit('update', {source: this, key});
    }*/

    removeRow(key) {
        const row = this.rowsByKey[key];
        if (!row) throw new Error(`${this.getFullName()}: no row with key ${key} to remove`);
        const i = this.rows.indexOf(row);
        if (i === -1) throw new Error(`${this.getFullName()}: no row with i ${i} to remove`);
        this.rows.splice(i, 1);
        delete this.rowsByKey[key];

        // remove from childs
        /*const parentKey = this.getRowParentKey(row);
        const childs = this.childs[parentKey];
        childs.keysByIndex.splice(childs.keysByIndex.indexOf(key), 1);
        childs.rowsByIndex.splice(childs.rowsByIndex.indexOf(row), 1);
        delete childs.rowsByKey[key];
        this.fireRemoveRow(key);*/
    }

    /*fireRemoveRow(key) {
        this.emit('removeRow', {source: this, key: key});
    }*/

    /*fireNewRow(i, parentKey, key) {
        //console.log('fireNewRow: ' + i);
        this.emit('newRow', {source: this, i: i, parentKey: parentKey, key: key});
    }*/

    /*fireMoveRow(oldIndex, newIndex, key, parentKey) {
        this.emit('moveRow', {source: this, oldIndex: oldIndex, newIndex: newIndex, key: key, parentKey: parentKey});
    }*/

    /*fireGoneRow(parentKey, key, newParentKey, newIndex) {
        //console.log('fireGoneRow');
        this.emit('goneRow', {source: this, parentKey: parentKey, key: key, newParentKey: newParentKey, newIndex: newIndex});
    }*/

    /*fireComeRow(parentKey, key, oldParentKey, newIndex) {
        //console.log('fireComeRow');
        this.emit('comeRow', {source: this, parentKey: parentKey, key: key, oldParentKey: oldParentKey, newIndex: newIndex});
    }*/

    newRow(row) {
        console.log('DataSource.newRow', row);
        if (this.data.rows.length > 0) {
            throw new Error('rows can be added to empty data sources only in new mode');
        }
        // this.data.rows.push(row);
        this.news.push(row);
    }

    getSingleRow() {
        // if (this.data.rows.length > 0) return this.data.rows[0];
        // if (this.data.rows[0]) return this.data.rows[0];
        if (this.news[0]) return this.news[0];
        /*const keys = Object.keys(this.rowsByKey);
        if (keys[0]) return this.rowsByKey[keys[0]];
        throw new Error('no single row');*/
        const row = this.rows[0];
        if (!row) throw new Error('no single row');
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

    // dumpFirstRowToParams(rows) {
    //     const page = this.getPage();
    //     if (page !== null && rows[0] !== undefined) {
    //         const row = rows[0];
    //         const ns = this.getNamespace();
    //         for (const column in row) {
    //             const name = ns + '.' + column;
    //             page.params[name] = row[column];
    //         }
    //     }
    // }

    getNamespace() {
        if (this.parent instanceof Form) {
            return this.parent.getPage().getName() + '.' + this.parent.getName() + '.' + this.getName();
        }
        if (this.parent instanceof Page) {
            return this.parent.getName() + '.' + this.getName();
        }
        return this.getName();
    }

    getRow(key) {
        return this.rowsByKey[key];
    }

    getRows(parentKey) {
        /*if (parentKey === undefined) {
            parentKey = '[null]';
        }
        return (this.childs[parentKey] !== undefined) ? this.childs[parentKey].rowsByIndex : [];*/
        return this.rows;
    }

    getRowByIndex(i) {
        // return this.childs['[null]'].rowsByIndex[i];
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

}
