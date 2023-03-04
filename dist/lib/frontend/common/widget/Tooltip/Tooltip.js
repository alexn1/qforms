"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tooltip = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ReactComponent_1 = require("../../ReactComponent");
require("./Tooltip.less");
class Tooltip extends ReactComponent_1.ReactComponent {
    // constructor(props) {
    //     console.log('Tooltip.constructor', props);
    //     super(props);
    // }
    render() {
        // console.log('Tooltip.render', this.state, this.props);
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `Tooltip ${this.props.type} ${this.props.hidden ? 'hidden' : ''}` }, { children: [this.props.type !== 'alert' && (0, jsx_runtime_1.jsx)("div", { children: "tooltip" }), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: this.props.position }, { children: this.props.tip || 'tip' }))] })));
    }
}
exports.Tooltip = Tooltip;
// @ts-ignore
window.Tooltip = Tooltip;
