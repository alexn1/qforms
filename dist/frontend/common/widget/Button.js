"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ReactComponent_1 = require("../ReactComponent");
class Button extends ReactComponent_1.ReactComponent {
    constructor(props) {
        // console.log('Button.constructor', props);
        super(props);
        this.state = { disabled: undefined };
        this.el = (0, react_1.createRef)();
    }
    /*isDisabled() {
        if (this.props.disabled !== undefined) return this.props.disabled;
        if (this.props.enabled !== undefined) return !this.props.enabled;
        return this.state.disabled;
    }*/
    /*isEnabled() {
        return !this.isDisabled();
    }*/
    /*disable() {
        this.setState({disabled: true});
    }*/
    /*enable() {
        this.setState({disabled: false});
    }*/
    isVisible() {
        // return this.props.visible === undefined ? true : this.props.visible;
        if (this.props.visible !== undefined)
            return this.props.visible;
        return true;
    }
    getStyle() {
        return {
            display: !this.isVisible() ? 'none' : null,
            width: this.props.width,
        };
    }
    render() {
        // console.log('Button.render', this.props.title, this.props);
        return ((0, jsx_runtime_1.jsx)("button", Object.assign({ className: this.getCssClassNames(), ref: this.el, id: this.props.id, type: this.props.type, name: this.props.name, disabled: this.isDisabled(), onClick: this.props.onClick, onFocus: this.props.onFocus, onBlur: this.props.onBlur, onKeyDown: this.props.onKeyDown, style: this.getStyle() }, { children: this.props.title || this.props.children })));
    }
}
exports.Button = Button;
if (typeof window === 'object') {
    // @ts-ignore
    window.Button = Button;
}
