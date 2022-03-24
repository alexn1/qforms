class CheckBoxList extends ReactComponent {
    constructor(props) {
        super(props);
        if (!this.props.name) throw new Error('no CheckBoxList name');
        this.state = {
            value: this.props.value || []
        };
    }
    getItems() {
        return this.props.items || [];
    }
    getValue() {
        return this.state.value || [];
    }
    onCheckBoxChange = e => {
        // console.log('CheckBoxList.onCheckBoxChange', e.target.id, e.target.checked);
        const checked = e.target.checked;
        const itemValue = e.target.dataset.value;
        // console.log('itemValue:', itemValue);
        this.setState(prevState => {
            const value = [...prevState.value];
            if (checked) {
                if (value.indexOf(itemValue) > -1) {
                    console.log('value:', itemValue, checked, value);
                    throw new Error('CheckBoxList value error');
                }
                value.push(itemValue);
            } else {
                if (value.indexOf(itemValue) === -1) {
                    console.log('value:', itemValue, checked, value);
                    throw new Error('CheckBoxList value error');
                }
                value.splice(value.indexOf(itemValue), 1);
            }
            // console.log('value:', value);
            return {value};
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(this.getValue());
            }
        });
    }
    isValueChecked(value) {
        return this.getValue().indexOf(value) > -1;
    }
    composeItemId(value) {
        return `${this.props.name}.${value}`;
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('CheckBoxList.shouldComponentUpdate', 'nextProps:', nextProps, 'nextState:', nextState);
        // console.log('nextProps.value:', nextProps.value);
        this.state.value = nextProps.value;
        return true;
    }
    render() {
        return <ul className={this.getCssClassNames()}>
            {this.getItems().map(item => {
                if (item.value === undefined) throw new Error('no item value');
                return <li>
                    <input type={'checkbox'}
                           id={this.composeItemId(item.value)}
                           checked={this.isValueChecked(item.value)}
                           onChange={this.onCheckBoxChange}
                           data-value={item.value}
                           readOnly={this.props.readOnly}
                    />
                    <label for={this.composeItemId(item.value)}>
                        {item.title || item.value}
                    </label>
                </li>
            })}
        </ul>;
    }
}
