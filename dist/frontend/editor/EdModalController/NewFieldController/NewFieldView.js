"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewFieldView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const common_1 = require("../../../common");
class NewFieldView extends common_1.ReactComponent {
    constructor(props) {
        super(props);
        this.onCreate = async (e) => {
            // console.debug('NewFieldView.onCreate');
            await this.props.ctrl.onCreate({
                class: this.class.getValue(),
                name: this.name.getValue(),
                caption: this.caption.getValue() || this.name.getValue(),
                type: this.type.getValue(),
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
        this.class = null;
        this.name = null;
        this.caption = null;
        this.type = null;
    }
    render() {
        const ctrl = this.props.ctrl;
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `${this.getCssClassNames()} NewModelView`, ref: this.el, tabIndex: 0, onKeyDown: this.onKeyDown }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'NewModelView__header' }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'NewModelView__title' }, { children: "New Field" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "close", onClick: ctrl.onClose }, { children: (0, jsx_runtime_1.jsx)("span", { children: "\u00D7" }) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'NewModelView__body' }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "name" }, { children: "Name" })), (0, jsx_runtime_1.jsx)(common_1.TextBox, { id: "name", onCreate: (c) => (this.name = c), autocomplete: 'off', autoFocus: true })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "class" }, { children: "Class" })), (0, jsx_runtime_1.jsx)(common_1.ComboBox, { id: "class", items: [
                                        { value: 'TextBoxField' },
                                        { value: 'ComboBoxField' },
                                        { value: 'TextAreaField' },
                                        { value: 'LinkField' },
                                        { value: 'ImageField' },
                                        { value: 'LabelField' },
                                        { value: 'DateField' },
                                        { value: 'TimeField' },
                                        { value: 'DateTimeField' },
                                        { value: 'CheckBoxField' },
                                        { value: 'CheckBoxListField' },
                                        { value: 'FileField' },
                                        { value: 'PhoneField' },
                                        { value: 'PasswordField' },
                                        { value: 'RadioField' },
                                    ], onCreate: (c) => (this.class = c) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "caption" }, { children: "Caption" })), (0, jsx_runtime_1.jsx)(common_1.TextBox, { id: "caption", onCreate: (c) => (this.caption = c), autocomplete: 'off' })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "type" }, { children: "Type" })), (0, jsx_runtime_1.jsx)(common_1.ComboBox, { id: "type", value: '', items: [
                                        { value: '', title: '' },
                                        { value: 'string', title: 'string' },
                                        { value: 'number', title: 'number' },
                                        { value: 'boolean', title: 'boolean' },
                                        { value: 'object', title: 'object' },
                                        { value: 'date', title: 'date' },
                                    ], onCreate: (c) => (this.type = c) })] })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'NewModelView__footer' }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", onClick: ctrl.onClose }, { children: "Close" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ name: "create", type: "button", onClick: this.onCreate }, { children: "Create" }))] }))] })));
    }
}
exports.NewFieldView = NewFieldView;
