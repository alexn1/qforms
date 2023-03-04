"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Radio = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ReactComponent_1 = require("../ReactComponent");
class Radio extends ReactComponent_1.ReactComponent {
    constructor(props) {
        // console.log('Radio.constructor', props.value);
        super(props);
        this.onChange = async (e) => {
            // console.log('Radio.onChange', e.target.value);
            this.setState({ value: e.target.value });
            if (this.props.onChange) {
                await this.props.onChange(e.target.value);
            }
        };
        if (!props.name)
            throw new Error('no name');
        this.state = {
            value: this.getInitialValue(),
        };
        console.log('value:', JSON.stringify(this.getValue()));
    }
    getInitialValue() {
        let value = null;
        if (this.props.value !== undefined && this.props.value !== null) {
            value = this.props.value;
            const item = this.props.items.find((item) => item.value === this.props.value);
            if (!item) {
                console.error(`Radio: no item for value:`, JSON.stringify(this.props.value));
                console.log('items:', this.props.items);
            }
        }
        return value;
    }
    getValue() {
        return this.state.value;
    }
    renderItem(item, i) {
        return [
            (0, jsx_runtime_1.jsx)("input", { type: 'radio', name: this.props.name, id: `${this.props.name}${i}`, value: item.value, onChange: this.onChange, checked: item.value === this.getValue(), readOnly: this.isReadOnly(), disabled: this.isReadOnly() }),
            (0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: `${this.props.name}${i}` }, { children: item.title || item.value })),
        ];
    }
    isReadOnly() {
        if (this.props.readOnly !== undefined)
            return this.props.readOnly;
        return false;
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('Radio.shouldComponentUpdate', 'nextProps:', nextProps, 'nextState:', nextState);
        // @ts-ignore
        this.state.value = nextProps.value;
        return true;
    }
    render() {
        const items = this.props.items || [];
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: this.getCssClassNames() }, { children: items.map((item, i) => this.renderItem(item, i)) })));
    }
}
exports.Radio = Radio;
