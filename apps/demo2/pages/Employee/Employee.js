QForms.inherits(EmployeeController, PageController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function EmployeeController() {
    EmployeeController.super_.apply(this, arguments);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
EmployeeController.prototype.init = function() {
    EmployeeController.super_.prototype.init.call(this);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
EmployeeController.prototype.deinit = function() {
    EmployeeController.super_.prototype.deinit.call(this);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
EmployeeController.prototype.getCaption = function() {
    return this.forms.Employee.getCaption();
};