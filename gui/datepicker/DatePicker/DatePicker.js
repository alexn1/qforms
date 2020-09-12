const months = [
    'Январь', 'Февраль',
    'Март', 'Апрель', 'Май',
    'Июнь', 'Июль', 'Август',
    'Сентябрь', 'Октябрь', 'Ноябрь',
    'Декабрь'
];

class DatePicker {
    constructor(el) {
        console.log('DatePicker.constructor', el);
        this.el = el;
        this.year = null;
        this.month = null;
        this.selectedYear = null;
        this.selectedMonth = null;
        this.selectedDate = null;
        this.onDateSelected = null;
        this.minDate = null;


        // events
        this.el.addEventListener('click', this.onClick.bind(this));
        this.el.addEventListener('mousedown', (e) => {
            // console.log('mousedown', e);
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
    }

    onClick(e) {
        // console.log('DatePicker.onClick', e);
        if (e.target === this.getNext()) {
            return this.onNext();
        } else if (e.target === this.getPrev()) {
            return this.onPrev();
        } else if (e.target.nodeName === 'TD' && e.target.classList.contains('selectable')) {
            return this.onDateClick(e.target);
        }
    }

    onDateClick(target) {
        // console.log('DatePicker.onDateClick', target.dataset);
        if (this.onDateSelected) {
            const year = parseInt(target.dataset.year);
            const month = parseInt(target.dataset.month);
            const date = parseInt(target.dataset.date);
            this.setSelectedDate(year, month, date);
            this.onDateSelected(this.createSelectedDate());
        }
    }

    onNext() {
        // console.log('DatePicker.onNext');
        if (this.year === null) throw new Error('no current year');
        if (this.month === null) throw new Error('no current month');
        const next = new Date(this.year, this.month);
        next.setMonth(next.getMonth() + 1);
        this.setYearMonth(next.getFullYear(), next.getMonth());
    }

    onPrev() {
        // console.log('DatePicker.onPrev');
        if (this.year === null) throw new Error('no current year');
        if (this.month === null) throw new Error('no current month');
        const next = new Date(this.year, this.month);
        next.setMonth(next.getMonth() - 1);
        this.setYearMonth(next.getFullYear(), next.getMonth());
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
        return this.selectedYear !== null && this.selectedMonth !== null && this.selectedDate !== null;
    }

    setSelectedDate(year, month, date) {
        this.selectedYear = year;
        this.selectedMonth = month;
        this.selectedDate = date;
    }

    getSelectedDate() {
        if (this.isDateSelected()) {
            return [this.selectedYear, this.selectedMonth, this.selectedDate];
        }
        return null;
    }

    createSelectedDate() {
        if (!this.isDateSelected()) throw new Error('date not selected');
        return new Date(this.selectedYear, this.selectedMonth, this.selectedDate);
    }

    setYearMonth(year, month) {
        console.log('DatePicker.setYearMonth', year, month);
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const selectedDate = this.isDateSelected() ? this.createSelectedDate() : null;
        if (year === undefined) year = today.getFullYear();
        if (month === undefined) month = today.getMonth();
        this.year = year;
        this.month = month;
        const date = new Date(year, month, 1); // first day of month
        let day = DatePicker.getDay(date);
        if (day === 0) {
            date.setDate(date.getDate() - 7);            // first day of table
        } else {
            date.setDate(date.getDate() - day);            // first day of table
        }

        // caption
        this.getCaption().innerText = `${months[month]}, ${year}`;

        // days
        const tds = this.el.querySelectorAll('td');
        for (let i = 0; i < 42; i++) {
            tds[i].innerText = date.getDate().toString();
            tds[i].dataset.year = date.getFullYear();
            tds[i].dataset.month = date.getMonth();
            tds[i].dataset.date = date.getDate();
            if (date.getMonth() !== month) {
                tds[i].classList.add('out');
            } else {
                tds[i].classList.remove('out');
            }
            if (date.getTime() >= today.getTime()) {
                tds[i].classList.add('selectable');
            } else {
                tds[i].classList.remove('selectable');
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

    setMinDate(year, month, date) {
        this.minDate = [year, month, date];
    }
}
