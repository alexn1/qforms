class DropdownDatePicker extends React.Component {
    constructor(props) {
        console.log('DropdownDatePicker.constructor', props);
        super(props);
        if (props.cb) props.cb(this);
        this.datePicker = null;
        this.state = {
            open: false
        };
        this.onClick = this.onClick.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onDatePickerMouseDown    = this.onDatePickerMouseDown.bind(this);
        this.onDatePickerDateSelected = this.onDatePickerDateSelected.bind(this);
    }
    onClick(e) {
        // console.log('DropdownDatePicker.onClick', e);
        this.setState(prevState => ({
            open: !prevState.open
        }));
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
        console.log('DropdownDatePicker.onDatePickerDateSelected', date);
        this.setState({open: false});
    }
    onDatePickerCallback(datePicker) {
        console.log('DropdownDatePicker.onDatePickerCallback', datePicker);
        this.datePicker = datePicker;
    }
    render() {
        console.log('DropdownDatePicker.render', this.props, this.state);
        return (
            <div className="DropdownDatePicker">
                <input readOnly onClick={this.onClick} onBlur={this.onBlur}/>
                <div className="close">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
                        <line x1="2" y1="2" x2="8" y2="8" stroke="#aaa" strokeWidth="1.1" strokeLinecap="round"
                              strokeMiterlimit="10"></line>
                        <line x1="8" y1="2" x2="2" y2="8" stroke="#aaa" strokeWidth="1.1" strokeLinecap="round"
                              strokeMiterlimit="10"></line>
                    </svg>
                </div>
                <DatePicker visible={this.state.open}
                            onMouseDown={this.onDatePickerMouseDown}
                            onDateSelected={this.onDatePickerDateSelected}
                />
            </div>
        );
    }
}
