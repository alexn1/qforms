'use strict';

class testController extends ApplicationController {

    constructor(...args) {
        console.log('testController.constructor');
        super(...args);
        this.dropdowndatepicker1 = null;
        this.dropdowndatepicker2 = null;
    }

    init() {
        console.log('testController.init');
        super.init();

        // ModalWidget
        this.view.querySelector('#openModalButton').addEventListener('click', () => {
            const el = ModalWidget.createElement('<div style="background-color: white; height: 100%;">hello world</div>');
            this.view.appendChild(el);
            new ModalWidget(el);
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
        // tooltipAlertTop.setTipText('hello world');
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
            // oldDates: false,
            value: new Date(2020, 8, 1),
            onChange: date => {
                console.log('dropdowndatepicker1.onChange', date);
                const minDate = date ? [date.getFullYear(), date.getMonth(), date.getDate()+1] : null;
                this.dropdowndatepicker2.setMinDate(minDate);
            }
        });

        this.dropdowndatepicker2 = ApplicationController.createReactComponent(this.view.querySelector('#dropdowndatepicker2'), DropdownDatePicker, {
            oldDates: false
        });

        // dropdownbutton
        const dropdownbutton = ApplicationController.createReactComponent(this.view.querySelector('#dropdownbutton'), DropdownButton, {
            actions: [
                {name: 'action1', title: 'Action 1'},
                {name: 'action2', title: 'Action 2'},
                {name: 'action3', title: 'Action 3'},
            ],
            onClick: action => {
                console.log('onClick:', action.dataset.action);
            }
        });

        // button
        const button = ApplicationController.createReactComponent(this.view.querySelector('#button'), Button, {
            title: 'Button',
            name: 'test',
            onClick: e => {
                console.log('button.onClick');
            },
            isDisabled: name => {
                console.log('button.isDisabled', name);
                return true;
            }
        });
        /*setTimeout(() => {
            button.disable();
        }, 1000);
        setTimeout(() => {
            button.enable();
        }, 5000);*/

        // combobox
        const combobox = ApplicationController.createReactComponent(this.view.querySelector('#combobox'), ComboBox, {
            items: [
                {value: '1', title: 'one'},
                {value: '2', title: 'two'},
                {value: '3', title: 'three'},
            ],
            // value: '2',
            onChange: value => {
                console.log('onChange', value);
            }
        });



        const grid = ApplicationController.createReactComponent(this.view.querySelector('#grid'), Grid, {
            getRowKey: row => row.id.toString(),
            columns: [
                {name: 'id', title: 'Id', width: 100},
                {name: 'title', title: 'Title', width: 100},
            ],
            rows: [
                {id: 1, title: 'abc'},
                {id: 2, title: 'xyz'},
                {id: 3, title: '123'},
                {id: 4, title: '098'},
            ]
        });


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