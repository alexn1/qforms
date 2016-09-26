'use strict';

QForms.inherit(DataGridWidget, GridWidget);

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
    DataGridWidget.super_.prototype.init.call(this);
    self.dataSource = this.formController.model.dataSource;
    //self.dataSource.eventRefillRow.subscribe(this, 'onRefillRow');
    self.dataSource.on('refillRow', self.listeners.refillRow = self.onRefillRow.bind(self));
    //self.dataSource.eventNewRow.subscribe(this, 'onNewRow');
    self.dataSource.on('newRow', self.listeners.newRow = self.onNewRow.bind(self));
    //self.dataSource.eventRemoveRow.subscribe(this, 'onRemoveRow');
    self.dataSource.on('removeRow', self.listeners.removeRow = self.onRemoveRow.bind(self));
    self.dataSource.eventMoveRow.subscribe(this, 'onMoveRow');
    self.dataSource.eventNewFrame.subscribe(this, 'onNewFrame');
    //self.dataSource.eventInsert.subscribe(this, 'onInsert');
    self.dataSource.on('insert', self.listeners.insert = self.onInsert.bind(self));
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridWidget.prototype.createColumn = function(fieldName, headerCell) {
    var fieldController = this.formController.fields[fieldName];
    var gridColumn = new DataGridColumn(this, fieldName, headerCell, fieldController);
    gridColumn.init();
    return gridColumn;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridWidget.prototype.deinit = function() {
    var self = this;
    GridWidget.prototype.deinit.call(this);
    //self.dataSource.eventRefillRow.unsubscribe(self, 'onRefillRow');
    self.dataSource.off('refillRow', self.listeners.refillRow);
    //self.dataSource.eventNewRow.unsubscribe(self, 'onNewRow');
    self.dataSource.off('newRow', self.listeners.newRow);
    //self.dataSource.eventRemoveRow.unsubscribe(self, 'onRemoveRow');
    self.dataSource.off('removeRow', self.listeners.removeRow);
    self.dataSource.eventMoveRow.unsubscribe(self, 'onMoveRow');
    self.dataSource.eventNewFrame.unsubscribe(self, 'onNewFrame');
    //self.dataSource.eventInsert.unsubscribe(this, 'onInsert');
    self.dataSource.off('insert', self.listeners.insert);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridWidget.prototype.fill = function () {
    console.log('DataGridWidget.prototype.fill');
    var rows = this.formController.model.dataSource.getRows();
    for (var i = 0; i < rows.length; i++) {
        //var row = this.dataSource.childs['[null]'].rowsByIndex[i];
        var row = rows[i];
        var key = this.dataSource.getRowKey(row);
        var bodyRow = this.createBodyRow(i);
        bodyRow.dbRow = row;
        bodyRow.qKey  = key;
        for (var fieldName in this.gridColumns) {
            var bodyCell = bodyRow.bodyCells[fieldName];
            this.gridColumns[fieldName].fieldController.fill(bodyRow.dbRow, bodyCell.firstElementChild);
        }
        this.setRowStyle(bodyRow);
        this.keyToBodyRow[key] = bodyRow;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridWidget.prototype.clear = function () {
    this.removeBodyRows();
    this.keyToBodyRow = {};
};

////////////////////////////////////////////////////////////////////////////////////////////////////
GridWidget.prototype.setRowStyle = function(bodyRow) {
    this.formController.setRowStyle(bodyRow, bodyRow.dbRow);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridWidget.prototype.save = function(bodyCell) {
    var field = this.formController.model.fields[bodyCell.qFieldName];
    var row = bodyCell.bodyRow.dbRow;
    var value = this.gridColumns[bodyCell.qFieldName].getValue(bodyCell.firstElementChild);
    this.dataSource.setValue(
        row,
        field.data.column,
        value
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridWidget.prototype.refillRow = function(bodyRow, newIndex) {
    bodyRow.qI = newIndex;
    for (var fieldName in this.gridColumns) {
        var bodyCell = bodyRow.bodyCells[fieldName];
        this.gridColumns[fieldName].fieldController.refill(bodyRow.dbRow, bodyCell.firstElementChild);
    }
    this.setRowStyle(bodyRow);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridWidget.prototype.onRefillRow = function(ea) {
    var key = ea.key;
    var i = ea.i;
    //console.log('onRefillRow: ' + key + ' ' + i);
    var bodyRow = this.keyToBodyRow[key];
    this.refillRow(bodyRow, i);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridWidget.prototype.onNewRow = function(ea) {
    var i = ea.i;
    //console.log('onNewRow: ' + i);
    var row = this.dataSource.childs['[null]'].rowsByIndex[i];
    var key = this.dataSource.getRowKey(row);
    var bodyRow = this.createBodyRow(i);
    bodyRow.dbRow = row;
    bodyRow.qKey = key;
    for (var fieldName in this.gridColumns) {
        var bodyCell = bodyRow.bodyCells[fieldName];
        this.gridColumns[fieldName].fieldController.fill(bodyRow.dbRow, bodyCell.firstElementChild);
    }
    this.setRowStyle(bodyRow);
    this.keyToBodyRow[key] = bodyRow;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridWidget.prototype.onInsert = function(ea) {
    var bodyRow = this.keyToBodyRow[ea.key];
    this.selectBodyRow(bodyRow);
    bodyRow.scrollIntoView();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridWidget.prototype.onRemoveRow = function(ea) {
    var key = ea.key;
    var bodyRow = this.keyToBodyRow[key];
    //console.log('onRemoveRow: ' + key);
    if (this.selectedBodyRow === bodyRow) {
        this.selectedBodyRow  = null;
        this.selectedBodyCell = null;
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
    this.bodyTable.removeChild(bodyRow);
    delete this.keyToBodyRow[key];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridWidget.prototype.onMoveRow = function(ea) {
    if (ea.parentKey !== '[null]') {
        return;
    }
    var oldIndex = ea.oldIndex;
    var newIndex = ea.newIndex;
    var key      = ea.key;
    //console.log('onMoveRow: ' + key + ' ' + newIndex);
    var bodyRow = this.keyToBodyRow[key];
    QForms.moveNode(this.bodyTable, bodyRow, oldIndex, newIndex);
    this.refillRow(bodyRow, newIndex);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridWidget.prototype.onNewFrame = function(ea) {
    this.clear();
    this.fill();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridWidget.prototype.getSelectedKey = function() {
    return (this.selectedBodyRow !== null) ? this.selectedBodyRow.qKey : null;
};