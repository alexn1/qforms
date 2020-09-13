class testController extends ApplicationController {

    constructor(...args) {
        console.log('testController.constructor');
        super(...args);
        this.datePicker = null;
    }

    init() {
        console.log('testController.init');
        super.init();

        const el = this.view.querySelector('.DatePickerWidget');
        if (el) {
            this.datePicker = new DatePickerWidget(el);
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