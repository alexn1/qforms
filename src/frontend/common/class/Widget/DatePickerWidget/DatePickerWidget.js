'use strict';

class DatePickerWidget extends Widget{
    constructor(el) {
        console.log('DatePickerWidget.constructor', el);
        super(el);
        this.selectedMonth  = null;
        this.selectedDate   = null;
        this.minDate        = null;
        this.onDateSelected = null;         // event
        this.onMouseDown    = null;

        this.MONTH = [
            'Январь', 'Февраль',
            'Март', 'Апрель', 'Май',
            'Июнь', 'Июль', 'Август',
            'Сентябрь', 'Октябрь', 'Ноябрь',
            'Декабрь'
        ];

        // events
        this.el.addEventListener('click', this.onClick.bind(this));
        this.el.addEventListener('mousedown', (e) => {
            // console.log('mousedown', e);
            if (this.onMouseDown) {
                return this.onMouseDown(e);
            }
            /*e.preventDefault();
            e.stopPropagation();
            return false;*/
        });
    }

    onClick(e) {
        // console.log('DatePickerWidget.onClick', e);
        if (e.target === this.getNext()) {
            return this.onNext();
        } else if (e.target === this.getPrev()) {
            return this.onPrev();
        } else if (e.target.nodeName === 'TD' && e.target.classList.contains('selectable')) {
            return this.onDateClick(e.target);
        }
    }

    onDateClick(target) {
        // console.log('DatePickerWidget.onDateClick', target.dataset);
        if (this.onDateSelected) {
            this.setSelectedDate(JSON.parse(target.dataset.date));
            this.onDateSelected(this.createSelectedDate());
        }
    }

    isMonthSelected() {
        return this.selectedMonth !== null;
    }

    getSelectedMonth() {
        return this.selectedMonth;
    }

    setSelectedMonth(arr) {
        this.selectedMonth = arr;
    }

    onNext() {
        // console.log('DatePickerWidget.onNext');
        if (!this.isMonthSelected()) throw new Error('month not selected');
        const arr = this.getSelectedMonth();
        const next = new Date(arr[0], arr[1]);
        next.setMonth(next.getMonth() + 1);
        this.selectMonth(next.getFullYear(), next.getMonth());
    }

    onPrev() {
        // console.log('DatePickerWidget.onPrev');
        if (!this.isMonthSelected()) throw new Error('month not selected');
        const arr = this.getSelectedMonth();
        const prev = new Date(arr[0], arr[1]);
        prev.setMonth(prev.getMonth() - 1);
        if (this.isMonthAllowed(prev)) {
            this.selectMonth(prev.getFullYear(), prev.getMonth());
        } else {
            console.error('month not allowed:', prev);
        }
    }

    isPrevAllowed() {
        if (!this.isMonthSelected()) throw new Error('month not selected');
        const arr = this.getSelectedMonth();
        const prev = new Date(arr[0], arr[1]);
        prev.setMonth(prev.getMonth() - 1);
        return this.isMonthAllowed(prev);
    }

    isMonthAllowed(month) {
        if (this.minDate !== null) {
            const minMonth = new Date(this.minDate[0], this.minDate[1]);
            return month.getTime() >= minMonth.getTime();
        }
        return true;
    }

    getCaption() {
        return this.el.querySelector('caption > div > span');
    }

    getNext() {
        return this.el.querySelector('caption > div > a.next');
    }

    getPrev() {
        return this.el.querySelector('caption > div > a.prev');
    }

    static getDay(date) {
        let day = date.getDay() - 1;
        if (day === -1) day = 6;
        return day;
    }

    isDateSelected() {
        return this.selectedDate !== null;
    }

    setSelectedDate(arr) {
        this.selectedDate = arr;
    }

    getSelectedDate() {
        return this.selectedDate;
    }

    createSelectedDate() {
        if (!this.isDateSelected()) throw new Error('date not selected');
        return new Date(this.selectedDate[0], this.selectedDate[1], this.selectedDate[2]);
    }

    static getToday() {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }

    selectMonth(year, month) {
        // console.log('DatePickerWidget.selectMonth', year, month);
        const today = DatePickerWidget.getToday();
        const minDate = this.minDate !== null ? this.createMinDate() : null;
        const selectedDate = this.isDateSelected() ? this.createSelectedDate() : null;


        if (year === undefined) year = today.getFullYear();
        if (month === undefined) month = today.getMonth();
        this.setSelectedMonth([year, month]);

        if (this.isPrevAllowed()) {
            this.getPrev().classList.add('enabled');
        } else {
            this.getPrev().classList.remove('enabled');
        }
        this.getNext().classList.add('enabled');

        const date = new Date(year, month, 1); // first day of month
        let day = DatePickerWidget.getDay(date);
        if (day === 0) {
            date.setDate(date.getDate() - 7);            // first day of table
        } else {
            date.setDate(date.getDate() - day);            // first day of table
        }

        // caption
        this.getCaption().innerText = `${this.MONTH[month]}, ${year}`;

        // days
        const tds = this.el.querySelectorAll('td');
        for (let i = 0; i < 42; i++) {
            tds[i].innerText = date.getDate().toString();
            tds[i].dataset.date = JSON.stringify([date.getFullYear(), date.getMonth(), date.getDate()]);
            if (date.getMonth() !== month) {
                tds[i].classList.add('out');
            } else {
                tds[i].classList.remove('out');
            }
            if (minDate !== null && date.getTime() < minDate.getTime()) {
                tds[i].classList.remove('selectable');
            } else {
                tds[i].classList.add('selectable');
            }
            if (date.getTime() === today.getTime()) {
                tds[i].classList.add('today');
            } else {
                tds[i].classList.remove('today');
            }
            if (selectedDate !== null && date.getTime() === selectedDate.getTime()) {
                tds[i].classList.add('selected');
            } else {
                tds[i].classList.remove('selected');
            }
            date.setDate(date.getDate() + 1);
        }
    }

    setMinDate(arr) {
        this.minDate = arr;
    }

    createMinDate() {
        if (!this.minDate) throw new Error('no min date');
        return new Date(this.minDate[0], this.minDate[1], this.minDate[2]);
    }
}
