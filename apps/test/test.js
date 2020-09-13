class testController extends ApplicationController {

    constructor(...args) {
        console.log('testController.constructor');
        super(...args);
        this.menu       = null;
        this.datePicker = null;

    }

    init() {
        console.log('testController.init');
        super.init();

        const menuElement = this.view.querySelector('.MenuWidget');
        if (menuElement) {
            this.menu = new MenuWidget(menuElement);
        }

        const datePickerElement = this.view.querySelector('.DatePickerWidget');
        if (datePickerElement) {
            this.datePicker = new DatePickerWidget(datePickerElement);
            this.datePicker.selectMonth();
        }

    }

    initMenu() {}
    initStatusbar() {}
    initTab() {}
    createPages() {}

    deinit() {
        super.deinit();
    }
}
testController;