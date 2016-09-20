'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////
function DataSource(name, parent, data) {
    var self = this;
    self.name   = name;
    self.parent = parent;
    self.page   = parent instanceof Page ? parent : null;
    self.form   = parent instanceof RowForm || parent instanceof TableForm || parent instanceof TreeForm ? parent : null;
    self.data   = data;
    self.offset = 0;
    self.limit  = data.limit;
    self.count  = data.count;
    self.length = null;
    self.fullTableName = self.data.database + '.' + self.data.table;
    self.insertRow = null;
    self.updateRow = null;
    self.rowsByKey = {};						// for row search by key
    self.childs    = {};						// for child row search by key
    self.params    = {};   						// refill params of row
    self.eventChanged   = new QForms.Event(self);
    self.eventUpdated   = new QForms.Event(self);
    self.eventRefreshed = new QForms.Event(self);
    self.eventInsert    = new QForms.Event(self);
    self.eventNewRow    = new QForms.Event(self);
    self.eventRemoveRow = new QForms.Event(self);
    self.eventRefillRow = new QForms.Event(self);
    self.eventMoveRow   = new QForms.Event(self);		// row has been moved within list
    self.eventGoneRow   = new QForms.Event(self);		// row gone from current tree item list
    self.eventComeRow   = new QForms.Event(self);		// row come to current tree item list
    self.eventNewFrame  = new QForms.Event(self);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.init = function() {
    var self = this;
    //console.log('DataSource.prototype.init', self.name);
    //console.log('limit', self.limit);
    //console.log('count', self.count);
    // creating index
    self.length = self.data.rows.length;
    var vals = self.getKeysAndChilds(self.data.rows);
    self.rowsByKey = vals.rowsByKey;
    self.childs    = vals.childs;
    if (self.data.table !== '') {
        var table = self.getApp().getTable(self.fullTableName);
        table.eventUpdated.subscribe(self, 'onTableUpdated');
        table.eventInsert.subscribe(self, 'onTableInsert');
        table.eventDelete.subscribe(self, 'onTableDelete');
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.deinit = function() {
    var self = this;
    if (self.data.table !== '') {
        var table = self.getApp().getTable(self.fullTableName);
        table.eventUpdated.unsubscribe(self, 'onTableUpdated');
        table.eventInsert.unsubscribe(self, 'onTableInsert');
        table.eventDelete.unsubscribe(self, 'onTableDelete');
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// fill lists to find row index and child rows by row key
//
DataSource.prototype.getKeysAndChilds = function(rows) {
    var self = this;
    var rowsByKey = {};
    var childs    = {};
    for (var i = 0; i < rows.length; i++) {
        var row       = rows[i];
        var key       = self.getRowKey(row);
        var parentKey = self.getRowParentKey(row);
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
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getFramesCount = function() {
    var self = this;
    return self.limit ? Math.ceil(self.count / self.limit) : null;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.setValue = function(row, column, value) {
    var self = this;
    console.log('DataSource.prototype.setValue', self.name, column, value, typeof value);
    row[column] = value !== '' ? value : null;
    if (self.data.table !== '') {
        if (self.insertRow === null) {
            self.updateRow = row;
        }
        self.eventChanged.fire(new QForms.EventArg(self));
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getRowKey = function(row) {
    var self = this;
    var key = [];
    for (var i = 0; i < self.data.keyColumns.length; i++) {
        key.push(row[self.data.keyColumns[i]]);
    }
    return JSON.stringify(key);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getRowParentKey = function(row) {
    var self = this;
    var key = [];
    if (self.data.parentKeyColumns) {
        for (var i=0;i<self.data.parentKeyColumns.length;i++) {
            key.push(row[self.data.parentKeyColumns[i]]);
        }
    } else {
        key.push(null);
    }
    return JSON.stringify(key);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.setRowKey = function(row, key) {
    var self = this;
    var values = self.splitKey(key);
    for (var name in values) {
        row[name] = values[name];
    }
    self.rowsByKey[key] = row;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.splitKey = function(key) {
    var self = this;
    var values = {};
    var arr = JSON.parse(key);
    for (var i=0;i<arr.length;i++) {
        var columnName = self.data.keyColumns[i];
        values[columnName] = arr[i];
    }
    return values;
};

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.update = function(callback) {
    var self = this;
    var page = self.getPage();
    if (self.data.table === '') {
        return;
    }
    if (self.insertRow !== null) {
        self.insert2(self.insertRow).then(function (key) {
            callback(key);
        });
        return;
    }
    if (self.updateRow === null) {
        return;
    }
    var params = {
        action        : 'update',
        page          : self.form.page.name,
        form          : self.form.name,
        ds            : self.name,
        row           : self.updateRow,
        parentPageName: page ? page.parentPageName : undefined
    };
    QForms.doHttpRequest2(params).then(function (data) {
        self.updateRow = null;
        self.form.page.app.tables[self.fullTableName].fireUpdated(new QForms.EventArg(self));
    });
};
*/

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.update2 = function() {
    var self = this;
    return Promise.try(function () {
        var page = self.getPage();
        if (self.data.table === '') {
            return null;
        }
        if (self.insertRow !== null) {
            return self.insert2(self.insertRow);
        }
        if (self.updateRow === null) {
            return null;
        }
        var params = {
            action        : 'update',
            page          : self.form.page.name,
            form          : self.form.name,
            ds            : self.name,
            row           : self.updateRow,
            parentPageName: page ? page.parentPageName : undefined
        };
        return QForms.doHttpRequest2(params).then(function (data) {
            self.updateRow = null;
            self.form.page.app.tables[self.fullTableName].fireUpdated(new QForms.EventArg(self));
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.onTableUpdated = function(ea) {
    var self = this;
    console.log('DataSource.prototype.onTableUpdated', self.fullTableName);
    self._refresh2().then(function () {
        self.eventUpdated.fire(new QForms.EventArg(self));
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.refresh = function() {
    var self = this;
    console.log('DataSource.prototype.refresh', self.name);
    return self._refresh2().then(function () {
        self.eventRefreshed.fire(new QForms.EventArg(self));
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.onTableInsert = function(ea) {
    var self = this;
    //console.log('DataSource.prototype.onTableInsert');
    //console.log(ea.key);
    self._refresh2().then(function () {
        if (self.rowsByKey[ea.key]) {
            var _ea = new QForms.EventArg(self);
            _ea.key = ea.key;
            self.eventInsert.fire(_ea);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.onTableDelete = function(ea) {
    var self = this;
    self._refresh2();
};

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.refill = function(params, callback) {
    var self = this;
    self.offset = 0;
    self._getData2(params).then(function (data) {
        self.count = data.count;
        self.length = data.rows.length;
        var vals = self.getKeysAndChilds(data.rows);
        self.rowsByKey = vals.rowsByKey;
        self.childs    = vals.childs;
        callback();
    });
};
*/

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.refill2 = function(params) {
    var self = this;
    return Promise.try(function () {
        self.offset = 0;
        return self._getData2(params).then(function (data) {
            var _new = self.getKeysAndChilds(data.rows);
            var _old = self;
            _old.rowsByKey = _new.rowsByKey;
            _old.childs    = _new.childs;
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.frame = function(params, frame) {
    var self = this;
    return Promise.try(function () {
        self.offset = (frame - 1) * self.limit;
        self._getData2(params).then(function (data) {
            var _new = self.getKeysAndChilds(data.rows);
            var _old = self;
            _old.rowsByKey = _new.rowsByKey;
            _old.childs    = _new.childs;
            self.eventNewFrame.fire(new QForms.EventArg(self));
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype._refresh2 = function() {
    var self = this;
    return Promise.try(function () {
        var page = self.getPage();
        var params = (page !== null) ? page.params : {};
        return self._getData2(params).then(function (data) {
            if (self.data.dumpFirstRowToParams === 'true') {
                self.dumpFirstRowToParams(data.rows);
            }
            var _old = self;
            var _new = self.getKeysAndChilds(data.rows);		// generate hash table with new keys
            self.sync(_old, _new, '[null]');
        });
    });
};



/*
////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype._refresh = function(callback) {
    var self = this;
    var page = self.getPage();
    var params = (page !== null) ? page.params : {};
    self._getData2(params).then(function (data) {
        self.length = data.rows.length;
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
*/



////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype._getData2 = function(params) {
    var self = this;
    console.log('DataSource.prototype._getData2', params);
    return Promise.try(function () {
        var page = self.getPage();
        var form = self.getForm();
        var _params = QForms.merge(params, self.params);
        if (self.limit) {
            _params['offset'] = self.offset;
        }
        var args = {
            action        : 'frame',
            page          : (page !== null ? page.name : ''),
            form          : (form !== null ? form.name : ''),
            ds            : self.name,
            params        : _params,
            parentPageName: page ? page.parentPageName : undefined
        };
        return QForms.doHttpRequest2(args).then(function (data) {
            console.log('data:', data);
            if (!(data.rows instanceof Array)) {
                throw new Error('rows must be array.');
            }
            self.count  = data.count;
            self.length = data.rows.length;
            return data;
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// copy new values to data source row
//
DataSource.prototype.copyNewValues = function(oldRow, newRow) {
    var self = this;
    for (var columnName in newRow) {
        oldRow[columnName] = newRow[columnName];
    }
};


////////////////////////////////////////////////////////////////////////////////////////////////////
// remove row from current tree item list and move it ot it's new tree item list
//
DataSource.prototype._goneRow = function(_old, _new, parentKey, i, key) {
    var self = this;
    var newRow = _new.rowsByKey[key];
    var oldRow = _old.rowsByKey[key];
    var newParentKey = self.getRowParentKey(newRow);
    var index = _new.childs[newParentKey].keysByIndex.indexOf(key);
    self.removeFromChilds(_old.childs, parentKey, i, key);
    self.addToChilds(_old.childs, newParentKey, index, key, oldRow);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// add row to new tree item list after deleting from it old tree item list
DataSource.prototype._comeRow = function(_old, _new, parentKey, i, key) {
    var self = this;
    var oldRow = _old.rowsByKey[key];
    var oldParentKey = self.getRowParentKey(oldRow);
    var index = _old.childs[oldParentKey].keysByIndex.indexOf(key);
    self.removeFromChilds(_old.childs, oldParentKey, index, key);
    self.addToChilds(_old.childs, parentKey, i, key, oldRow);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.removeFromChilds = function(childs, parentKey, i, key) {
    var self = this;
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
    var self = this;
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
    var self = this;
    QForms.moveArrayElement(childs.rowsByIndex, oldIndex, newIndex);
    QForms.moveArrayElement(childs.keysByIndex, oldIndex, newIndex);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// tree sync algorithm
// compare old and new list, change it and send notification to every row that has been changed
// add, remove, move, come, gone for widgets to be able update it's view
//
DataSource.prototype.sync = function(_old, _new, parentKey) {
    var self = this;
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
                self.copyNewValues(oldChilds.rowsByIndex[i], newChilds.rowsByIndex[i]);
                self.sync(_old, _new, oKey);// for the child rows
                self.fireRefillRow(oKey, i);
                i++;
            } else { // if keys not equal then
                if (!(oKey in newChilds.rowsByKey)) { // if the old key in a new local is not listed, then ...
                    if (!(oKey in _new.rowsByKey)) {  // if the old key in a new global list does not exists, then the row is removed
                        self.sync(_old, _new, oKey);
                        self.removeFromChilds(_old.childs, parentKey, i, oKey);
                        delete _old.rowsByKey[oKey];
                        self.fireRemoveRow(oKey);
                    } else {
                        self._goneRow(_old, _new, parentKey, i, oKey);
                        self.copyNewValues(_old.rowsByKey[oKey], _new.rowsByKey[oKey]);
                        var newRow = _new.rowsByKey[oKey];
                        var newParentKey = self.getRowParentKey(newRow);
                        var newIndex = _new.childs[newParentKey].keysByIndex.indexOf(oKey);
                        self.fireGoneRow(parentKey, oKey, newParentKey, newIndex);
                    }
                } else if (!(nKey in oldChilds.rowsByKey)) {  // If the new key in the old local list is not listed, then ...
                    // if the new key in the old global list does not listed, the row is added
                    if (!(nKey in _old.rowsByKey)) {
                        self.addToChilds(_old.childs, parentKey, i, nKey, newChilds.rowsByIndex[i]);
                        _old.rowsByKey[nKey] = newChilds.rowsByIndex[i];
                        self.sync(_old, _new, nKey);
                        self.fireNewRow(i, parentKey, nKey);
                    } else {
                        self._comeRow(_old, _new, parentKey, i, nKey);
                        self.copyNewValues(_old.rowsByKey[nKey], _new.rowsByKey[nKey]);
                        self.sync(_old, _new, nKey);
                        var oldRow = _old.rowsByKey[nKey];
                        var oldParentKey = self.getRowParentKey(oldRow);
                        self.fireComeRow(parentKey, nKey, oldParentKey, i);
                    }
                    i++;
                } else { // if the key is in both of local lists, then the row moved
                    var oldIndexOfNewKey = oldChilds.keysByIndex.indexOf(nKey);
                    var newIndexOfOldKey = newChilds.keysByIndex.indexOf(oKey);
                    if (Math.abs(newIndexOfOldKey - i) > Math.abs(oldIndexOfNewKey - i)) {
                        self.moveChilds(oldChilds, i, newIndexOfOldKey);
                        self.copyNewValues(oldChilds.rowsByIndex[i], newChilds.rowsByIndex[i]);
                        self.sync(_old, _new, oldChilds.keysByIndex[i]);
                        self.fireMoveRow(i, newIndexOfOldKey, oKey, parentKey);
                        i++;
                    } else {
                        self.moveChilds(oldChilds, oldIndexOfNewKey, i);
                        self.copyNewValues(oldChilds.rowsByIndex[i], newChilds.rowsByIndex[i]);
                        self.sync(_old, _new, oldChilds.keysByIndex[i]);
                        self.fireMoveRow(oldIndexOfNewKey, i, nKey, parentKey);
                        i++;
                    }
                }
            }
        } else { // if one of the lists has ended
            if (nKey === null && oKey !== null) { // if last element has been removed
                if (!(oKey in _new.rowsByKey)) { // if the old key in a new global list does not listed, then the row is removed
                    self.sync(_old, _new, oKey);
                    self.removeFromChilds(_old.childs, parentKey, i, oKey);
                    delete _old.rowsByKey[oKey];
                    self.fireRemoveRow(oKey);
                } else {
                    self._goneRow(_old, _new, parentKey, i, oKey);
                    self.copyNewValues(_old.rowsByKey[oKey], _new.rowsByKey[oKey]);
                    var newRow = _new.rowsByKey[oKey];
                    var newParentKey = self.getRowParentKey(newRow);
                    var newIndex = _new.childs[newParentKey].keysByIndex.indexOf(oKey);
                    self.fireGoneRow(parentKey, oKey, newParentKey, newIndex);
                }
            }
            if (nKey !== null && oKey === null) { // if last element appeared
                if (!(nKey in _old.rowsByKey)) { // if the new key in the old global list does not listed, the row is added
                    self.addToChilds(_old.childs, parentKey, i, nKey, newChilds.rowsByIndex[i]);
                    _old.rowsByKey[nKey] = newChilds.rowsByIndex[i];
                    self.sync(_old, _new, nKey);
                    self.fireNewRow(i, parentKey, nKey);
                } else {
                    self._comeRow(_old, _new, parentKey, i, nKey);
                    self.copyNewValues(_old.rowsByKey[nKey], _new.rowsByKey[nKey]);
                    self.sync(_old, _new, nKey);
                    var oldRow = _old.rowsByKey[nKey];
                    var oldParentKey = self.getRowParentKey(oldRow);
                    self.fireComeRow(parentKey, nKey, oldParentKey, i);
                }
                i++;
            }
        }
    } while (nKey !== null || oKey !== null);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.fireRefillRow = function(key, i) {
    var self = this;
    var ea = new QForms.EventArg(self);
    ea.key = key;
    ea.i = i;
    self.eventRefillRow.fire(ea);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.fireRemoveRow = function(key) {
    var self = this;
    var ea = new QForms.EventArg(self);
    ea.key = key;
    self.eventRemoveRow.fire(ea);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.fireNewRow = function(i, parentKey, key) {
    var self = this;
    //console.log('fireNewRow: ' + i);
    var ea = new QForms.EventArg(self);
    ea.i = i;
    ea.parentKey = parentKey;
    ea.key = key;
    self.eventNewRow.fire(ea);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.fireMoveRow = function(oldIndex, newIndex, key, parentKey) {
    var self = this;
    var ea = new QForms.EventArg(self);
    ea.oldIndex = oldIndex;
    ea.newIndex = newIndex;
    ea.key = key;
    ea.parentKey = parentKey;
    self.eventMoveRow.fire(ea);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.fireGoneRow = function(parentKey, key, newParentKey, newIndex) {
    var self = this;
    //console.log('fireGoneRow');
    var ea = new QForms.EventArg(self);
    ea.parentKey = parentKey;
    ea.key = key;
    ea.newParentKey = newParentKey;
    ea.newIndex = newIndex;
    self.eventGoneRow.fire(ea);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.fireComeRow = function(parentKey, key, oldParentKey, newIndex) {
    var self = this;
    //console.log('fireComeRow');
    var ea = new QForms.EventArg(self);
    ea.parentKey = parentKey;
    ea.key = key;
    ea.oldParentKey = oldParentKey;
    ea.newIndex = newIndex;
    self.eventComeRow.fire(ea);
};

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.insert = function(row, callback) {
    var self = this;
    var page = self.getPage();
    if (self.data.table === '') {
        return;
    }
    var data = {
        action        : 'insert',
        page          : self.form.page.name,
        form          : self.form.name,
        ds            : self.name,
        row           : row,
        parentPageName: page ? page.parentPageName : null
    };

    var fileColumns = [];
    for (var column in row) {
        if (row[column] instanceof File) {
            fileColumns.push(column);
        }
    }

    if (fileColumns.length > 0) {
        var formData = new FormData();
        fileColumns.forEach(function(column) {
            formData.append(column, row[column]);
            delete row[column];
        });
        formData.append('__data', JSON.stringify(data));
        data = formData;
    }

    QForms.doHttpRequest2(data).then(function (data) {
        // this code is actual only in new mode for row form
        if (row === self.insertRow) {
            // set row key and add inserted row to rows
            self.setRowKey(self.insertRow, data.key);
            self.data.rows.push(self.insertRow);
            self.insertRow = null;

            // creating index with for rows
            var vals = self.getKeysAndChilds(self.data.rows);
            self.rowsByKey = vals.rowsByKey;
            self.childs    = vals.childs;

            // save key params for refill
            var params = QForms.keyToParams(data.key);
            for (var name in params) {
                self.params[name] = params[name];
            }
        }

        // fire insert event
        var ea = new QForms.EventArg(self);
        ea.key = data.key;
        self.form.page.app.tables[self.fullTableName].fireInsert(ea);

        if (callback) {
            callback(data.key);
        }
    });
};
*/

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.insert2 = function(row) {
    var self = this;
    return Promise.try(function () {
        var page = self.getPage();
        if (self.data.table === '') {
            return;
        }
        var data = {
            action        : 'insert',
            page          : self.form.page.name,
            form          : self.form.name,
            ds            : self.name,
            row           : row,
            parentPageName: page ? page.parentPageName : null
        };
        var fileColumns = [];
        for (var column in row) {
            if (row[column] instanceof File) {
                fileColumns.push(column);
            }
        }
        if (fileColumns.length > 0) {
            var formData = new FormData();
            fileColumns.forEach(function(column) {
                formData.append(column, row[column]);
                delete row[column];
            });
            formData.append('__data', JSON.stringify(data));
            data = formData;
        }
        return QForms.doHttpRequest2(data).then(function (data) {

            // this code is actual only in new mode for row form
            if (row === self.insertRow) {

                // set row key and add inserted row to rows
                self.setRowKey(self.insertRow, data.key);
                self.data.rows.push(self.insertRow);
                self.insertRow = null;

                // creating index with for rows
                var vals = self.getKeysAndChilds(self.data.rows);
                self.rowsByKey = vals.rowsByKey;
                self.childs    = vals.childs;

                // save key params for refill
                var params = QForms.keyToParams(data.key);
                for (var name in params) {
                    self.params[name] = params[name];
                }
            }

            // fire insert event
            var ea = new QForms.EventArg(self);
            ea.key = data.key;
            self.form.page.app.tables[self.fullTableName].fireInsert(ea);
            return data.key;
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.delete = function(key) {
    var self = this;
    var page = self.getPage();
    if (self.data.table === '') {
        return;
    }
    // check if removed row has child rows
    if (self.childs[key] !== undefined) {
        //console.log(self.childs[key]);
        alert("Row can't be removed as it contains child rows.");
        return;
    }
    var args = {
        action        : '_delete',
        page          : self.form.page.name,
        form          : self.form.name,
        ds            : self.name,
        row           : self.rowsByKey[key],
        parentPageName: page ? page.parentPageName : undefined
    };
    QForms.doHttpRequest2(args).then(function (data) {
        var ea = new QForms.EventArg(self);
        ea.key = key;
        self.form.page.app.tables[self.fullTableName].fireDelete(ea);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.newRow = function(row) {
    var self = this;
    if (self.data.rows.length > 0) {
        throw new Error('Rows can be added to empty data sources only in new mode.');
    }
    self.insertRow = row;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getForm = function() {
    var self = this;
    if (self.form !== null) {
        return self.form;
    } else {
        return null;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getPage = function() {
    var self = this;
    if (self.page !== null) {
        return self.page;
    } else if (self.form !== null) {
        return self.form.page;
    } else {
        return null;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getApp = function() {
    var self = this;
    if (self.form !== null) {
        return self.form.page.app;
    } else if (self.page !== null) {
        return self.page.app;
    } else if (self.parent instanceof Application) {
        return self.parent;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.dumpFirstRowToParams = function(rows) {
    var self = this;
    var page = self.getPage();
    if (page !== null && rows[0] !== undefined) {
        var row = rows[0];
        var ns = self.getNamespace();
        for (var column in row) {
            var name = ns + '.' + column;
            var value = row[column];
            page.params[name] = value;
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getNamespace = function() {
    var self = this;
    var form = self.getForm();
    var page = self.getPage();
    if (form !== null) {
        return self.form.page.name + '.' + self.form.name + '.' + self.name;
    } else if (page !== null) {
        return self.page.name + '.' + self.name;
    } else {
        self.name;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getRow = function(key) {
    var self = this;
    return self.rowsByKey[key];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getRows = function(parentKey) {
    var self = this;
    if (parentKey === undefined) {
        parentKey = '[null]';
    }
    return (self.childs[parentKey] !== undefined) ? self.childs[parentKey].rowsByIndex : [];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getRowByIndex = function(i) {
    var self = this;
    if (i === 0 && self.insertRow !== null) {
        return self.insertRow;
    } else {
        return self.childs['[null]'].rowsByIndex[i];
    }
};