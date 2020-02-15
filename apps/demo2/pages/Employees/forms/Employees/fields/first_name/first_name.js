QForms.inherits(EmployeesEmployeesfirst_nameController, TextBoxFieldController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function EmployeesEmployeesfirst_nameController() {
    EmployeesEmployeesfirst_nameController.super_.apply(this, arguments);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
EmployeesEmployeesfirst_nameController.prototype.init = function() {
    EmployeesEmployeesfirst_nameController.super_.prototype.init.call(this);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
EmployeesEmployeesfirst_nameController.prototype.setViewStyle = function(view, row) {
    if (row.first_name === 'John') {
        $(view).css('color', 'red');
    } else {
        $(view).css('color', '');
    }    
};