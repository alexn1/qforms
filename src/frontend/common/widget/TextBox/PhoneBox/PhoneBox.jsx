class PhoneBox extends TextBox {
    onChange = e => {
        console.log('PhoneBox.onChange', e.target.value, e.target.value.length);

        const target = e.target;
        const start = target.selectionStart;
        const end   = target.selectionEnd;
        let value = target.value;

        // clear
        value = value.replace(/[\s\-\(\)]/g, '');

        // check for russia
        if (value === '') {
        } else if (value.match(/^8/)) {
            value = value.replace(/^8/, '+7');
        } else if (value[0] !== '+') {
            value = `+7${value}`;
        }

        // russian format
        const arr = /(^\+7)(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/.exec(value);
        console.log('arr:', arr);
        if (arr) {
            if (arr[5]) {
                value = `${arr[1]} ${arr[2]} ${arr[3]}-${arr[4]}-${arr[5]}`;
            } else if (arr[4]) {
                value = `${arr[1]} ${arr[2]} ${arr[3]}-${arr[4]}`;
            } else if (arr[3]) {
                value = `${arr[1]} ${arr[2]} ${arr[3]}`;
            } else if (arr[2]) {
                value = `${arr[1]} ${arr[2]}`;
            } else if (arr[1]) {
                value = `${arr[1]}`;
            }
        }

        this.state.value = value;
        this.setState({value});
    }
    onKeyPress = e => {
        if (!['+', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(e.key)) {
            console.log('cancel', e.key);
            e.preventDefault();
        }
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
}
