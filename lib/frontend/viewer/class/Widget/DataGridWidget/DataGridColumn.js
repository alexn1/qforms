'use strict';

QForms.inherit(DataGridColumn, GridColumn);

////////////////////////////////////////////////////////////////////////////////////////////////////
function DataGridColumn(gridWidget, fieldName, headerCell, fieldController) {
    var self = this;
    DataGridColumn.super_.call(self, gridWidget, fieldName, headerCell);
    self.fieldController = fieldController;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridColumn.prototype.renderView = function() {
    var self = this;
    return self.fieldController.renderView();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridColumn.prototype.setValue = function(view, value) {
    var self = this;
    self.fieldController.setValue(value, view);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridColumn.prototype.getValue = function(view) {
    var self = this;
    return self.fieldController.getValue(view);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridColumn.prototype.setViewStyle = function(view, row) {
    var self = this;
    self.fieldController.setViewStyle(view, row);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridColumn.prototype.beginEdit = function(bodyCell) {
    var self = this;
    if (self.fieldController.beginEdit(bodyCell.firstElementChild)) {
        DataGridColumn.super_.prototype.beginEdit.apply(self, arguments);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataGridColumn.prototype.endEdit = function(bodyCell) {
    var self = this;
    self.fieldController.endEdit(bodyCell.firstElementChild);
    DataGridColumn.super_.prototype.endEdit.apply(self, arguments);
};