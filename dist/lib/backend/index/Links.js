"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Links = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Links = ({ links }) => {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: links.map((link, i) => {
            if (typeof link === 'string') {
                return (0, jsx_runtime_1.jsx)("link", { rel: 'stylesheet', href: link }, i);
            }
            else if (typeof link === 'object') {
                return ((0, jsx_runtime_1.jsx)("link", { rel: link.rel, href: link.href, crossOrigin: link.crossorigin ? 'anonymous' : undefined }, i));
            }
        }) }));
};
exports.Links = Links;
