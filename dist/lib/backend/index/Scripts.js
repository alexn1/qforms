"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scripts = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Scripts = ({ scripts }) => {
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: scripts.map((scr, i) => {
            return (0, jsx_runtime_1.jsx)("script", { type: 'text/javascript', src: scr }, i);
        }) });
};
exports.Scripts = Scripts;
