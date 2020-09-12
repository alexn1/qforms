class testController extends ApplicationController {

    constructor(...args) {
        console.log('testController.constructor');
        super(...args);
        this.datePicker = null;
    }

    init() {
        console.log('testController.init');
        super.init();

        this.datePicker = new DatePickerWidget(this.view.querySelector('.DatePickerWidget'));
        this.datePicker.selectMonth();
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