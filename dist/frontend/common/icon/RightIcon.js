"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RightIcon = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const RightIcon = (props) => {
    const size = props.size || 24;
    return ((0, jsx_runtime_1.jsxs)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", height: size, width: size, viewBox: "0 0 24 24", fill: "#000000" }, { children: [(0, jsx_runtime_1.jsx)("path", { d: "M0 0h24v24H0V0z", fill: "none" }), (0, jsx_runtime_1.jsx)("path", { d: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" })] })));
};
exports.RightIcon = RightIcon;
if (typeof window === 'object') {
    // @ts-ignore
    window.RightIcon = exports.RightIcon;
}
