"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropdownButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ReactComponent_1 = require("../../ReactComponent");
const Button_1 = require("../Button");
require("./DropdownButton.less");
class DropdownButton extends ReactComponent_1.ReactComponent {
    constructor(props) {
        super(props);
        this.onButtonClick = (e) => {
            // console.log('DropdownButton.onButtonClick');
            this.setState((state) => ({ open: !state.open }));
        };
        this.onButtonBlur = (e) => {
            // console.log('DropdownButton.onButtonBlur');
            if (this.state.open) {
                this.setState({ open: false });
            }
        };
        this.onKeyDown = (e) => {
            // console.log('DropdownButton.onKeyDown', e.key);
            if (e.key === 'Escape' && this.state.open) {
                this.setState({ open: false });
                e.stopPropagation();
            }
        };
        this.onUlMouseDown = (e) => {
            // console.log('DropdownButton.onUlMouseDown');
            e.preventDefault();
        };
        this.onLiClick = async (e) => {
            // console.log('DropdownButton.onLiClick', e.currentTarget);
            const li = e.currentTarget;
            this.setState({ open: false }, () => {
                if (this.props.onClick) {
                    this.props.onClick(li);
                }
            });
        };
        this.state = {
            open: false,
            disabled: false,
        };
    }
    isEnabled() {
        if (this.props.enabled !== undefined)
            return this.props.enabled;
        // if (this.props.isDisabled) return this.props.isDisabled(this.props.name);
        return !this.state.disabled;
    }
    render() {
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `${this.getCssClassNames()} ${this.state.open && 'show'}` }, { children: [(0, jsx_runtime_1.jsx)(Button_1.Button, Object.assign({ classList: [`${this.getCssBlockName()}__button`], onClick: this.onButtonClick, onBlur: this.onButtonBlur, enabled: this.isEnabled(), onKeyDown: this.onKeyDown }, { children: this.props.title || this.props.children })), (0, jsx_runtime_1.jsx)("ul", Object.assign({ className: `${this.getCssBlockName()}__dropdown`, onMouseDown: this.onUlMouseDown }, { children: this.props.actions &&
                        this.props.actions.map((action) => ((0, jsx_runtime_1.jsx)("li", Object.assign({ className: `${this.getCssBlockName()}__item ${action.enabled === false ? 'disabled' : ''}`, "data-action": action.name, onClick: action.enabled !== false ? this.onLiClick : null }, { children: action.title }), action.name))) }))] })));
    }
}
exports.DropdownButton = DropdownButton;
// @ts-ignore
window.DropdownButton = DropdownButton;
