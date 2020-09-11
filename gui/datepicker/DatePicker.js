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
        this.el.addEventListener('click', this.onClick.bind(this));

    }

    onClick(e) {
        console.log('DatePicker.onClick', e);
        if (e.target === this.getNext()) {
            return this.onNext();
        } else if (e.target === this.getPrev()) {
            return this.onPrev();
        } else if (e.target.nodeName === 'TD' && e.target.classList.contains('selectable')) {
            return this.onDayClick(e.target);
        }
    }

    onDayClick(target) {
        console.log('DatePicker.onDayClick', target.dataset);
    }

    onNext() {
        console.log('DatePicker.onNext');
        if (this.year === null) throw new Error('no current year');
        if (this.month === null) throw new Error('no current month');
        const next = new Date(this.year, this.month);
        next.setMonth(next.getMonth() + 1);
        this.setYearMonth(next.getFullYear(), next.getMonth());
    }

    onPrev() {
        console.log('DatePicker.onPrev');
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

    setYearMonth(year, month) {
        console.log('DatePicker.setYearMonth', year, month);
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        if (year === undefined) year = today.getFullYear();
        if (month === undefined) month = today.getMonth();
        this.year = year;
        this.month = month;
        const date = new Date(year, month, 1); // first day of month
        date.setDate(2 - date.getDay());            // first day of table

        // caption
        this.getCaption().innerText = `${months[month]}, ${year}`;

        // days
        const tds = this.el.querySelectorAll('td');
        for (let i = 0; i < 42; i++) {
            tds[i].innerText = date.getDate().toString();
            tds[i].dataset.month = date.getMonth();
            tds[i].dataset.date = date.getDate();
            if (date.getMonth() !== month) {
                tds[i].classList.add('out');
            } else {
                tds[i].classList.remove('out');
            }
            if (date >= today) {
                tds[i].classList.add('selectable');
            } else {
                tds[i].classList.remove('selectable');
            }
            if (date.getTime() === today.getTime()) {
                tds[i].classList.add('today');
            } else {
                tds[i].classList.remove('today');
            }
            date.setDate(date.getDate() + 1);
        }
    }
}
