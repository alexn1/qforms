class ComboBox extends ReactComponent {
    constructor(props) {
        super(props);
        this.state  = {value: props.value || ''};
        this._state = {value: props.value || ''};
    }
    setValue(value) {
        this._state.value = value;
        this.setState({value});
    }
    getValue() {
        return this._state.value;
    }
    onChange = e => {
        // console.log('ComboBox.onChange', e.target.value, typeof e.target.value);
        this.setValue(e.target.value);
        if (this.props.onChange) {
            this.props.onChange(e.target.value);
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('ComboBox.shouldComponentUpdate', 'nextProps:', nextProps, 'nextState:', nextState);
        this.state.value = nextProps.value;
        return true;
    }
    render() {
        // console.log('ComboBox.render', this.state.value);
        return (
            <select onChange={this.onChange} value={this.state.value}>
                <option value="">null</option>
                {this.props.items && this.props.items.map(item =>
                    <option key={item.value} value={item.value}>{item.title}</option>
                )}
            </select>
        );
    }
}
