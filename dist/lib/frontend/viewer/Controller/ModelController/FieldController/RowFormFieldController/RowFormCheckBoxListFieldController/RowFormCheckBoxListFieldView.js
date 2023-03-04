"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFormCheckBoxListFieldView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const RowFormFieldView_1 = require("../RowFormFieldView");
const common_1 = require("../../../../../../common");
require("./RowFormCheckBoxListFieldView.less");
class RowFormCheckBoxListFieldView extends RowFormFieldView_1.RowFormFieldView {
    getItems() {
        const ctrl = this.getCtrl();
        try {
            return ctrl.getRows().map((row) => {
                return ctrl.getItemFromRow(row);
            });
        }
        catch (err) {
            err.message = `${ctrl.getModel().getFullName()}: ${err.message}`;
            throw err;
        }
    }
    renderCheckBoxList() {
        const ctrl = this.getCtrl();
        return ((0, jsx_runtime_1.jsx)(common_1.CheckBoxList, { name: ctrl.getModel().getFullName(), classList: [`${this.getCssBlockName()}__checkboxlist`], onCreate: this.onWidgetCreate, value: ctrl.getValueForWidget(), readOnly: !ctrl.isEditable(), onChange: ctrl.onChange, items: this.getItems() }));
    }
    render() {
        return (0, jsx_runtime_1.jsx)("div", Object.assign({ className: this.getCssClassNames() }, { children: this.renderCheckBoxList() }));
    }
}
exports.RowFormCheckBoxListFieldView = RowFormCheckBoxListFieldView;
// @ts-ignore
window.RowFormCheckBoxListFieldView = RowFormCheckBoxListFieldView;
