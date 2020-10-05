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
    }
    onClick(e) {
        // console.log('DropdownDatePicker.onClick', e);
        this.setState(prevState => ({
            open: !prevState.open
        }));
    }
    onDatePickerCallback(datePicker) {
        console.log('DropdownDatePicker.onDatePickerCallback', datePicker);
        this.datePicker = datePicker;
    }
    render() {
        console.log('DropdownDatePicker.render', this.state);
        return (
            <div className="DropdownDatePicker">
                <input readOnly onClick={this.onClick}/>
                <div className="close">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
                        <line x1="2" y1="2" x2="8" y2="8" stroke="#aaa" strokeWidth="1.1" strokeLinecap="round"
                              strokeMiterlimit="10"></line>
                        <line x1="8" y1="2" x2="2" y2="8" stroke="#aaa" strokeWidth="1.1" strokeLinecap="round"
                              strokeMiterlimit="10"></line>
                    </svg>
                </div>
                <DatePicker visible={this.state.open}/>
            </div>
        );
    }
}
