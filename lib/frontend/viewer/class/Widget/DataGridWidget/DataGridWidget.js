'use strict';

QForms.inherits(DataGridWidget, GridWidget);

////////////////////////////////////////////////////////////////////////////////////////////////////
function DataGridWidget(el, formController) {
    var self = this;
    DataGridWidget.super_.call(self, el);
    self.formController = formController;
    self.dataSource     = null;
    self.keyToBodyRow   = {}; // to fast row search by key
}

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridWidget.prototype.init = function() {
    var self = this;
    DataGridWidget.super_.prototype.init.call(self);
    self.dataSource = this.formController.model.dataSource;
    //self.dataSource.eventRefillRow.subscribe(this, 'onRefillRow');
    self.dataSource.on('refillRow', self.listeners.refillRow = self.onRefillRow.bind(self));
    //self.dataSource.eventNewRow.subscribe(this, 'onNewRow');
    self.dataSource.on('newRow', self.listeners.newRow = self.onNewRow.bind(self));
    //self.dataSource.eventRemoveRow.subscribe(this, 'onRemoveRow');
    self.dataSource.on('removeRow', self.listeners.removeRow = self.onRemoveRow.bind(self));
    //self.dataSource.eventMoveRow.subscribe(this, 'onMoveRow');
    self.dataSource.on('moveRow', self.listeners.moveRow = self.onMoveRow.bind(self));
    //self.dataSource.eventNewFrame.subscribe(this, 'onNewFrame');
    self.dataSource.on('newFrame', self.listeners.newFrame = self.onNewFrame.bind(self));
    //self.dataSource.eventInsert.subscribe(this, 'onInsert');
    self.dataSource.on('insert', self.listeners.insert = self.onInsert.bind(self));
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridWidget.prototype.createColumn = function(fieldName, headerCell) {
    var self = this;
    var fieldController = self.formController.fields[fieldName];
    var gridColumn = new DataGridColumn(self, fieldName, headerCell, fieldController);
    gridColumn.init();
    return gridColumn;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridWidget.prototype.deinit = function() {
    var self = this;
    GridWidget.prototype.deinit.call(self);
    //self.dataSource.eventRefillRow.unsubscribe(self, 'onRefillRow');
    self.dataSource.off('refillRow', self.listeners.refillRow);
    //self.dataSource.eventNewRow.unsubscribe(self, 'onNewRow');
    self.dataSource.off('newRow', self.listeners.newRow);
    //self.dataSource.eventRemoveRow.unsubscribe(self, 'onRemoveRow');
    self.dataSource.off('removeRow', self.listeners.removeRow);
    //self.dataSource.eventMoveRow.unsubscribe(self, 'onMoveRow');
    self.dataSource.off('moveRow', self.listeners.moveRow);
    //self.dataSource.eventNewFrame.unsubscribe(self, 'onNewFrame');
    self.dataSource.off('newFrame', self.listeners.newFrame);
    //self.dataSource.eventInsert.unsubscribe(this, 'onInsert');
    self.dataSource.off('insert', self.listeners.insert);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridWidget.prototype.fill = function () {
    var self = this;
    //console.log('DataGridWidget.prototype.fill');
    var rows = self.formController.model.dataSource.getRows();
    for (var i = 0; i < rows.length; i++) {
        //var row = this.dataSource.childs['[null]'].rowsByIndex[i];
        var row = rows[i];
        var key = self.dataSource.getRowKey(row);
        var bodyRow = self.createBodyRow(i);
        bodyRow.dbRow = row;
        bodyRow.qKey  = key;
        for (var fieldName in self.gridColumns) {
            var bodyCell = bodyRow.bodyCells[fieldName];
            self.gridColumns[fieldName].fieldController.fill(bodyRow.dbRow, bodyCell.firstElementChild);
        }
        self.setRowStyle(bodyRow);
        self.keyToBodyRow[key] = bodyRow;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridWidget.prototype.clear = function () {
    var self = this;
    self.removeBodyRows();
    self.keyToBodyRow = {};
};

////////////////////////////////////////////////////////////////////////////////////////////////////
GridWidget.prototype.setRowStyle = function(bodyRow) {
    var self = this;
    self.formController.setRowStyle(bodyRow, bodyRow.dbRow);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridWidget.prototype.save = function(bodyCell) {
    var self = this;
    var field = self.formController.model.fields[bodyCell.qFieldName];
    var row = bodyCell.bodyRow.dbRow;
    var value = self.gridColumns[bodyCell.qFieldName].getValue(bodyCell.firstElementChild);
    this.dataSource.setValue(
        row,
        field.data.column,
        value
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridWidget.prototype.refillRow = function(bodyRow, newIndex) {
    var self = this;
    bodyRow.qI = newIndex;
    for (var fieldName in self.gridColumns) {
        var bodyCell = bodyRow.bodyCells[fieldName];
        self.gridColumns[fieldName].fieldController.refill(bodyRow.dbRow, bodyCell.firstElementChild);
    }
    self.setRowStyle(bodyRow);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridWidget.prototype.onRefillRow = function(ea) {
    var self = this;
    var key = ea.key;
    var i   = ea.i;
    //console.log('onRefillRow: ' + key + ' ' + i);
    var bodyRow = self.keyToBodyRow[key];
    self.refillRow(bodyRow, i);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridWidget.prototype.onNewRow = function(ea) {
    var self = this;
    var i = ea.i;
    //console.log('onNewRow: ' + i);
    var row = self.dataSource.childs['[null]'].rowsByIndex[i];
    var key = self.dataSource.getRowKey(row);
    var bodyRow = self.createBodyRow(i);
    bodyRow.dbRow = row;
    bodyRow.qKey = key;
    for (var fieldName in self.gridColumns) {
        var bodyCell = bodyRow.bodyCells[fieldName];
        self.gridColumns[fieldName].fieldController.fill(bodyRow.dbRow, bodyCell.firstElementChild);
    }
    self.setRowStyle(bodyRow);
    self.keyToBodyRow[key] = bodyRow;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridWidget.prototype.onInsert = function(ea) {
    var self = this;
    var bodyRow = self.keyToBodyRow[ea.key];
    self.selectBodyRow(bodyRow);
    bodyRow.scrollIntoView();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridWidget.prototype.onRemoveRow = function(ea) {
    var self = this;
    var key = ea.key;
    var bodyRow = self.keyToBodyRow[key];
    //console.log('onRemoveRow: ' + key);
    if (self.selectedBodyRow === bodyRow) {
        self.selectedBodyRow  = null;
        self.selectedBodyCell = null;
        /*
        if (this.selectedBodyRow.nextSibling) {
            this.selectBodyRow(this.selectedBodyRow.nextSibling);
        } else if (bodyRow === this.bodyTable.lastElementChild && this.bodyTable.lastElementChild.previousSibling) {
            this.selectBodyRow(this.bodyTable.lastElementChild.previousSibling);
        } else {
            this.unselectBodyCellIfSelected();
            this.unselectBodyRowIfSelected();
        }
        */
    }
    self.bodyTable.removeChild(bodyRow);
    delete self.keyToBodyRow[key];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridWidget.prototype.onMoveRow = function(ea) {
    var self = this;
    if (ea.parentKey !== '[null]') {
        return;
    }
    var oldIndex = ea.oldIndex;
    var newIndex = ea.newIndex;
    var key      = ea.key;
    //console.log('onMoveRow: ' + key + ' ' + newIndex);
    var bodyRow = self.keyToBodyRow[key];
    QForms.moveNode(self.bodyTable, bodyRow, oldIndex, newIndex);
    self.refillRow(bodyRow, newIndex);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridWidget.prototype.onNewFrame = function(ea) {
    var self = this;
    self.clear();
    self.fill();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridWidget.prototype.getSelectedKey = function() {
    var self = this;
    return (self.selectedBodyRow !== null) ? self.selectedBodyRow.qKey : null;
};