"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expand = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ReactComponent_1 = require("../../ReactComponent");
const DownIcon_1 = require("../../icon/DownIcon");
require("./Expand.less");
class Expand extends ReactComponent_1.ReactComponent {
    constructor(props) {
        super(props);
        this.onTitleClick = (e) => {
            console.log('Expand.onTitleClick');
            this.setState((prevState) => {
                return { opened: !prevState.opened };
            });
        };
        this.state = {
            opened: this.props.opened !== undefined ? this.props.opened : false,
        };
    }
    isOpened() {
        return this.state.opened;
    }
    isHighlighted() {
        return !!this.props.highlighted;
    }
    render() {
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `${this.getCssClassNames()} ${this.isOpened() ? 'opened' : ''} ${this.isHighlighted() ? 'highlighted' : ''}` }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `${this.getCssBlockName()}__header`, onClick: this.onTitleClick }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__icon` }, { children: (0, jsx_runtime_1.jsx)(DownIcon_1.DownIcon, {}) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__title` }, { children: this.props.title }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__content` }, { children: this.props.children }))] })));
    }
}
exports.Expand = Expand;
if (typeof window === 'object') {
    // @ts-ignore
    window.Expand = Expand;
}
