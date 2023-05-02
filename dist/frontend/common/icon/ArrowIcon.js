"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrowIcon = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowIcon = (props) => {
    return ((0, jsx_runtime_1.jsx)("svg", Object.assign({ width: "10px", height: "6px", viewBox: "0 0 10 6" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M1.429.253a.819.819 0 0 0-1.184 0 .883.883 0 0 0 0 1.22l4.142 4.274A.821.821 0 0 0 5 6a.821.821 0 0 0 .612-.253l4.143-4.273a.883.883 0 0 0 0-1.221.819.819 0 0 0-1.184 0L5 3.937 1.429.253z" }) })));
};
exports.ArrowIcon = ArrowIcon;
if (typeof window === 'object') {
    // @ts-ignore
    window.ArrowIcon = exports.ArrowIcon;
}
