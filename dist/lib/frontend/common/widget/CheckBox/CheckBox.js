"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckBox = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ReactComponent_1 = require("../../ReactComponent");
require("./CheckBox.less");
class CheckBox extends ReactComponent_1.ReactComponent {
    constructor(props) {
        super(props);
        this.onChange = (e) => {
            // console.log('CheckBox.onChange', e.target.checked, this.props.readOnly);
            if (!this.props.readOnly) {
                this.setState((prevState) => {
                    if (this.props.onChange) {
                        this.props.onChange(!prevState.checked, e);
                    }
                    return { checked: !prevState.checked };
                });
            }
        };
        this.onClick = (e) => {
            if (!this.props.readOnly) {
                if (this.props.onChange)
                    this.props.onChange(true);
                this.setState({ checked: true });
            }
        };
        if (this.props.checked !== undefined &&
            this.props.checked !== null &&
            typeof this.props.checked !== 'boolean') {
            throw new Error(`wrong checked prop: ${this.props.checked}`);
        }
        this.state = {
            checked: typeof this.props.checked === 'boolean' ? this.props.checked : null,
        };
    }
    getValue() {
        return this.state.checked;
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('TextBox.shouldComponentUpdate', 'nextProps:', nextProps, 'nextState:', nextState);
        // @ts-ignore
        this.state.checked = typeof nextProps.checked === 'boolean' ? nextProps.checked : null;
        return true;
    }
    render() {
        if (this.state.checked === null) {
            return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssClassNames()} ${this.isDisabled() ? 'disabled' : ''}`, onClick: this.onClick }, { children: "?" })));
        }
        return ((0, jsx_runtime_1.jsx)("input", { className: this.getCssClassNames(), type: "checkbox", id: this.props.id, checked: this.state.checked, readOnly: this.props.readOnly, disabled: this.props.disabled, "data-tag": this.props.tag, onChange: this.onChange }));
    }
}
exports.CheckBox = CheckBox;
// @ts-ignore
window.CheckBox = CheckBox;
