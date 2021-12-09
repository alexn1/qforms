class PhoneBox extends ReactComponent {
    constructor(props) {
        super(props);
        this.el = React.createRef();
        this.state = {
            value: PhoneBox.formatPhoneNumber(this.props.value || '')
        }
    }
    getValue() {
        return PhoneBox.clearValue(this.state.value);
    }
    onChange = e => {
        // console.log('PhoneBox.onChange', e.target.value);
        const start = e.target.selectionStart;
        const end   = e.target.selectionEnd;
        const len   = e.target.value.length;
        // console.log('start/end/len:', start, end, len);

        // disable edition in middle
        if (start !== end || start !== len) {
            return;
        }

        // value pipeline
        let value = PhoneBox.clearValue(e.target.value);
        value = PhoneBox.ifNoCodeAddRussianCode(value);

        // state
        this.state.value = PhoneBox.formatPhoneNumber(value);
        this.setState({value: this.state.value});       // for render only

        // event
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }
    onKeyPress = e => {
        // console.log('PhoneBox.onKeyPress', e.key, this.state.value);
        if (!['+', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(e.key)) {
            e.preventDefault();
        }
        if (this.state.value.length && e.key === '+') {
            e.preventDefault();
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('TextBox.shouldComponentUpdate', 'nextProps:', nextProps, 'nextState:', nextState);
        this.state.value = PhoneBox.formatPhoneNumber(nextProps.value);
        return true;
    }
    render() {
        // console.log('TextBox.render');
        return (
            <input
                ref={this.el}
                className={this.getCssClassNames()}
                type={'text'}
                id={this.props.id}
                name={this.props.name}
                readOnly={this.props.readOnly}
                disabled={this.props.disabled}
                placeholder={this.props.placeholder}
                autoFocus={this.props.autoFocus}
                spellCheck={this.props.spellCheck}
                autoComplete={this.props.autocomplete}
                value={this.state.value}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                onChange={this.onChange}
                onKeyPress={this.onKeyPress}
            />
        );
    }
    static clearValue(value) {
        return value.replace(/[^\+0-9]/g, '');
    }
    static ifNoCodeAddRussianCode(value) {
        if (value === '') {
        } else if (value.match(/^8/)) {
            return value.replace(/^8/, '+7');
        } else if (value[0] !== '+') {
            return `+7${value}`;
        }
        return value;
    }
    static formatPhoneNumber(value) {
        // russian country code
        const arr = /(^\+7)(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/.exec(value);
        // console.log('arr:', arr);
        if (arr) {
            if (arr[5]) {
                return `${arr[1]} ${arr[2]} ${arr[3]}-${arr[4]}-${arr[5]}`;
            }
            if (arr[4]) {
                return `${arr[1]} ${arr[2]} ${arr[3]}-${arr[4]}`;
            }
            if (arr[3]) {
                return `${arr[1]} ${arr[2]} ${arr[3]}`;
            }
            if (arr[2]) {
                return `${arr[1]} ${arr[2]}`;
            }
            if (arr[1]) {
                return `${arr[1]}`;
            }
        }
        return value;
    }
}
