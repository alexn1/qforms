class EmployeesEmployeesfirst_nameController extends TextBoxFieldController {

    constructor(...args) {
        super(...args);
    }

    init() {
        super.init();
    }

    setViewStyle(view, row) {
        if (row.first_name === 'John') {
            $(view).css('color', 'red');
        } else {
            $(view).css('color', '');
        }
    }
}
EmployeesEmployeesfirst_nameController;