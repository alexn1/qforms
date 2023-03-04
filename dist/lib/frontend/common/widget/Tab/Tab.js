"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tab = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ReactComponent_1 = require("../../ReactComponent");
require("./Tab.less");
class Tab extends ReactComponent_1.ReactComponent {
    constructor(props) {
        super(props);
        this.onLiMouseDown = (e) => {
            // console.log('Tab.onLiMouseDown', e.target);
            if (e.target.classList.contains('close'))
                return;
            const i = parseInt(e.currentTarget.dataset.i);
            if (this.props.getActive) {
                if (this.props.onTabMouseDown)
                    this.props.onTabMouseDown(i);
            }
            else {
                if (i !== this.getActive()) {
                    this.selectTab(i);
                }
            }
        };
        this.onLiClick = (e) => {
            // console.log('Tab.onLiClick', e.target);
            if (e.target.classList.contains('close')) {
                const i = parseInt(e.currentTarget.dataset.i);
                // console.log('close tab:', i);
                if (this.props.onTabClose)
                    this.props.onTabClose(i);
            }
        };
        this.state = {
            active: 0,
        };
    }
    getActive() {
        if (this.props.getActive)
            return this.props.getActive();
        return this.state.active;
    }
    selectTab(i) {
        if (i === this.getActive())
            return;
        const start = Date.now();
        this.setState({ active: i }, () => console.log('selectTab time:', Date.now() - start));
    }
    renderTitles() {
        return this.props.tabs.map((tab, i) => ((0, jsx_runtime_1.jsxs)("li", Object.assign({ className: i === this.getActive() ? 'active' : null, onMouseDown: this.onLiMouseDown, onClick: this.onLiClick, "data-i": i }, { children: [(0, jsx_runtime_1.jsx)("span", { children: tab.title }), this.props.canClose && (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "close" }, { children: "\u00D7" }))] }), tab.name)));
    }
    renderContents() {
        return this.props.tabs.map((tab, i) => ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: i === this.getActive() ? 'active' : null }, { children: tab.content }), tab.name)));
    }
    render() {
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: this.getCssClassNames() }, { children: [(0, jsx_runtime_1.jsx)("ul", { children: this.props.tabs && this.renderTitles() }), (0, jsx_runtime_1.jsx)("div", { children: this.props.tabs && this.renderContents() })] })));
    }
}
exports.Tab = Tab;
if (typeof window === 'object') {
    // @ts-ignore
    window.Tab = Tab;
}
