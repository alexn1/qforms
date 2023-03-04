"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeftIcon = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const LeftIcon = (props) => {
    const size = props.size || 24;
    return ((0, jsx_runtime_1.jsxs)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", height: size, width: size, viewBox: "0 0 24 24", fill: "#000000" }, { children: [(0, jsx_runtime_1.jsx)("path", { d: "M0 0h24v24H0V0z", fill: "none" }), (0, jsx_runtime_1.jsx)("path", { d: "M15.61 7.41L14.2 6l-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z" })] })));
};
exports.LeftIcon = LeftIcon;
// @ts-ignore
window.LeftIcon = exports.LeftIcon;
