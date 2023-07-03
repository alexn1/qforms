"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeClassView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const common_1 = require("../../../common");
class ChangeClassView extends common_1.ReactComponent {
    constructor(props) {
        super(props);
        this.onCreate = async (e) => {
            // console.debug('NewDataSourceView.onCreate');
            await this.props.ctrl.onCreate({
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
        this.class = null;
    }
    render() {
        const ctrl = this.props.ctrl;
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `${this.getCssClassNames()} NewModelView`, ref: this.el, tabIndex: 0, onKeyDown: this.onKeyDown }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'NewModelView__header' }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'NewModelView__title' }, { children: "Change Field Class" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "close", onClick: ctrl.onClose }, { children: (0, jsx_runtime_1.jsx)("span", { children: "\u00D7" }) }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'NewModelView__body' }, { children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "class" }, { children: "Class" })), (0, jsx_runtime_1.jsx)(common_1.ComboBox, { id: "class", items: [
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
                                ], value: ctrl.options.fieldCtrl.model.getClassName(), onCreate: (c) => (this.class = c) })] }) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'NewModelView__footer' }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", onClick: ctrl.onClose }, { children: "Close" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ name: "change", type: "button", onClick: this.onCreate }, { children: "Change" }))] }))] })));
    }
}
exports.ChangeClassView = ChangeClassView;
