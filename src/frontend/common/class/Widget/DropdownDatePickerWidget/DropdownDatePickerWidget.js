'use strict';

class DropdownDatePickerWidget extends Widget {

    constructor(el) {
        console.log('DropdownDatePickerWidget.constructor', el);
        super(el);
        this.datePicker = null;
        this.onChange   = null;
    }

    init() {
        // console.log('DropdownDatePickerWidget.init');
        this.datePicker = new DatePickerWidget(this.getDatePickerElement());
        this.datePicker.onDateSelected = this.onDateSelected.bind(this);
        this.datePicker.onMouseDown    = this.onDatePickerMouseDown.bind(this);

        // events
        const input = this.getInputElement();
        input.addEventListener('click'  , this.onInputClick.bind(this));
        input.addEventListener('blur'   , this.onButtonBlur.bind(this));
        input.addEventListener('keydown', this.onInputKeyDown.bind(this));

        const close = this.getCloseElement();
        close.addEventListener('mousedown',  e => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
        close.addEventListener('click', this.onCloseClick.bind(this))
    }

    onCloseClick() {
        console.log('onCloseClick');
        this.datePicker.setSelectedDate(null);
        this.getInputElement().value = '';
    }

    getCloseElement() {
        return this.el.querySelector('div.close');
    }

    onInputKeyDown(e) {
        // console.log('DropdownDatePickerWidget.InputKeyDown:', e);
        if (e.which === 27 && this.isDatePickerVisible()) {
            this.hideDatePicker();
        }
    }

    onDatePickerMouseDown(e) {
        // console.log('DropdownDatePickerWidget.onDatePickerMouseDown', e);
        e.preventDefault();
        e.stopPropagation();
        return false;
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
            } else if (this.datePicker.isMinDate()) {
                const d = this.datePicker.getMinDate();
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
        this.setStringValue(date);
        if (this.onChange) {
            this.onChange(date);
        }
    }

    setStringValue(date) {
        const year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();
        if (month < 10) month = `0${month}`;
        if (day < 10) day = `0${day}`;
        //this.getInputElement().value = `${year}-${month}-${day}`;
        this.getInputElement().value = `${day}.${month}.${year}`;
    }

    clear() {
        this.getInputElement().value = '';
        this.datePicker.setSelectedDate(null);
    }

    setValue(date) {
        if (date) {
            this.setStringValue(date);
            this.datePicker.setSelectedDate([date.getFullYear(), date.getMonth(), date.getDate()]);
        } else {
            this.clear();
        }
    }

    getValue() {
        const selectedDate = this.datePicker.getSelectedDate();
        if (selectedDate !== null) {
            return new Date(selectedDate[0], selectedDate[1], selectedDate[2]);
        }
        return null;
    }

}