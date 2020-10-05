class DatePicker extends React.Component {
    constructor(props) {
        console.log('DatePicker.constructor', props);
        super(props);
        if (props.cb) props.cb(this);

        const today = DatePickerWidget.getToday();

        this.state = {
            selectedMonth: [today.getFullYear(), today.getMonth()],
            selectedDate: [2020, 9, 19],
            minDate: [2020, 9, 5]
        };

        this.MONTH = [
            'Январь', 'Февраль',
            'Март', 'Апрель', 'Май',
            'Июнь', 'Июль', 'Август',
            'Сентябрь', 'Октябрь', 'Ноябрь',
            'Декабрь'
        ];
        this.onClick = this.onClick.bind(this);
    }

    static getToday() {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }

    static getDay(date) {
        let day = date.getDay() - 1;
        if (day === -1) day = 6;
        return day;
    }

    createSelectedDate() {
        if (!this.isDateSelected()) throw new Error('date not selected');
        return new Date(this.state.selectedDate[0], this.state.selectedDate[1], this.state.selectedDate[2]);
    }

    isDateSelected() {
        return this.state.selectedDate !== null;
    }

    getFirstDateOfTable() {
        const date = new Date(this.state.selectedMonth[0], this.state.selectedMonth[1], 1); // first day of month
        let day = DatePickerWidget.getDay(date);
        if (day === 0) {
            date.setDate(date.getDate() - 7);            // first day of table
        } else {
            date.setDate(date.getDate() - day);            // first day of table
        }
        return date;
    }

    createMinDate() {
        if (!this.state.minDate) throw new Error('no min date');
        return new Date(this.state.minDate[0], this.state.minDate[1], this.state.minDate[2]);
    }

    isMinDate() {
        return !!this.state.minDate;
    }

    setMinDate(arr) {
        this.setState({minDate: arr});
    }

    getMinDate() {
        return this.state.minDate || null;
    }

    isPrevAllowed() {
        if (!this.isMonthSelected()) throw new Error('month not selected');
        const arr = this.getSelectedMonth();
        const prev = new Date(arr[0], arr[1]);
        prev.setMonth(prev.getMonth() - 1);
        return this.isMonthAllowed(prev);

    }



    isMonthSelected() {
        return !!this.state.selectedMonth;
    }

    getSelectedMonth() {
        return this.state.selectedMonth || null;
    }

    isMonthAllowed(month) {
        if (this.isMinDate()) {
            const minMonth = new Date(this.state.minDate[0], this.state.minDate[1]);
            return month.getTime() >= minMonth.getTime();
        }
        return true;
    }

    onClick(e) {
        console.log('DatePicker.onClick', e.target);
        if (e.target.classList.contains('next')) {
            this.next();
        } else if (e.target.classList.contains('prev')) {
            this.prev();
        }
    }

    next() {
        console.log('DatePicker.next');
    }

    prev() {
        console.log('DatePicker.prev');
    }

    render() {
        console.log('DatePicker.render');
        const today = DatePicker.getToday();
        const selectedDate = this.isDateSelected() ? this.createSelectedDate() : null;
        const minDate = this.isMinDate() ? this.createMinDate() : null;
        const date = this.getFirstDateOfTable();
        return (
            <table className="DatePicker" cellSpacing="0" cellPadding="0" onClick={this.onClick}>
                <caption>
                    <div>
                        <a className={`prev ${this.isPrevAllowed() ? 'enabled' : ''}`}> &lt; </a>
                        <span>{`${this.MONTH[this.state.selectedMonth[1]]}, ${this.state.selectedMonth[0]}`}</span>
                        <a className={'next enabled'}> &gt; </a>
                    </div>
                </caption>
                <thead>
                <tr>
                    <th>Пн</th>
                    <th>Вт</th>
                    <th>Ср</th>
                    <th>Чт</th>
                    <th>Пт</th>
                    <th className="weekend">Сб</th>
                    <th className="weekend">Вс</th>
                </tr>
                </thead>
                <tbody>
                    {[0, 1, 2, 3, 4, 5].map(i => (<tr key={i}>
                        {[0, 1, 2, 3, 4, 5, 6].map(j => {
                            const classes = [];
                            if (j === 5 || j === 6) classes.push('weekend');
                            if (date.getTime() === today.getTime()) classes.push('today');
                            if (date.getMonth() !== this.state.selectedMonth[1]) classes.push('out');
                            if (minDate && date.getTime() >= minDate.getTime()) classes.push('selectable');
                            if (selectedDate && date.getTime() === selectedDate.getTime()) classes.push('selected');
                            const text = date.getDate().toString();
                            date.setDate(date.getDate() + 1);
                            return (<td
                                key={text}
                                className={classes.join(' ')}
                                data-date={JSON.stringify([date.getFullYear(), date.getMonth(), date.getDay()])}
                            >{text}</td>);
                        })}
                    </tr>))}
                </tbody>
            </table>
        );
    }
}
