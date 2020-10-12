class ComboBox extends ReactComponent {
    constructor(props) {
        super(props);
        this.state  = {value: props.value || ''};
    }
    onChange = e => {
        // console.log('ComboBox.onChange', e.target.value, typeof e.target.value);
        this.setState({value: e.target.value});
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
            <select onChange={this.onChange} value={this.state.value} disabled={this.props.readOnly}>
                <option value="">{ApplicationController.isInDebugMode() ? 'null' : ''}</option>
                {this.props.items && this.props.items.map(item =>
                    <option key={item.value} value={item.value}>{item.title}</option>
                )}
            </select>
        );
    }
}
