'use strict';

class testController extends ApplicationController {

    constructor(...args) {
        console.log('testController.constructor');
        super(...args);
        this.menu                = null;
        this.datePicker          = null;
        this.dropdownDatePicker1 = null;
        this.dropdownDatePicker2 = null;
        this.statusbar           = null;
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
        const dropdownDatePickerElement1 = this.view.querySelector('#dp1');
        if (dropdownDatePickerElement1) {
            this.dropdownDatePicker1 = new DropdownDatePickerWidget(dropdownDatePickerElement1);
            this.dropdownDatePicker1.init();
            this.dropdownDatePicker1.datePicker.setMinDate([now.getFullYear(), now.getMonth(), now.getDate()]);

            this.dropdownDatePicker1.setValue(new Date(2020, 9, 20));

        }
        const dropdownDatePickerElement2 = this.view.querySelector('#dp2');
        if (dropdownDatePickerElement2) {
            this.dropdownDatePicker2 = new DropdownDatePickerWidget(dropdownDatePickerElement2);
            this.dropdownDatePicker2.init();
            this.dropdownDatePicker2.datePicker.setMinDate([now.getFullYear(), now.getMonth(), now.getDate() + 1]);
        }

        this.dropdownDatePicker1.onChange = date => {
            console.log('dropdownDatePicker1.onChange', date);
            if (date) {
                this.dropdownDatePicker2.datePicker.setMinDate([date.getFullYear(), date.getMonth(), date.getDate() + 1]);
                if (this.dropdownDatePicker2.datePicker.isDateSelected()) {
                    const secondDate = this.dropdownDatePicker2.datePicker.createSelectedDate();
                    if (secondDate.getTime() <= date.getTime()) {
                        this.dropdownDatePicker2.clear();
                    }
                }
            }
        };

        // ModalWidget
        this.view.querySelector('#openModalButton').addEventListener('click', () => {
            const el = ModalWidget.createElement('<div style="background-color: white; height: 100%;">hello world</div>');
            this.view.appendChild(el);
            new ModalWidget(el);
        });

        // DropdownButtonWidget
        const el = this.view.querySelector('.DropdownButtonWidget');
        const dropdownButtonWidget = new DropdownButtonWidget(el);

        // tooltipWidget
        const tooltipWidget = new TooltipWidget(this.view.querySelector('.TooltipWidget'));
        tooltipWidget.setTooltipText('abc');

        // button
        this.view.querySelector('#testButton').addEventListener('click', (e) => {
            console.log('testButton click');
            // console.log('this.dropdownDatePicker1.getValue()', this.dropdownDatePicker1.getValue());
            // console.log('this.dropdownDatePicker2.getValue()', this.dropdownDatePicker2.getValue());
            if (tooltipWidget.isHidden()) {
                tooltipWidget.show();
            } else {
                tooltipWidget.hide();
            }
        });

        const props = {
            items: [
                {
                    name: 'menu1',
                    title: 'Menu1',
                    items: [
                        {name: 'page1', title: 'Page 1'},
                        {name: 'page2', title: 'Page 2'},
                        {name: 'page3', title: 'Page 3'},
                    ]
                },
                {
                    name: 'menu2',
                    title: 'Menu2',
                    items: [
                        {name: 'page4', title: 'Page 4'},
                        {name: 'page5', title: 'Page 5'},
                        {name: 'page6', title: 'Page 6'},
                    ]
                }
            ],
            onClick: (menu, item) => {
                console.log('onClick:', menu, item);
            }
        };

        // menu
        const menu = ApplicationController.createReactRoot('Menu', props);
        this.view.appendChild(menu);

        // statusbar
        ReactDOM.render(React.createElement(Statusbar, {cb: statusbar => this.statusbar = statusbar}), this.view.querySelector('.Statusbar'));
        this.statusbar.setLastQueryTime(100);
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