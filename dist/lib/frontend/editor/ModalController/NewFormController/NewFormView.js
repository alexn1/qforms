"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewFormView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const common_1 = require("../../../common");
class NewFormView extends common_1.ReactComponent {
    constructor(props) {
        super(props);
        this.onCreate = async (e) => {
            // console.log('NewDataSourceView.onCreate');
            await this.props.ctrl.onCreate({
                name: this.name.getValue(),
                caption: this.caption.getValue(),
                class: this.class.getValue(),
            });
        };
        this.name = null;
        this.caption = null;
        this.class = null;
    }
    render() {
        const ctrl = this.props.ctrl;
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `${this.getCssClassNames()} NewModelView` }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'NewModelView__header' }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'NewModelView__title' }, { children: "New Form" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "close", onClick: ctrl.onClose }, { children: (0, jsx_runtime_1.jsx)("span", { children: "\u00D7" }) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'NewModelView__body' }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "name" }, { children: "Name" })), (0, jsx_runtime_1.jsx)(common_1.TextBox, { id: "name", onCreate: (c) => (this.name = c), autocomplete: 'off', autoFocus: true })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "caption" }, { children: "Caption" })), (0, jsx_runtime_1.jsx)(common_1.TextBox, { id: "caption", onCreate: (c) => (this.caption = c), autocomplete: 'off' })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "formClass" }, { children: "Class" })), (0, jsx_runtime_1.jsx)(common_1.ComboBox, { id: "formClass", value: 'TableForm', items: [
                                        { value: 'RowForm', title: 'RowForm' },
                                        { value: 'TableForm', title: 'TableForm' },
                                        { value: 'Form', title: 'Form' },
                                    ], onCreate: (c) => (this.class = c) })] })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'NewModelView__footer' }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", onClick: ctrl.onClose }, { children: "Close" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ name: "create", type: "button", onClick: this.onCreate }, { children: "Create" }))] }))] })));
    }
}
exports.NewFormView = NewFormView;
