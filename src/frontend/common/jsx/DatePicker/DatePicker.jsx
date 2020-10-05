class DatePicker extends React.Component {
    constructor(props) {
        console.log('DatePicker.constructor', props);
        super(props);
        if (props.cb) props.cb(this);

        const today = DatePickerWidget.getToday();
        this.state = {
            selectedMonth: props.selectedMonth ? JSON.parse(JSON.stringify(props.selectedMonth)) : [today.getFullYear(), today.getMonth()],
            minDate      : props.minDate ? JSON.parse(JSON.stringify(props.minDate)) : null,
            selectedDate : props.selectedDate ? JSON.parse(JSON.stringify(props.selectedDate)) : null,
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
        return !!this.state.selectedDate;
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
        const prev = new Date(this.state.selectedMonth[0], this.state.selectedMonth[1]);
        prev.setMonth(prev.getMonth() - 1);
        return this.isMonthAllowed(prev);
    }

    isMonthAllowed(month) {
        if (this.isMinDate()) {
            const minMonth = new Date(this.state.minDate[0], this.state.minDate[1]);
            return month.getTime() >= minMonth.getTime();
        }
        return true;
    }

    onClick(e) {
        // console.log('DatePicker.onClick', e.target);
        if (e.target.classList.contains('next')) {
            this.next();
        } else if (e.target.classList.contains('prev')) {
            this.prev();
        } else if (e.target.nodeName === 'TD' && e.target.classList.contains('selectable')) {
            return this.onDateClick(e.target);
        }
    }

    onDateClick(target) {
        // console.log('DatePicker.onDateClick', target.dataset.date);
        this.setState({selectedDate: JSON.parse(target.dataset.date)}, () => {
            if (this.props.onDateSelected) {
                this.props.onDateSelected(this.createSelectedDate());
            }
        });
    }

    next() {
        console.log('DatePicker.next');
        this.setState(prevState => {
            const next = new Date(prevState.selectedMonth[0], prevState.selectedMonth[1]);
            next.setMonth(next.getMonth() + 1);
            return {
                selectedMonth: [next.getFullYear(), next.getMonth()]
            };
        });
    }

    prev() {
        console.log('DatePicker.prev');
        this.setState(prevState => {
            const prev = new Date(prevState.selectedMonth[0], prevState.selectedMonth[1]);
            prev.setMonth(prev.getMonth() - 1);
            return {
                selectedMonth: [prev.getFullYear(), prev.getMonth()]
            };
        });
    }

    render() {
        console.log('DatePicker.render', this.state);
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
                            if (!minDate) classes.push('selectable'); else if (date.getTime() >= minDate.getTime()) classes.push('selectable');
                            if (selectedDate && date.getTime() === selectedDate.getTime()) classes.push('selected');
                            const text = date.getDate().toString();
                            const dataDate =  JSON.stringify([date.getFullYear(), date.getMonth(), date.getDate()]);
                            date.setDate(date.getDate() + 1);
                            return (<td
                                key={text}
                                className={classes.join(' ')}
                                data-date={dataDate}
                            >{text}</td>);
                        })}
                    </tr>))}
                </tbody>
            </table>
        );
    }
}
