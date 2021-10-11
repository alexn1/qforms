class ComboBox extends ReactComponent {
    constructor(props) {
        // console.log('ComboBox.constructor', props.value, typeof props.value, props.items);
        super(props);
        if (!props.items) throw new Error('no ComboBox items');
        this.state = {value: this.getInitialValue()};
    }
    getInitialValue() {
        let value = null;
        if (this.props.value !== undefined && this.props.value !== null) {
            value = this.props.value;
            const item = this.props.items.find(item => item.value === this.props.value);
            if (!item) {
                if (this.props.nullable && value === '') {
                } else {
                    console.error(`no item for value:`, this.props.value, typeof this.props.value);
                    console.log('items:', this.props.items);
                }
            }
        } else {
            if (this.props.items.length) {
                value = this.props.items[0].value;
            } else {
                value = '';
            }
        }
        if (value === null) throw new Error('null is wrong value for ComboBox');
        // console.log('combobox value:', value);
        return value;
    }
    getValue() {
        return this.state.value;
    }
    onChange = async e => {
        // console.log('ComboBox.onChange', e.target.value, typeof e.target.value);
        this.setState({value: e.target.value});
        if (this.props.onChange) {
            await this.props.onChange(e.target.value);
        }
    }
    onMouseDown = async e => {
        // console.log('ComboBox.onMouseDown', e.button);
        if (this.props.onMouseDown) {
            await this.props.onMouseDown(e);
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
                className={this.getCssClassNames()}
                onChange={this.onChange}
                value={this.state.value}
                disabled={this.props.readOnly}
                size={this.props.size}
                style={this.props.style}
                id={this.props.id}
                onDoubleClick={this.props.onDoubleClick}
                onMouseDown={this.onMouseDown}
            >
                {this.props.nullable &&
                    <option value={''}>{this.props.placeholder}</option>
                }
                {this.props.items && this.props.items.map(item =>
                    <option key={item.value} value={item.value}>{item.title}</option>
                )}
            </select>
        );
    }
}

window.QForms.ComboBox = ComboBox;
