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
            const date = this.getDate();
            console.log('date:', date);
            if (date) {
                this.datePicker.setYearMonth(date[0], date[1]);
            } else {
                this.datePicker.setYearMonth();
            }
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

    setDate(year, month, date) {
        const ie = this.getInputElement();
        ie.dataset.year = year.toString();
        ie.dataset.month = month.toString();
        ie.dataset.date = date.toString();
        this.getInputElement().value = `${year}-${month}-${date}`;
    }

    getDate() {
        const ie = this.getInputElement();
        if (ie.dataset.year && ie.dataset.month && ie.dataset.date) {
            return [
                parseInt(ie.dataset.year),
                parseInt(ie.dataset.month),
                parseInt(ie.dataset.date)
            ]
        }
        return null;
    }



    onDateSelected(date) {
        // console.log('DropdownDatePicker.onDateSelected', date);
        this.hideDatePicker();
        this.setDate(date.getFullYear(), date.getMonth(), date.getDate());
    }

}