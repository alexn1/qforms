'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////
function DataSource(name, parent, data) {
    this.name   = name;
    this.parent = parent;
    this.page   = parent instanceof Page ? parent : null;
    this.form   = parent instanceof RowForm || parent instanceof TableForm || parent instanceof TreeForm ? parent : null;
    this.data   = data;
    this.offset = 0;
    this.limit  = data.limit;
    this.count  = data.count;
    this.fullTableName = this.data.database + '.' + this.data.table;
    this.insertRow = null;
    this.updateRow = null;
    this.rowsByKey = {};						// for row search by key
    this.childs    = {};						// for child row search by key
    this.params    = {};   						// refill params of row
    this.eventChanged   = new QForms.Event(this);
    this.eventUpdated   = new QForms.Event(this);
    this.eventInsert    = new QForms.Event(this);
    this.eventNewRow    = new QForms.Event(this);
    this.eventRemoveRow = new QForms.Event(this);
    this.eventRefillRow = new QForms.Event(this);
    this.eventMoveRow   = new QForms.Event(this);		// row has been moved within list
    this.eventGoneRow   = new QForms.Event(this);		// row gone from current tree item list
    this.eventComeRow   = new QForms.Event(this);		// row come to current tree item list
    this.eventNewFrame  = new QForms.Event(this);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.init = function() {
    // делаем индексы
    var vals = this.getKeysAndChilds(this.data.rows);
    this.rowsByKey = vals.rowsByKey;
    this.childs    = vals.childs;
    if (this.data.table !== '') {
        var table = this.getApp().getTable(this.fullTableName);
        table.eventUpdated.subscribe(this, 'onTableUpdated');
        table.eventInsert.subscribe(this, 'onTableInsert');
        table.eventDelete.subscribe(this, 'onTableDelete');
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.deinit = function() {
    if (this.data.table !== '') {
        var table = this.getApp().getTable(this.fullTableName);
        table.eventUpdated.unsubscribe(this, 'onTableUpdated');
        table.eventInsert.unsubscribe(this, 'onTableInsert');
        table.eventDelete.unsubscribe(this, 'onTableDelete');
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// fill lists to find row index and child rows by row key
//
DataSource.prototype.getKeysAndChilds = function(rows) {
    var rowsByKey = {};
    var childs    = {};
    for (var i = 0; i < rows.length; i++) {
        var row       = rows[i];
        var key       = this.getRowKey(row);
        var parentKey = this.getRowParentKey(row);
        // filling
        if (rowsByKey[key]) {
            throw new Error('Dublicate key in the result set, i = ' + i + ', key = ' + key);
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
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getFramesCount = function() {
    return this.limit ? Math.ceil(this.count / this.limit) : null;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.setValue = function(row, column, value) {
    row[column] = value;
    if (this.data.table !== '') {
        if (this.insertRow === null) {
            this.updateRow = row;
        }
        this.eventChanged.fire(new QForms.EventArg(this));
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getRowKey = function(row) {
    var key = [];
    for (var i=0;i<this.data.keyColumns.length;i++) {
        key.push(row[this.data.keyColumns[i]]);
    }
    return JSON.stringify(key);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getRowParentKey = function(row) {
    var key = [];
    if (this.data.parentKeyColumns) {
        for (var i=0;i<this.data.parentKeyColumns.length;i++) {
            key.push(row[this.data.parentKeyColumns[i]]);
        }
    } else {
        key.push(null);
    }
    return JSON.stringify(key);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.setRowKey = function(row, key) {
    var values = this.splitKey(key);
    for (var name in values) {
        row[name] = values[name];
    }
    this.rowsByKey[key] = row;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.splitKey = function(key) {
    var values = {};
    var arr = JSON.parse(key);
    for (var i=0;i<arr.length;i++) {
        var columnName = this.data.keyColumns[i];
        values[columnName] = arr[i];
    }
    return values;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.update = function(callbak) {
    if (this.data.table === '') {
        return;
    }
    if (this.insertRow !== null) {
        return this.insert(this.insertRow, callbak);
    }
    if (this.updateRow === null) {
        return;
    }
    var params = {
        action:'update',
        page:this.form.page.name,
        form:this.form.name,
        ds:this.name,
        row:this.updateRow
    };
    QForms.doHttpRequest(this, params, function(data) {
        this.updateRow = null;
        this.form.page.app.tables[this.fullTableName].fireUpdated(new QForms.EventArg(this));
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.onTableUpdated = function(ea) {
    var self = this;
    this.refresh(function() {
        // data source has been updated
        self.eventUpdated.fire(new QForms.EventArg(self));
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.onTableInsert = function(ea) {
    console.log('DataSource.prototype.onTableInsert');
    console.log(ea.key);
    var self = this;
    this.refresh(function() {
        if (self.rowsByKey[ea.key]) {
            var _ea = new QForms.EventArg(this);
            _ea.key = ea.key;
            self.eventInsert.fire(_ea);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.onTableDelete = function(ea) {
    var self = this;
    this.refresh(function() {

    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.refill = function(params, callback) {
    this.offset = 0;
    var self = this;
    this._getData(params, function(data) {
        self.count = data.count;
        var vals = self.getKeysAndChilds(data.rows);
        self.rowsByKey = vals.rowsByKey;
        self.childs    = vals.childs;
        callback();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.refresh = function(callback) {
    var page = this.getPage();
    var params = (page !== null) ? page.params : {};
    var self = this;
    this._getData(params, function(data) {
        var rows = data.rows;
        if (!(rows instanceof Array)) {
            throw new Error('rows must be array.');
        }
        if (self.data.dumpFirstRowToParams === 'true') {
            self.dumpFirstRowToParams(rows);
        }
        var _old = self;
        var _new = self.getKeysAndChilds(rows);		// generate hash table with new keys
        self.sync(_old, _new, '[null]');
        //console.log(self.childs);
        callback();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype._getData = function(params, callback) {
    var page = this.getPage();
    var form = this.getForm();
    var _params = QForms.merge(params, this.params);
    if (this.limit) {
        _params['@offset'] = this.offset;
    }
    var args = {
        action: 'frame',
        page  : (page !== null ? page.name : ''),
        form  : (form !== null ? form.name : ''),
        ds    : this.name,
        params: _params
    };
    QForms.doHttpRequest(this, args, function(data) {
        callback(data);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.frame = function(params, frame) {
    this.offset = (frame - 1) * this.limit;
    var self = this;
    this._getData(params, function(data) {
        var vals = self.getKeysAndChilds(data.rows);
        self.rowsByKey = vals.rowsByKey;
        self.childs    = vals.childs;
        self.eventNewFrame.fire(new QForms.EventArg(this));
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// copy new values to data source row
//
DataSource.prototype.copyNewValues = function(oldRow, newRow) {
    for (var columnName in newRow) {
        oldRow[columnName] = newRow[columnName];
    }
};


////////////////////////////////////////////////////////////////////////////////////////////////////
// remove row from current tree item list and move it ot it's new tree item list
//
DataSource.prototype._goneRow = function(_old, _new, parentKey, i, key) {
    var newRow = _new.rowsByKey[key];
    var oldRow = _old.rowsByKey[key];
    var newParentKey = this.getRowParentKey(newRow);
    var index = _new.childs[newParentKey].keysByIndex.indexOf(key);
    this.removeFromChilds(_old.childs, parentKey, i, key);
    this.addToChilds(_old.childs, newParentKey, index, key, oldRow);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// add row to new tree item list after deleting from it old tree item list
DataSource.prototype._comeRow = function(_old, _new, parentKey, i, key) {
    var oldRow = _old.rowsByKey[key];
    var oldParentKey = this.getRowParentKey(oldRow);
    var index = _old.childs[oldParentKey].keysByIndex.indexOf(key);
    this.removeFromChilds(_old.childs, oldParentKey, index, key);
    this.addToChilds(_old.childs, parentKey, i, key, oldRow);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.removeFromChilds = function(childs, parentKey, i, key) {
    childs[parentKey].rowsByIndex.splice(i, 1);
    childs[parentKey].keysByIndex.splice(i, 1);
    delete childs[parentKey].rowsByKey[key];
    // remove empty list
    if (childs[parentKey].rowsByIndex.length === 0) {
        delete childs[parentKey];
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.addToChilds = function(childs, parentKey, i, key, row) {
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
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.moveChilds = function(childs, oldIndex, newIndex) {
    QForms.moveArrayElement(childs.rowsByIndex, oldIndex, newIndex);
    QForms.moveArrayElement(childs.keysByIndex, oldIndex, newIndex);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// tree sync algorithm
// compare old and new list, change it and send notification to every row that has been changed
// add, remove, move, come, gone for widgets to be able update it's view
//
DataSource.prototype.sync = function(_old, _new, parentKey) {
    var oldChilds = _old.childs[parentKey];
    var newChilds = _new.childs[parentKey];
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
            } else { // если ключи не равны, то
                if (!(oKey in newChilds.rowsByKey)) { // if the old key in a new local is not listed, then ...
                    if (!(oKey in _new.rowsByKey)) {  // if the old key in a new global list does not exists, then the row is removed
                        this.sync(_old, _new, oKey);
                        this.removeFromChilds(_old.childs, parentKey, i, oKey);
                        delete _old.rowsByKey[oKey];
                        this.fireRemoveRow(oKey);
                    } else {
                        this._goneRow(_old, _new, parentKey, i, oKey);
                        this.copyNewValues(_old.rowsByKey[oKey], _new.rowsByKey[oKey]);
                        var newRow = _new.rowsByKey[oKey];
                        var newParentKey = this.getRowParentKey(newRow);
                        var newIndex = _new.childs[newParentKey].keysByIndex.indexOf(oKey);
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
                        var oldRow = _old.rowsByKey[nKey];
                        var oldParentKey = this.getRowParentKey(oldRow);
                        this.fireComeRow(parentKey, nKey, oldParentKey, i);
                    }
                    i++;
                } else { // if the key is in both of local lists, then the row moved
                    var oldIndexOfNewKey = oldChilds.keysByIndex.indexOf(nKey);
                    var newIndexOfOldKey = newChilds.keysByIndex.indexOf(oKey);
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
                    var newRow = _new.rowsByKey[oKey];
                    var newParentKey = this.getRowParentKey(newRow);
                    var newIndex = _new.childs[newParentKey].keysByIndex.indexOf(oKey);
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
                    var oldRow = _old.rowsByKey[nKey];
                    var oldParentKey = this.getRowParentKey(oldRow);
                    this.fireComeRow(parentKey, nKey, oldParentKey, i);
                }
                i++;
            }
        }
    } while (nKey !== null || oKey !== null);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.fireRefillRow = function(key, i) {
    var ea = new QForms.EventArg(this);
    ea.key = key;
    ea.i = i;
    this.eventRefillRow.fire(ea);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.fireRemoveRow = function(key) {
    var ea = new QForms.EventArg(this);
    ea.key = key;
    this.eventRemoveRow.fire(ea);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.fireNewRow = function(i, parentKey, key) {
    //console.log('fireNewRow: ' + i);
    var ea = new QForms.EventArg(this);
    ea.i = i;
    ea.parentKey = parentKey;
    ea.key = key;
    this.eventNewRow.fire(ea);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.fireMoveRow = function(oldIndex, newIndex, key, parentKey) {
    var ea = new QForms.EventArg(this);
    ea.oldIndex = oldIndex;
    ea.newIndex = newIndex;
    ea.key = key;
    ea.parentKey = parentKey;
    this.eventMoveRow.fire(ea);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.fireGoneRow = function(parentKey, key, newParentKey, newIndex) {
    //console.log('fireGoneRow');
    var ea = new QForms.EventArg(this);
    ea.parentKey = parentKey;
    ea.key = key;
    ea.newParentKey = newParentKey;
    ea.newIndex = newIndex;
    this.eventGoneRow.fire(ea);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.fireComeRow = function(parentKey, key, oldParentKey, newIndex) {
    //console.log('fireComeRow');
    var ea = new QForms.EventArg(this);
    ea.parentKey = parentKey;
    ea.key = key;
    ea.oldParentKey = oldParentKey;
    ea.newIndex = newIndex;
    this.eventComeRow.fire(ea);
};


////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.insert = function(row, callback) {
    if (this.data.table === '') {
        return;
    }
    var args = {
        action: 'insert',
        page  : this.form.page.name,
        form  : this.form.name,
        ds    : this.name,
        row   : row
    };
    QForms.doHttpRequest(this, args, function(data) {
        if (row === this.insertRow) {
            this.setRowKey(this.insertRow, data.key);
            var params = QForms.keyToParams(data.key);
            // save key params for refill
            for (var name in params) {
                this.params[name] = params[name];
            }
            this.insertRow = null;
        }
        var ea = new QForms.EventArg(this);
        ea.key = data.key;
        this.form.page.app.tables[this.fullTableName].fireInsert(ea);
        if (callback) {
            callback(data.key);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.delete = function(key) {
    if (this.data.table === '') {
        return;
    }
    // check if removed row has child rows
    if (this.childs[key] !== undefined) {
        //console.log(this.childs[key]);
        alert("Row can't be removed as it contains child rows.");
        return;
    }
    var args = {
        action: '_delete',
        page  : this.form.page.name,
        form  : this.form.name,
        ds    : this.name,
        row   : this.rowsByKey[key]
    };
    QForms.doHttpRequest(this, args, function(data) {
        var ea = new QForms.EventArg(this);
        ea.key = key;
        this.form.page.app.tables[this.fullTableName].fireDelete(ea);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.newRow = function(row) {
    if (this.data.rows.length > 0) {
        throw new Error('Rows can be added to empty data sources only in new mode.');
    }
    this.insertRow = row;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getForm = function() {
    if (this.form !== null) {
        return this.form;
    } else {
        return null;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getPage = function() {
    if (this.page !== null) {
        return this.page;
    } else if (this.form !== null) {
        return this.form.page;
    } else {
        return null;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getApp = function() {
    if (this.form !== null) {
        return this.form.page.app;
    } else if (this.page !== null) {
        return this.page.app;
    } else if (this.parent instanceof Application) {
        return this.parent;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.dumpFirstRowToParams = function(rows) {
    var page = this.getPage();
    if (page !== null && rows[0] !== undefined) {
        var row = rows[0];
        var ns = this.getNamespace();
        for (var column in row) {
            var name = ns + '.' + column;
            var value = row[column];
            page.params[name] = value;
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getNamespace = function() {
    var form = this.getForm();
    var page = this.getPage();
    if (form !== null) {
        return this.form.page.name + '.' + this.form.name + '.' + this.name;
    } else if (page !== null) {
        return this.page.name + '.' + this.name;
    } else {
        this.name;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getRow = function(key) {
    return this.rowsByKey[key];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getRows = function(parentKey) {
    if (parentKey === undefined) {
        parentKey = '[null]';
    }
    return (this.childs[parentKey] !== undefined) ? this.childs[parentKey].rowsByIndex : [];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getRowByIndex = function(i) {
    if (i === 0 && this.insertRow !== null) {
        return this.insertRow;
    } else {
        return this.childs['[null]'].rowsByIndex[i];
    }
};