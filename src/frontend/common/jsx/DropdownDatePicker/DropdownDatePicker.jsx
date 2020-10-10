class DropdownDatePicker extends ReactComponent {
    constructor(props) {
        // console.log('DropdownDatePicker.constructor', props);
        super(props);
        this.state = {
            open : false,
            value: props.value || null,
        };
        if (props.value && !(props.value instanceof Date)) {
            throw new Error('need date type');
        }
        this._state = {
            minDate: props.oldDates === false ? DatePicker.getTodayArr() : null
        };
    }
    onInputClick = (e) => {
        // console.log('DropdownDatePicker.onInputClick', e);
        this.setState(prevState => ({open: !prevState.open}));
    }
    onCloseClick = async (e) => {
        // console.log('DropdownDatePicker.onCloseClick', e);
        this.setState({value: null});
        if (this.props.onChange) {
            this.props.onChange(null);
        }
    }
    onBlur = (e) => {
        // console.log('DropdownDatePicker.onBlur');
        if (this.state.open) {
            this.setState({open: false});
        }
    }
    onDatePickerMouseDown = (e) => {
        // console.log('DropdownDatePicker.onDatePickerMouseDown');
        e.preventDefault();
        // e.stopPropagation();
        // return false;
    }
    onDatePickerDateSelected = (date) => {
        // console.log('DropdownDatePicker.onDatePickerDateSelected', date);
        const value = new Date(date[0], date[1], date[2]);
        this.setState({open: false, value});
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }
    getStringValue() {
        if (this.getValue()) {
            return Helper.formatDate(this.getValue(), '{DD}.{MM}.{YYYY}');
        }
        return '';
    }
    setMinDate(arr) {
        this._state.minDate = arr;
    }
    getMinDate() {
        return this._state.minDate;
    }
    getSelectedMonth() {
        if (this.getValue()) {
            return [this.getValue().getFullYear(), this.getValue().getMonth()];
        }
        return null;
    }
    getSelectedDate() {
        if (this.getValue()) {
            return [this.getValue().getFullYear(), this.getValue().getMonth(), this.getValue().getDate()];
        }
        return null;
    }
    getValue() {
        return this.state.value;
    }
    /*setValue(value) {
        // console.log('DropdownDatePicker.setValue', value);
        // this._state.value = value;
        this.setState({value});
        // this.rerender();
    }*/
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('DropdownDatePicker.shouldComponentUpdate', 'nextProps:', nextProps, 'nextState:', nextState);
        this.state.value = nextProps.value;
        return true;
    }
    render() {
        // console.log('DropdownDatePicker.render', this.props, this.state);
        return (
            <div className="DropdownDatePicker">
                <input readOnly onClick={this.onInputClick} onBlur={this.onBlur} value={this.getStringValue()} placeholder={this.props.placeholder}/>
                <div className={`close ${this.getStringValue() !== '' ? 'visible' : ''}`} onClick={this.onCloseClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
                        <line x1="2" y1="2" x2="8" y2="8" stroke="#aaa" strokeWidth="1.1" strokeLinecap="round"
                              strokeMiterlimit="10"></line>
                        <line x1="8" y1="2" x2="2" y2="8" stroke="#aaa" strokeWidth="1.1" strokeLinecap="round"
                              strokeMiterlimit="10"></line>
                    </svg>
                </div>
                {this.state.open &&
                    <DatePicker
                        minDate={this.getMinDate()}
                        selectedMonth={this.getSelectedMonth()}
                        selectedDate={this.getSelectedDate()}
                        onMouseDown={this.onDatePickerMouseDown}
                        onDateSelected={this.onDatePickerDateSelected}
                />
                }
            </div>
        );
    }
}
