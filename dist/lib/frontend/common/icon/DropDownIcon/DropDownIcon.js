"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropDownIcon = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ReactComponent_1 = require("../../ReactComponent");
require("./DropDownIcon.less");
class DropDownIcon extends ReactComponent_1.ReactComponent {
    render() {
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: this.getCssClassNames(), style: { width: this.props.size, height: this.props.size } }, { children: (0, jsx_runtime_1.jsxs)("svg", Object.assign({ viewBox: "0 0 10 10" }, { children: [(0, jsx_runtime_1.jsx)("circle", { cx: "5", cy: "5", r: "5", style: { fill: 'gray' } }), (0, jsx_runtime_1.jsx)("polyline", { points: "2,4 5,7 8,4", fill: "none", stroke: "white", strokeLinecap: "round", strokeLinejoin: "round" })] })) })));
    }
}
exports.DropDownIcon = DropDownIcon;
if (typeof window === 'object') {
    // @ts-ignore
    window.DropDownIcon = DropDownIcon;
}
