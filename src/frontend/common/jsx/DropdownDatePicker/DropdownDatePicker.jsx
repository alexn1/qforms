class DropdownDatePicker extends React.Component {
    constructor(props) {
        console.log('DropdownDatePicker.constructor', props);
        super(props);
        if (props.cb) props.cb(this);
        this.state = {
            selectedDate: null,
            open        : false,
            minDate     : props.oldDates === false ? DatePicker.getTodayArr() : null
        };
        this.onInputClick             = this.onInputClick.bind(this);
        this.onCloseClick             = this.onCloseClick.bind(this);
        this.onBlur                   = this.onBlur.bind(this);
        this.onDatePickerMouseDown    = this.onDatePickerMouseDown.bind(this);
        this.onDatePickerDateSelected = this.onDatePickerDateSelected.bind(this);
    }
    onInputClick(e) {
        // console.log('DropdownDatePicker.onInputClick', e);
        this.setState(prevState => ({open: !prevState.open}));
    }
    onCloseClick(e) {
        console.log('DropdownDatePicker.onCloseClick', e);
        this.setState({selectedDate: null});
    }
    onBlur(e) {
        // console.log('DropdownDatePicker.onBlur');
        if (this.state.open) {
            this.setState({open: false});
        }
    }
    onDatePickerMouseDown(e) {
        // console.log('DropdownDatePicker.onDatePickerMouseDown');
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
    onDatePickerDateSelected(date) {
        // console.log('DropdownDatePicker.onDatePickerDateSelected', date);
        this.setState({open: false, selectedDate: date});
    }
    getValue() {
        if (this.state.selectedDate) {
            const date = new Date(this.state.selectedDate[0], this.state.selectedDate[1], this.state.selectedDate[2]);
            return Helper.formatDate(date, '{DD}.{MM}.{YYYY}');
        }
        return '';
    }
    render() {
        console.log('DropdownDatePicker.render', this.props, this.state);

        const todayArr = DatePicker.getTodayArr();

        return (
            <div className="DropdownDatePicker">
                <input readOnly onClick={this.onInputClick} onBlur={this.onBlur} value={this.getValue()}/>
                <div className={`close ${this.getValue() !== '' ? 'visible' : ''}`} onClick={this.onCloseClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
                        <line x1="2" y1="2" x2="8" y2="8" stroke="#aaa" strokeWidth="1.1" strokeLinecap="round"
                              strokeMiterlimit="10"></line>
                        <line x1="8" y1="2" x2="2" y2="8" stroke="#aaa" strokeWidth="1.1" strokeLinecap="round"
                              strokeMiterlimit="10"></line>
                    </svg>
                </div>
                {this.state.open &&
                    <DatePicker
                                minDate={this.state.minDate}
                                selectedMonth={this.state.selectedDate ? [this.state.selectedDate[0], this.state.selectedDate[1]] : null}
                                selectedDate={this.state.selectedDate}
                                onMouseDown={this.onDatePickerMouseDown}
                                onDateSelected={this.onDatePickerDateSelected}
                />
                }
            </div>
        );
    }
}
