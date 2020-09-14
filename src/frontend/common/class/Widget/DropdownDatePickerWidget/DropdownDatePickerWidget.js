'use strict';

class DropdownDatePickerWidget extends Widget {

    constructor(el) {
        console.log('DropdownDatePickerWidget.constructor', el);
        super(el);
        this.datePicker = null;
        this.onChange = null;
    }

    init() {
        // console.log('DropdownDatePickerWidget.init');
        this.datePicker = new DatePickerWidget(this.getDatePickerElement());
        this.getInputElement().addEventListener('click', this.onInputClick.bind(this));
        this.getInputElement().addEventListener('blur', this.onButtonBlur.bind(this));
        this.datePicker.onDateSelected = this.onDateSelected.bind(this);
    }

    getInputElement() {
        return this.el.querySelector('input');
    }

    getDatePickerElement() {
        return this.el.querySelector('table');
    }

    onInputClick(event) {
        // console.log('DropdownDatePickerWidget.onInputClick', event);
        if (this.isDatePickerVisible()) {
            this.hideDatePicker();
        } else {
            if (this.datePicker.isDateSelected()) {
                const d = this.datePicker.getSelectedDate();
                this.datePicker.selectMonth(d[0], d[1]);
            } else {
                this.datePicker.selectMonth();
            }
            this.showDatePicker();
        }
    }

    onButtonBlur(event) {
        // console.log('DropdownDatePickerWidget.onButtonBlur', event);
        if (this.isDatePickerVisible()) {
            this.hideDatePicker();
        }
    }

    isDatePickerVisible() {
        return this.getDatePickerElement().classList.contains('show');
    }

    hideDatePicker() {
        this.getDatePickerElement().classList.remove('show');
    }

    showDatePicker() {
        this.getDatePickerElement().classList.add('show');
    }

    onDateSelected(date) {
        // console.log('DropdownDatePickerWidget.onDateSelected', date);
        this.hideDatePicker();
        this.getInputElement().value = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
        if (this.onChange) {
            this.onChange(date);
        }
    }

    clear() {
        this.getInputElement().value = '';
        this.datePicker.setSelectedDate(null);
    }

}