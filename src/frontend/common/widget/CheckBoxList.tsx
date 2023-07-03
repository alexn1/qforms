import { ReactComponent } from '../ReactComponent';

export class CheckBoxList extends ReactComponent {
    constructor(props) {
        super(props);
        if (!this.props.name) throw new Error('no CheckBoxList name');
        this.state = {
            value: this.props.value || [],
        };
    }

    getItems() {
        return this.props.items || [];
    }

    getValue() {
        return this.state.value || [];
    }

    onCheckBoxChange = (e) => {
        // console.debug('CheckBoxList.onCheckBoxChange', e.target.id, e.target.checked);
        const checked = e.target.checked;
        const itemValue = e.target.dataset.value;
        // console.debug('itemValue:', itemValue);
        this.setState(
            (prevState) => {
                const prevValue = prevState.value || [];
                const value = [...prevValue];
                if (checked) {
                    if (value.indexOf(itemValue) > -1) {
                        console.debug('value:', itemValue, checked, value);
                        throw new Error('CheckBoxList value error');
                    }
                    value.push(itemValue);
                } else {
                    if (value.indexOf(itemValue) === -1) {
                        console.debug('value:', itemValue, checked, value);
                        throw new Error('CheckBoxList value error');
                    }
                    value.splice(value.indexOf(itemValue), 1);
                }
                // console.debug('value:', value);
                return { value };
            },
            () => {
                if (this.props.onChange) {
                    this.props.onChange(this.getValue());
                }
            },
        );
    };

    isValueChecked(value) {
        return this.getValue().indexOf(value) > -1;
    }

    composeItemId(value) {
        return `${this.props.name}.${value}`;
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.debug('CheckBoxList.shouldComponentUpdate', 'nextProps:', nextProps, 'nextState:', nextState);
        // console.debug('nextProps.value:', nextProps.value);
        // @ts-ignore
        this.state.value = nextProps.value;
        return true;
    }

    render() {
        return (
            <ul className={this.getCssClassNames()}>
                {this.getItems().map((item) => {
                    if (item.value === undefined) throw new Error('no item value');
                    return (
                        <li key={item.value}>
                            <input
                                type={'checkbox'}
                                id={this.composeItemId(item.value)}
                                checked={this.isValueChecked(item.value)}
                                onChange={this.onCheckBoxChange}
                                data-value={item.value}
                                readOnly={this.props.readOnly}
                            />
                            <label htmlFor={this.composeItemId(item.value)}>
                                {item.title || item.value}
                            </label>
                        </li>
                    );
                })}
            </ul>
        );
    }
}

if (typeof window === 'object') {
    // @ts-ignore
    window.CheckBoxList = CheckBoxList;
}
