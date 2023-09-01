class EmployeeController extends PageController {

    constructor(...args) {
        super(...args);
    }

    init() {
        super.init();
    }

    deinit() {
        super.deinit();
    }

    getCaption() {
        return this.forms.Employee.getCaption();
    }

}
EmployeeController;