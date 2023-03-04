"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Password = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const ReactComponent_1 = require("../../ReactComponent");
const CloseIcon_1 = require("../../icon/CloseIcon");
const VisibilityIcon_1 = require("../../icon/VisibilityIcon");
const VisibilityOffIcon_1 = require("../../icon/VisibilityOffIcon");
require("./Password.less");
class Password extends ReactComponent_1.ReactComponent {
    constructor(props) {
        super(props);
        this.onChange = (e) => {
            this._setValue(e.target.value);
        };
        this.onCloseClick = (e) => {
            this._setValue('');
            this.getInputElement().focus();
        };
        this.onIconClick = (e) => {
            this.setState((prevState) => {
                return {
                    type: prevState.type === 'password' ? 'text' : 'password',
                };
            });
            this.getInputElement().focus();
        };
        this.el = React.createRef();
        this.inputEl = React.createRef();
        this.state = {
            value: this.props.value || '',
            type: 'password',
        };
    }
    getInputElement() {
        return this.inputEl.current;
    }
    getValue() {
        return this.state.value;
    }
    _setValue(value) {
        // @ts-ignore
        this.state.value = value;
        this.forceUpdate();
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        // @ts-ignore
        this.state.value = nextProps.value;
        return true;
    }
    isCloseVisible() {
        return this.state.value !== '';
    }
    render() {
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ ref: this.el, className: this.getCssClassNames() }, { children: [(0, jsx_runtime_1.jsx)("input", { ref: this.inputEl, className: `${this.getCssBlockName()}__input`, type: this.state.type, id: this.props.id, name: this.props.name, readOnly: this.props.readOnly, disabled: this.props.disabled, placeholder: this.props.placeholder, autoFocus: this.props.autoFocus, spellCheck: this.props.spellCheck, autoComplete: this.props.autocomplete, value: this.state.value, onFocus: this.props.onFocus, onBlur: this.props.onBlur, onChange: this.onChange }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__close ${this.isCloseVisible() ? 'visible' : ''}`, onClick: this.onCloseClick }, { children: (0, jsx_runtime_1.jsx)(CloseIcon_1.CloseIcon, {}) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__icon`, onClick: this.onIconClick }, { children: this.state.type === 'password' ? (0, jsx_runtime_1.jsx)(VisibilityIcon_1.VisibilityIcon, {}) : (0, jsx_runtime_1.jsx)(VisibilityOffIcon_1.VisibilityOffIcon, {}) }))] })));
    }
}
exports.Password = Password;
if (typeof window === 'object') {
    // @ts-ignore
    window.Password = Password;
}
