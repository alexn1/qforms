"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFormCheckBoxFieldView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const RowFormFieldView_1 = require("../RowFormFieldView");
const common_1 = require("../../../../../../common");
require("./RowFormCheckBoxFieldView.less");
class RowFormCheckBoxFieldView extends RowFormFieldView_1.RowFormFieldView {
    constructor() {
        super(...arguments);
        this.onCheckBoxChange = (checked, e) => {
            this.getCtrl().onChange(checked);
        };
    }
    render() {
        // console.debug('RowFormCheckBoxFieldView.render');
        const ctrl = this.getCtrl();
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: this.getCssClassNames() }, { children: (0, jsx_runtime_1.jsx)(common_1.CheckBox, { onCreate: this.onWidgetCreate, checked: ctrl.getValueForWidget(), readOnly: !ctrl.isEditable(), disabled: !ctrl.isEditable(), onChange: this.onCheckBoxChange }) })));
    }
}
exports.RowFormCheckBoxFieldView = RowFormCheckBoxFieldView;
