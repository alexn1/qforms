"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloseIcon2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const CloseIcon2 = (props) => {
    const size = props.size || 24;
    return ((0, jsx_runtime_1.jsxs)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24" }, { children: [(0, jsx_runtime_1.jsx)("path", { d: "M0 0h24v24H0V0z", fill: "none" }), (0, jsx_runtime_1.jsx)("path", { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" })] })));
};
exports.CloseIcon2 = CloseIcon2;
if (typeof window === 'object') {
    // @ts-ignore
    window.CloseIcon2 = exports.CloseIcon2;
}
