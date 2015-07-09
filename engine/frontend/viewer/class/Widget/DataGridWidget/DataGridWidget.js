'use strict';

QForms.inherit(DataGridWidget, GridWidget);

////////////////////////////////////////////////////////////////////////////////////////////////////
function DataGridWidget(el, formController) {
    DataGridWidget.super_.call(this, el);
    this.formController = formController;
    this.dataSource     = null;
    this.keyToBodyRow   = {}; // to fast row search by key
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridWidget.prototype.init = function() {
    DataGridWidget.super_.prototype.init.call(this);
    this.dataSource = this.formController.model.dataSource;
    this.dataSource.eventRefillRow.subscribe(this, 'onRefillRow');
    this.dataSource.eventNewRow.subscribe(this, 'onNewRow');
    this.dataSource.eventRemoveRow.subscribe(this, 'onRemoveRow');
    this.dataSource.eventMoveRow.subscribe(this, 'onMoveRow');
    this.dataSource.eventNewFrame.subscribe(this, 'onNewFrame');
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
    GridWidget.prototype.deinit.call(this);
    this.dataSource.eventRefillRow.unsubscribe(this,'onRefillRow');
    this.dataSource.eventNewRow.unsubscribe(this,'onNewRow');
    this.dataSource.eventRemoveRow.unsubscribe(this,'onRemoveRow');
    this.dataSource.eventMoveRow.unsubscribe(this,'onMoveRow');
    this.dataSource.eventNewFrame.unsubscribe(this,'onNewFrame');
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridWidget.prototype.fill = function () {
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
    this.formController.setRowStyle(bodyRow,bodyRow.dbRow);
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
DataGridWidget.prototype.refillRow = function(bodyRow,newIndex) {
    bodyRow.qI = newIndex;
    for (var fieldName in this.gridColumns) {
        var bodyCell = bodyRow.bodyCells[fieldName];
        this.gridColumns[fieldName].fieldController.refill(bodyRow.dbRow,bodyCell.firstElementChild);
    }
    this.setRowStyle(bodyRow);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridWidget.prototype.onRefillRow = function(ea) {
    var key = ea.key;
    var i = ea.i;
    //console.log("onRefillRow: " + key + " " + i);
    var bodyRow = this.keyToBodyRow[key];
    this.refillRow(bodyRow,i);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridWidget.prototype.onNewRow = function(ea) {
    var i = ea.i;
    //console.log("onNewRow: " + i);
    var row = this.dataSource.childs["[null]"].rowsByIndex[i];
    var key = this.dataSource.getRowKey(row);
    var bodyRow = this.createBodyRow(i);
    bodyRow.dbRow = row;
    bodyRow.qKey = key;
    for (var fieldName in this.gridColumns) {
        var bodyCell = bodyRow.bodyCells[fieldName];
        this.gridColumns[fieldName].fieldController.fill(bodyRow.dbRow,bodyCell.firstElementChild);
    }
    this.setRowStyle(bodyRow);
    this.keyToBodyRow[key] = bodyRow;
    this.selectBodyRow(bodyRow);
    bodyRow.scrollIntoView();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridWidget.prototype.onRemoveRow = function(ea) {
    var key = ea.key;
    var bodyRow = this.keyToBodyRow[key];
    //console.log("onRemoveRow: " + key);
    if (this.selectedBodyRow === bodyRow) {
        if (this.selectedBodyRow.nextSibling) {
            this.selectBodyRow(this.selectedBodyRow.nextSibling);
        } else if (bodyRow === this.bodyTable.lastElementChild && this.bodyTable.lastElementChild.previousSibling) {
            this.selectBodyRow(this.bodyTable.lastElementChild.previousSibling);
        } else {
            this.unselectBodyCellIfSelected();
            this.unselectBodyRowIfSelected();
        }
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
    //console.log("onMoveRow: " + key + " " + newIndex);
    var bodyRow = this.keyToBodyRow[key];
    QForms.moveNode(this.bodyTable,bodyRow,oldIndex,newIndex);
    this.refillRow(bodyRow,newIndex);
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