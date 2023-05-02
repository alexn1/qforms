"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddIcon = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const AddIcon = () => {
    return ((0, jsx_runtime_1.jsxs)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, { children: [(0, jsx_runtime_1.jsx)("path", { d: "M0 0h24v24H0V0z", fill: "none" }), (0, jsx_runtime_1.jsx)("path", { d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" })] })));
};
exports.AddIcon = AddIcon;
if (typeof window === 'object') {
    // @ts-ignore
    window.AddIcon = exports.AddIcon;
}
