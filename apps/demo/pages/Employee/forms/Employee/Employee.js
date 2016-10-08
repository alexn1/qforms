QForms.inherits(EmployeeEmployeeController, RowFormController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function EmployeeEmployeeController() {
    EmployeeEmployeeController.super_.apply(this, arguments);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
EmployeeEmployeeController.prototype.init = function() {
    EmployeeEmployeeController.super_.prototype.init.call(this);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
EmployeeEmployeeController.prototype.deinit = function() {
    EmployeeEmployeeController.super_.prototype.deinit.call(this);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
EmployeeEmployeeController.prototype.getCaption = function() {
    console.log('EmployeeEmployeeController.prototype.getCaption', this.row);
    return this.model.data.caption + ': ' + this.row.first_name + ' ' + this.row.last_name;
};

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
EmployeeEmployeeController.prototype.setRowStyle = function(bodyRow, row) {
    //var fieldView = this.fields.field.views[bodyRow.qKey];
    //if (row.column === 'value') {
    //    $(fieldView).css('color', 'red');
    //} else {
    //    $(fieldView).css('color', '');
    //}
};
*/