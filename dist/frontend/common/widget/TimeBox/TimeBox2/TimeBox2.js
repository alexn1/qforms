"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeBox2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const TimeBox_1 = require("../TimeBox");
const CloseIcon_1 = require("../../../icon/CloseIcon");
const TimeIcon_1 = require("../../../icon/TimeIcon");
require("./TimeBox2.less");
class TimeBox2 extends TimeBox_1.TimeBox {
    constructor(props) {
        super(props);
        this.onClear = (e) => {
            // console.debug('TimeBox2.onClear');
            this.setState({ value: '' }, () => {
                if (this.props.onClear) {
                    this.props.onClear();
                }
            });
        };
        this.inputEl = react_1.default.createRef();
    }
    isCloseVisible() {
        return !!this.state.value;
    }
    getInputElement() {
        return this.inputEl.current;
    }
    render() {
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ ref: this.el, className: this.getCssClassNames() }, { children: [(0, jsx_runtime_1.jsx)("input", { ref: this.inputEl, className: `${this.getCssBlockName()}__input`, type: 'text', 
                    // id={this.props.id}
                    readOnly: this.props.readOnly, placeholder: this.props.placeholder, value: this.state.value, onChange: this.onChange, 
                    // onKeyDown={this.onKeyDown}
                    // onKeyUp={this.onKeyUp}
                    onKeyPress: this.onKeyPress, onBlur: this.onBlur }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__close-icon ${this.isCloseVisible() ? 'visible' : ''}`, onMouseDown: this.onClear }, { children: (0, jsx_runtime_1.jsx)(CloseIcon_1.CloseIcon, {}) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__time-icon` }, { children: (0, jsx_runtime_1.jsx)(TimeIcon_1.TimeIcon, {}) }))] })));
    }
}
exports.TimeBox2 = TimeBox2;
