class DatePicker extends React.Component {
    constructor(props) {
        console.log('DatePicker.constructor', props);
        super(props);
        if (props.cb) props.cb(this);

        const today = DatePickerWidget.getToday();

        this.state = {
            year: today.getFullYear(),
            month: today.getMonth()
        };

        this.MONTH = [
            'Январь', 'Февраль',
            'Март', 'Апрель', 'Май',
            'Июнь', 'Июль', 'Август',
            'Сентябрь', 'Октябрь', 'Ноябрь',
            'Декабрь'
        ];
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

    render() {
        console.log('DatePicker.render');
        const date = new Date(this.state.year, this.state.month, 1); // first day of month
        const today = DatePicker.getToday();

        let day = DatePickerWidget.getDay(date);
        if (day === 0) {
            date.setDate(date.getDate() - 7);            // first day of table
        } else {
            date.setDate(date.getDate() - day);            // first day of table
        }
        console.log('date:', date);


        return (
            <table className="DatePicker" cellSpacing="0" cellPadding="0">
                <caption>
                    <div>
                        <a className="prev"> &lt; </a>
                        <span>{`${this.MONTH[this.state.month]}, ${this.state.year}`}</span>
                        <a className="next"> &gt; </a>
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
                            const text = date.getDate().toString();

                            const classes = ['selectable'];
                            if (j >= 5 && j <= 6) classes.push('weekend');
                            if (date.getMonth() !== this.state.month) classes.push('out');
                            if (date.getTime() === today.getTime()) classes.push('today');

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
