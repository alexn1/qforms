class ComboBox extends ReactComponent {
    constructor(props) {
        // console.log('ComboBox.constructor', props);
        super(props);
        let value = '';
        if (props.value) {
            value = props.value;
            const item = props.items.find(item => item.value === props.value);
            if (!item) {
                console.error(`no item for value: ${props.value}, ${typeof props.value}`);
                console.log('items:', props.items);
            }
        } else {
            if (props.items.length) {
                value = props.items[0].value;
            }
        }
        this.state = {value: value};
    }
    getValue() {
        return this.state.value;
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
            <select
                className={this.getClassName()}
                onChange={this.onChange}
                value={this.state.value}
                disabled={this.props.readOnly}
                size={this.props.size}
                style={this.props.style}
                id={this.props.id}
                onDoubleClick={this.props.onDoubleClick}
            >
                {this.props.nullable &&
                    <option value="">{this.props.placeholder}</option>
                }
                {this.props.items && this.props.items.map(item =>
                    <option key={item.value} value={item.value}>{item.title}</option>
                )}
            </select>
        );
    }
}
