class TextBox extends ReactComponent {
    constructor(props) {
        // console.log('TextBox.constructor', props);
        super(props);
        this.input = React.createRef();
        this.state = {
            value: this.props.value || ''
        }
    }
    getInput() {
        return this.input.current;
    }
    onChange = e => {
        console.log('TextBox.onChange', e.target.value);
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
                id={this.props.id}
                className={this.getClassName()}
                type="text"
                value={this.state.value}
                readOnly={this.props.readOnly}
                onChange={this.onChange}
                placeholder={this.props.placeholder}
            />
        );
    }
}
