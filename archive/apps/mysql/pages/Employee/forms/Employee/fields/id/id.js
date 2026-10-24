class EmployeeEmployeeidController extends LinkFieldController {

    constructor(...args) {
        super(...args);
    }

    init() {
        super.init();
        this.on('click', this.listeners.on_click = this.on_click.bind(this));
    }

    setViewStyle(view, row) {

    }

    on_click(e) {
        console.log('EmployeeEmployeeidController.on_click', e);
    }

}
EmployeeEmployeeidController;
