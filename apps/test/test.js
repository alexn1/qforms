'use strict';

class testController extends ApplicationController {

    constructor(...args) {
        console.log('testController.constructor');
        super(...args);
        this.menu               = null;
        this.datePicker         = null;
        this.dropdownDatePicker = null;
    }

    init() {
        console.log('testController.init');
        super.init();

        const menuElement = this.view.querySelector('.MenuWidget');
        if (menuElement) {
            this.menu = new MenuWidget(menuElement);
            this.menu.onClick = (a) => {
                console.log('on click:', a);
            }
        }

        const datePickerElement = this.view.querySelector('.DatePickerWidget');
        if (datePickerElement) {
            this.datePicker = new DatePickerWidget(datePickerElement);
            this.datePicker.selectMonth();
        }

        const now = new Date();
        const dropdownDatePickerElement = this.view.querySelector('.DropdownDatePickerWidget');
        if (dropdownDatePickerElement) {
            this.dropdownDatePicker = new DropdownDatePickerWidget(dropdownDatePickerElement);
            this.dropdownDatePicker.init();
            this.dropdownDatePicker.datePicker.setMinDate([now.getFullYear(), now.getMonth(), now.getDate()]);
        }

    }

    initMenu() {}
    initTab() {}
    initStatusbar() {}
    createPages() {}

    /*deinit() {
        super.deinit();
    }*/
}
testController;