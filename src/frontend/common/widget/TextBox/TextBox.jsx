class TextBox extends ReactComponent {
    constructor(props) {
        // console.log('TextBox.constructor', props);
        super(props);
        this.input = React.createRef();
        this.state = {
            value: this.props.value || ''
        }
    }
    getValue() {
        return this.state.value;
    }
    getInput() {
        return this.input.current;
    }
    onChange = e => {
        // console.log('TextBox.onChange', e.target.value);
        this.state.value = e.target.value;
        this.setState({value: e.target.value});
        if (this.props.onChange) {
            this.props.onChange(e.target.value);
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('TextBox.shouldComponentUpdate', 'nextProps:', nextProps, 'nextState:', nextState);
        this.state.value = nextProps.value;
        return true;
    }
    render() {
        // console.log('TextBox.render');
        return (
            <input
                ref={this.input}
                className={this.getCssClassNames()}
                type="text"
                id={this.props.id}
                name={this.props.name}
                readOnly={this.props.readOnly}
                disabled={this.props.disabled}
                placeholder={this.props.placeholder}
                autoFocus={this.props.autoFocus}
                spellCheck={this.props.spellCheck}
                autoComplete={this.props.autocomplete}
                value={this.state.value}
                onChange={this.onChange}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
            />
        );
    }
}

window.QForms.TextBox = TextBox;
