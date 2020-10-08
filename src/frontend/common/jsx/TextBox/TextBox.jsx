class TextBox extends ReactComponent {
    constructor(props) {
        super(props);
        this._state = {
            value: this.props.value
        };
    }
    getValue() {
        return this._state.value;
    }
    setValue(value) {
        this._state.value = value;
        this.rerender();
    }
    render() {
        return (
            <input value={this.getValue()} readOnly={this.props.readOnly}/>
        );
    }
}
