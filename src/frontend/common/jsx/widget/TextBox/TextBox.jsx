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
                className={this.getClassName()}
                type="text"
                name={this.props.name}
                id={this.props.id}
                readOnly={this.props.readOnly}
                placeholder={this.props.placeholder}
                spellCheck={this.props.spellCheck}
                onChange={this.onChange}
                value={this.state.value}
                disabled={this.props.disabled}
                autoComplete={this.props.autocomplete}
            />
        );
    }
}
