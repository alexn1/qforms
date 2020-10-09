class TextBox extends ReactComponent {
    constructor(props) {
        // console.log('TextBox.constructor', props);
        super(props);
        this.state = {
            value: this.props.value || ''
        }
        /*this._state = {
            value: this.props.value || ''
        };*/
    }
    /*getValue() {
        return this._state.value;
    }*/
    setValue(value) {
        // this._state.value = value;
        this.setState({value});
    }
    onChange = e => {
        // console.log('TextBox.onChange', e.target.value);
        this.setValue(e.target.value);
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
            <input value={this.state.value} readOnly={this.props.readOnly} onChange={this.onChange} placeholder={this.props.placeholder}/>
        );
    }
}
