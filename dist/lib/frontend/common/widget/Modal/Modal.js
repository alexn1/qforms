"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ReactComponent_1 = require("../../ReactComponent");
require("./Modal.less");
class Modal extends ReactComponent_1.ReactComponent {
    render() {
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: this.getCssClassNames() }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__container` }, { children: this.props.children })) })));
    }
}
exports.Modal = Modal;
// @ts-ignore
window.Modal = Modal;
