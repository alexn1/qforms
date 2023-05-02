"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewDataSourceView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const common_1 = require("../../../common");
class NewDataSourceView extends common_1.ReactComponent {
    constructor(props) {
        super(props);
        this.onCreate = async (e) => {
            // console.log('NewDataSourceView.onCreate');
            await this.props.ctrl.onCreate({
                name: this.name.getValue(),
                class: this.class.getValue(),
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
        this.class = null;
    }
    render() {
        const ctrl = this.props.ctrl;
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `${this.getCssClassNames()} NewModelView`, ref: this.el, tabIndex: 0, onKeyDown: this.onKeyDown }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'NewModelView__header' }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'NewModelView__title' }, { children: "New Data Source" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "close", onClick: ctrl.onClose }, { children: (0, jsx_runtime_1.jsx)("span", { children: "\u00D7" }) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'NewModelView__body' }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "name" }, { children: "Name" })), (0, jsx_runtime_1.jsx)(common_1.TextBox, { id: 'name', onCreate: (c) => (this.name = c), autocomplete: 'off', autoFocus: true })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "class" }, { children: "Class" })), (0, jsx_runtime_1.jsx)(common_1.ComboBox, { id: "class", items: [
                                        { value: 'DataSource', title: 'DataSource' },
                                        { value: 'SqlDataSource', title: 'SqlDataSource' },
                                        { value: 'NoSqlDataSource', title: 'NoSqlDataSource' },
                                    ], onCreate: (c) => (this.class = c), value: 'SqlDataSource' })] })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'NewModelView__footer' }, { children: [(0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ onClick: ctrl.onClose }, { children: "Close" })), (0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ name: "create", onClick: this.onCreate }, { children: "Create" }))] }))] })));
    }
}
exports.NewDataSourceView = NewDataSourceView;
