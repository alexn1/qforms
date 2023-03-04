"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextBox = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ReactComponent_1 = require("../ReactComponent");
class TextBox extends ReactComponent_1.ReactComponent {
    constructor(props) {
        // console.log('TextBox.constructor', props);
        super(props);
        this.onChange = (e) => {
            // console.log('TextBox.onChange', e.target.value);
            this._setValue(e.target.value);
        };
        this.el = (0, react_1.createRef)();
        this.state = {
            value: this.props.value || '',
        };
    }
    getValue() {
        return this.state.value;
    }
    _setValue(value) {
        // @ts-ignore
        this.state.value = value;
        // this.setState({value: this.state.value});   // rerender
        this.forceUpdate();
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('TextBox.shouldComponentUpdate', 'nextProps:', nextProps, 'nextState:', nextState);
        // @ts-ignore
        this.state.value = nextProps.value;
        return true;
    }
    render() {
        // console.log('TextBox.render');
        return ((0, jsx_runtime_1.jsx)("input", { ref: this.el, className: this.getCssClassNames(), type: this.props.type || 'text', id: this.props.id, name: this.props.name, readOnly: this.props.readOnly, disabled: this.isDisabled(), placeholder: this.props.placeholder, autoFocus: this.props.autoFocus, spellCheck: this.props.spellCheck, autoComplete: this.props.autocomplete, required: this.props.required, value: this.state.value, onFocus: this.props.onFocus, onBlur: this.props.onBlur, onChange: this.onChange }));
    }
}
exports.TextBox = TextBox;
if (typeof window === 'object') {
    // @ts-ignore
    window.TextBox = TextBox;
}
