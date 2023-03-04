"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckBoxList = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ReactComponent_1 = require("../ReactComponent");
class CheckBoxList extends ReactComponent_1.ReactComponent {
    constructor(props) {
        super(props);
        this.onCheckBoxChange = (e) => {
            // console.log('CheckBoxList.onCheckBoxChange', e.target.id, e.target.checked);
            const checked = e.target.checked;
            const itemValue = e.target.dataset.value;
            // console.log('itemValue:', itemValue);
            this.setState((prevState) => {
                const prevValue = prevState.value || [];
                const value = [...prevValue];
                if (checked) {
                    if (value.indexOf(itemValue) > -1) {
                        console.log('value:', itemValue, checked, value);
                        throw new Error('CheckBoxList value error');
                    }
                    value.push(itemValue);
                }
                else {
                    if (value.indexOf(itemValue) === -1) {
                        console.log('value:', itemValue, checked, value);
                        throw new Error('CheckBoxList value error');
                    }
                    value.splice(value.indexOf(itemValue), 1);
                }
                // console.log('value:', value);
                return { value };
            }, () => {
                if (this.props.onChange) {
                    this.props.onChange(this.getValue());
                }
            });
        };
        if (!this.props.name)
            throw new Error('no CheckBoxList name');
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
    isValueChecked(value) {
        return this.getValue().indexOf(value) > -1;
    }
    composeItemId(value) {
        return `${this.props.name}.${value}`;
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('CheckBoxList.shouldComponentUpdate', 'nextProps:', nextProps, 'nextState:', nextState);
        // console.log('nextProps.value:', nextProps.value);
        // @ts-ignore
        this.state.value = nextProps.value;
        return true;
    }
    render() {
        return ((0, jsx_runtime_1.jsx)("ul", Object.assign({ className: this.getCssClassNames() }, { children: this.getItems().map((item) => {
                if (item.value === undefined)
                    throw new Error('no item value');
                return ((0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)("input", { type: 'checkbox', id: this.composeItemId(item.value), checked: this.isValueChecked(item.value), onChange: this.onCheckBoxChange, "data-value": item.value, readOnly: this.props.readOnly }), (0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: this.composeItemId(item.value) }, { children: item.title || item.value }))] }, item.value));
            }) })));
    }
}
exports.CheckBoxList = CheckBoxList;
if (typeof window === 'object') {
    // @ts-ignore
    window.CheckBoxList = CheckBoxList;
}
