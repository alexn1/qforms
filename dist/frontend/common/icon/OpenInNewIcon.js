"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenInNewIcon = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const OpenInNewIcon = () => {
    return ((0, jsx_runtime_1.jsxs)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, { children: [(0, jsx_runtime_1.jsx)("path", { d: "M0 0h24v24H0V0z", fill: "none" }), (0, jsx_runtime_1.jsx)("path", { d: "M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" })] })));
};
exports.OpenInNewIcon = OpenInNewIcon;
if (typeof window === 'object') {
    // @ts-ignore
    window.OpenInNewIcon = exports.OpenInNewIcon;
}
