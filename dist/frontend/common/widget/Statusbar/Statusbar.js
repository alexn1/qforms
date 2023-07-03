"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Statusbar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ReactComponent_1 = require("../../ReactComponent");
require("./Statusbar.less");
class Statusbar extends ReactComponent_1.ReactComponent {
    constructor(props) {
        // console.debug('Statusbar.constructor', props);
        super(props);
        this.state = {};
    }
    setLastQueryTime(lastQueryTime) {
        this.setState({ lastQueryTime });
    }
    render() {
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "Statusbar" }, { children: (0, jsx_runtime_1.jsxs)("div", { children: ["Last query time:", ' ', this.state.lastQueryTime ? `${this.state.lastQueryTime} ms` : '-'] }) })));
    }
}
exports.Statusbar = Statusbar;
if (typeof window === 'object') {
    // @ts-ignore
    window.Statusbar = Statusbar;
}
