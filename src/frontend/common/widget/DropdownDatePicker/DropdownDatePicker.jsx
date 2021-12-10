// oldDates boolean true
class DropdownDatePicker extends ReactComponent {
    constructor(props) {
        // console.log('DropdownDatePicker.constructor', props);
        super(props);
        this.state = {
            open : false,
            value: props.value || null,
        };
        if (props.value && !(props.value instanceof Date)) {
            throw new Error(`need Date type, got ${typeof props.value}`);
        }
    }
    onInputClick = (e) => {
        // console.log('DropdownDatePicker.onInputClick', e);
        if (this.props.readOnly) return;
        this.setState(prevState => ({open: !prevState.open}));
    }
    onInputKeyDown = e => {
        // console.log('DropdownDatePicker.onInputKeyDown', e.key);
        if (e.key === 'Escape' && this.state.open) {
            this.setState({open: false});
            e.stopPropagation();
        }
    }
    onCloseDown = async (e) => {
        // console.log('DropdownDatePicker.onCloseDown', e);
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
    getFormat() {
        // if (this.props.format) return this.props.format;
        // return '{DD}.{MM}.{YYYY} {hh}:{mm}:{ss}';
        return this.props.format || '{DD}.{MM}.{YYYY} {hh}:{mm}:{ss}';
    }
    getStringValue() {
        if (this.getValue()) {
            return Helper.formatDate(this.getValue(), this.getFormat());
        }
        return '';
    }
    getMinDate() {
        if (this.props.getMinDate) {
            return this.props.getMinDate();
        } else if (this.props.oldDates === false) {
            return DatePicker.getTodayArr();
        }
        return null;
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
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('DropdownDatePicker.shouldComponentUpdate', 'nextProps:', nextProps, 'nextState:', nextState);
        this.state.value = nextProps.value;
        return true;
    }
    getClassList() {
        return [
            ...super.getClassList(),
            ...(this.props.readOnly ? ['read-only'] : [])
        ];
    }

    render() {
        // console.log('DropdownDatePicker.render', this.props, this.state);
        return (
            <div className={this.getCssClassNames()}>
                <input className={`${this.getCssBlockName()}__input`}
                    readOnly={true}
                    onClick={this.onInputClick}
                    onBlur={this.onBlur}
                    value={this.getStringValue()}
                    placeholder={this.props.placeholder}
                    onKeyDown={this.onInputKeyDown}
                />
                <div className={`${this.getCssBlockName()}__close ${this.getStringValue() !== '' && !this.props.readOnly ? 'visible' : ''}`} onMouseDown={this.onCloseDown}>
                    <CloseIcon/>
                </div>
                <div className={`${this.getCssBlockName()}__icon`}>
                    <DateIcon/>
                </div>
                {this.state.open &&
                    <DatePicker
                        classList={[`${this.getCssBlockName()}__date-picker`]}
                        minDate={this.getMinDate()}
                        selectedMonth={this.getSelectedMonth()}
                        selectedDate={this.getSelectedDate()}
                        onMouseDown={this.onDatePickerMouseDown}
                        onDateSelected={this.onDatePickerDateSelected}
                        selectToday={this.props.selectToday}
                        highlightedDate={this.props.highlightedDate}
                    />
                }
            </div>
        );
    }
}

window.QForms.DropdownDatePicker = DropdownDatePicker;
