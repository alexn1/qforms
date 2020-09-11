class DropdownDatePicker {
    constructor(el) {
        console.log('DropdownDatePicker.constructor', el);
        this.el = el;
        this.datePicker = null;
    }

    init() {
        console.log('DropdownDatePicker.init');
        this.datePicker = new DatePicker(this.getDatePickerElement());
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
        // console.log('DropdownDatePicker.onInputClick', event);
        if (this.isDatePickerVisible()) {
            this.hideDatePicker();
        } else {
            this.datePicker.setYearMonth();
            this.showDatePicker();
        }
    }

    onButtonBlur(event) {
        // console.log('DropdownDatePicker.onButtonBlur', event);
        if (this.isDatePickerVisible()) {
            this.hideDatePicker();
        }
    }

    isDatePickerVisible() {
        return this.getDatePickerElement().classList.contains('show');
    }

    // toggleDatePicker() {
    //     this.getDatePickerElement().classList.toggle('show');
    // }

    hideDatePicker() {
        this.getDatePickerElement().classList.remove('show');
    }

    showDatePicker() {
        this.getDatePickerElement().classList.add('show');
    }

    onDateSelected(date) {
        // console.log('DropdownDatePicker.onDateSelected', date);
        this.hideDatePicker();
        this.getInputElement().value = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    }

}