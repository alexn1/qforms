"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComboBox = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ReactComponent_1 = require("../ReactComponent");
class ComboBox extends ReactComponent_1.ReactComponent {
    constructor(props) {
        // console.debug('ComboBox.constructor', props.value, typeof props.value, props.items);
        super(props);
        this.onChange = async (e) => {
            // console.debug('ComboBox.onChange', e.target.value, typeof e.target.value);
            this.setState({ value: e.target.value });
            if (this.props.onChange) {
                await this.props.onChange(e.target.value);
            }
        };
        this.onMouseDown = async (e) => {
            // console.debug('ComboBox.onMouseDown', e.button);
            if (this.props.onMouseDown) {
                await this.props.onMouseDown(e);
            }
        };
        if (!props.items)
            throw new Error('no ComboBox items');
        this.state = { value: this.getInitialValue() };
    }
    getInitialValue() {
        let value = null;
        if (this.props.value !== undefined && this.props.value !== null) {
            value = this.props.value;
            const item = this.props.items.find((item) => item.value === this.props.value);
            if (!item) {
                if (this.props.nullable && value === '') {
                }
                else {
                    console.error(`ComboBox: no item for value:`, JSON.stringify(this.props.value));
                    console.debug('items:', this.props.items);
                }
            }
        }
        else {
            if (this.props.items.length) {
                value = this.props.items[0].value;
            }
            else {
                value = '';
            }
        }
        if (value === null)
            throw new Error('null is wrong value for ComboBox');
        // console.debug('combobox value:', value);
        return value;
    }
    getValue() {
        return this.state.value;
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.debug('ComboBox.shouldComponentUpdate', 'nextProps:', nextProps, 'nextState:', nextState);
        // @ts-ignore
        this.state.value = nextProps.value;
        return true;
    }
    render() {
        // console.debug('ComboBox.render', this.state.value);
        return ((0, jsx_runtime_1.jsxs)("select", Object.assign({ className: this.getCssClassNames(), onChange: this.onChange, value: this.state.value, disabled: this.props.readOnly, size: this.props.size, style: this.props.style, id: this.props.id, onDoubleClick: this.props.onDoubleClick, onMouseDown: this.onMouseDown }, { children: [this.props.nullable && (0, jsx_runtime_1.jsx)("option", Object.assign({ value: '' }, { children: this.props.placeholder })), this.props.items &&
                    this.props.items.map((item) => ((0, jsx_runtime_1.jsx)("option", Object.assign({ value: item.value }, { children: item.title || item.value }), item.value)))] })));
    }
}
exports.ComboBox = ComboBox;
if (typeof window === 'object') {
    // @ts-ignore
    window.ComboBox = ComboBox;
}
