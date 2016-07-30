'use strict';

QForms.inherit(DataGridColumn, GridColumn);

////////////////////////////////////////////////////////////////////////////////////////////////////
function DataGridColumn(gridWidget, fieldName, headerCell, fieldController) {
    DataGridColumn.super_.call(this, gridWidget, fieldName, headerCell);
    this.fieldController = fieldController;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridColumn.prototype.renderView = function() {
    return this.fieldController.renderView();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridColumn.prototype.setValue = function(view, value) {
    this.fieldController.setValue(value, view);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridColumn.prototype.getValue = function(view) {
    return this.fieldController.getValue(view);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridColumn.prototype.setViewStyle = function(view, row) {
    this.fieldController.setViewStyle(view, row);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridColumn.prototype.beginEdit = function(bodyCell) {
    if (this.fieldController.beginEdit(bodyCell.firstElementChild)) {
        DataGridColumn.super_.prototype.beginEdit.apply(this, arguments);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridColumn.prototype.endEdit = function(bodyCell) {
    this.fieldController.endEdit(bodyCell.firstElementChild);
    DataGridColumn.super_.prototype.endEdit.apply(this, arguments);
};