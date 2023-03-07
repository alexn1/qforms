"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewKeyColumnView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const common_1 = require("../../../common");
class NewKeyColumnView extends common_1.ReactComponent {
    constructor(props) {
        super(props);
        this.onCreate = async (e) => {
            // console.log('NewParamView.onCreate');
            await this.props.ctrl.onCreate({
                name: this.name.getValue(),
            });
        };
        this.name = null;
    }
    render() {
        const ctrl = this.props.ctrl;
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `${this.getCssClassNames()} NewModelView` }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'NewModelView__header' }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'NewModelView__title' }, { children: "New Key Column" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "close", onClick: ctrl.onClose }, { children: (0, jsx_runtime_1.jsx)("span", { children: "\u00D7" }) }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'NewModelView__body' }, { children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "name" }, { children: "Name" })), (0, jsx_runtime_1.jsx)(common_1.TextBox, { id: "name", onCreate: (c) => (this.name = c), autocomplete: 'off', autoFocus: true })] }) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'NewModelView__footer' }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", onClick: ctrl.onClose }, { children: "Close" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ name: "create", type: "button", onClick: this.onCreate }, { children: "Create" }))] }))] })));
    }
}
exports.NewKeyColumnView = NewKeyColumnView;