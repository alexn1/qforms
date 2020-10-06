'use strict';

class testController extends ApplicationController {

    constructor(...args) {
        console.log('testController.constructor');
        super(...args);
        this.dropdownDatePicker1 = null;
        this.dropdownDatePicker2 = null;
        this.dropdowndatepicker1 = null;
        this.dropdowndatepicker2 = null;
    }

    init() {
        console.log('testController.init');
        super.init();

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

        // dropdownButtonWidget
        const dropdownButtonWidget = new DropdownButtonWidget(this.view.querySelector('.DropdownButtonWidget'));

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

        // menu
        ApplicationController.createReactComponent(this.view.querySelector('.Menu'), Menu, {
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
        });


        // statusbar
        const statusbar = ApplicationController.createReactComponent(this.view.querySelector('.Statusbar'), Statusbar);
        statusbar.setLastQueryTime(100);

        // tooltipAlertTop
        const tooltipAlertTop = ApplicationController.createReactComponent(this.view.querySelector('#tooltipAlertTop'), Tooltip, {position: 'top', type: 'alert', hidden: false});
        tooltipAlertTop.setTipText('hello world');
        // setTimeout(() => tooltip.show(), 1000);

        // datepicker
        const datepicker = ApplicationController.createReactComponent(this.view.querySelector('#datepicker'), DatePicker, {
            // selectedMonth: [2020, 10],
            minDate: [2020, 9, 10],
            selectedDate: [2020, 9, 19],
            onDateSelected: date => {
                console.log('onDateSelected:', date);
            }
        });
        // setTimeout(() => datepicker.setSelectedDate([2020, 9, 19]), 1000);

        // dropdowndatepicker
        this.dropdowndatepicker1 = ApplicationController.createReactComponent(this.view.querySelector('#dropdowndatepicker1'), DropdownDatePicker, {
            oldDates: false,
            value: new Date(2020, 8, 1),
            onChange: date => {
                console.log('dropdowndatepicker1.onChange', date);
                if (date) {
                    this.dropdowndatepicker2.setMinDate([date.getFullYear(), date.getMonth(), date.getDate()+1]);
                } else {
                    this.dropdowndatepicker2.setMinDate(null);
                }
            }
        });

        this.dropdowndatepicker2 = ApplicationController.createReactComponent(this.view.querySelector('#dropdowndatepicker2'), DropdownDatePicker, {
            oldDates: false
        });

        const dropdownbutton = ApplicationController.createReactComponent(this.view.querySelector('#dropdownbutton'), DropdownButton);

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