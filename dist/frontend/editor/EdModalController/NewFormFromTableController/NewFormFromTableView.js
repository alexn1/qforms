"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewFormFromTableView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const common_1 = require("../../../common");
class NewFormFromTableView extends common_1.ReactComponent {
    constructor(props) {
        super(props);
        this.onCreate = async (e) => {
            // console.debug('NewDataSourceView.onCreate');
            await this.props.ctrl.onCreate({
                page: this.page.getValue(),
                class: this.class.getValue(),
                name: this.name.getValue(),
                caption: this.caption.getValue(),
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
        this.page = null;
        this.class = null;
        this.name = null;
        this.caption = null;
    }
    render() {
        const ctrl = this.props.ctrl;
        const tableController = ctrl.options.tableController;
        const pages = tableController.model.parent.parent.pageLinks.map((pageLink) => ({
            value: pageLink.getName(),
            title: pageLink.getName(),
        }));
        console.debug('pages:', pages);
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `${this.getCssClassNames()} NewModelView`, ref: this.el, tabIndex: 0, onKeyDown: this.onKeyDown }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'NewModelView__header' }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'NewModelView__title' }, { children: "New Form" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "close", onClick: ctrl.onClose }, { children: (0, jsx_runtime_1.jsx)("span", { children: "\u00D7" }) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'NewModelView__body' }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "table" }, { children: "Table" })), (0, jsx_runtime_1.jsx)(common_1.TextBox, { id: "table", disabled: true, value: tableController.model.getName() })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "page" }, { children: "Page" })), (0, jsx_runtime_1.jsx)(common_1.ComboBox, { id: "page", items: pages, value: pages[pages.length - 1].value, onCreate: (c) => (this.page = c) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "class" }, { children: "Form Class" })), (0, jsx_runtime_1.jsx)(common_1.ComboBox, { id: "class", value: 'TableForm', items: [
                                        { value: 'RowForm', title: 'RowForm' },
                                        { value: 'TableForm', title: 'TableForm' },
                                    ], onCreate: (c) => (this.class = c) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "name" }, { children: "Name" })), (0, jsx_runtime_1.jsx)(common_1.TextBox, { id: "name", value: ctrl.options.tableController.model.getName(), onCreate: (c) => (this.name = c), autocomplete: 'off', autoFocus: true })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "caption" }, { children: "Caption" })), (0, jsx_runtime_1.jsx)(common_1.TextBox, { id: "caption", onCreate: (c) => (this.caption = c), autocomplete: 'off' })] })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'NewModelView__footer' }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", onClick: ctrl.onClose }, { children: "Close" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ name: "create", type: "button", onClick: this.onCreate }, { children: "Create" }))] }))] })));
    }
}
exports.NewFormFromTableView = NewFormFromTableView;
