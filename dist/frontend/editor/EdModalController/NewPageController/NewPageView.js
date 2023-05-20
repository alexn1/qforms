"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewPageView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const common_1 = require("../../../common");
class NewPageView extends common_1.ReactComponent {
    constructor(props) {
        super(props);
        this.onCreate = async (e) => {
            // console.log('NewPageView.onCreate');
            await this.props.ctrl.onCreate({
                name: this.name.getValue(),
                caption: this.caption.getValue(),
                startup: this.startup.getValue(),
            });
        };
        this.onKeyDown = (e) => {
            if (e.key === 'Escape') {
                this.props.ctrl.onClose();
            }
            else if (e.key === 'Enter') {
                this.onCreate();
            }
        };
        this.el = (0, react_1.createRef)();
        this.name = null;
        this.caption = null;
        this.startup = null;
    }
    render() {
        const ctrl = this.props.ctrl;
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `${this.getCssClassNames()} NewModelView`, ref: this.el, tabIndex: 0, onKeyDown: this.onKeyDown }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'NewModelView__header' }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'NewModelView__title' }, { children: "New Page" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "close", onClick: ctrl.onClose }, { children: (0, jsx_runtime_1.jsx)("span", { children: "\u00D7" }) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'NewModelView__body' }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "name" }, { children: "Name" })), (0, jsx_runtime_1.jsx)(common_1.TextBox, { id: "name", onCreate: (c) => (this.name = c), autocomplete: 'off', autoFocus: true })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "caption" }, { children: "Caption" })), (0, jsx_runtime_1.jsx)(common_1.TextBox, { id: "caption", onCreate: (c) => (this.caption = c), autocomplete: 'off' })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "startup" }, { children: "Startup" })), (0, jsx_runtime_1.jsx)(common_1.ComboBox, { id: "startup", items: [
                                        { value: 'false', title: 'false' },
                                        { value: 'true', title: 'true' },
                                    ], onCreate: (c) => (this.startup = c) })] })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'NewModelView__footer' }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", onClick: ctrl.onClose }, { children: "Close" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ name: "create", type: "button", onClick: this.onCreate }, { children: "Create" }))] }))] })));
    }
}
exports.NewPageView = NewPageView;
