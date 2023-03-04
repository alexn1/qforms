"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableFormCheckBoxFieldView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const TableFormFieldView_1 = require("../TableFormFieldView");
const common_1 = require("../../../../../../common");
require("./TableFormCheckBoxFieldView.less");
class TableFormCheckBoxFieldView extends TableFormFieldView_1.TableFormFieldView {
    render() {
        const row = this.props.row;
        const ctrl = this.getCtrl();
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: this.getCssClassNames(), style: Object.assign(Object.assign({}, this.getStyle(row)), { textAlign: ctrl.getAlign() }) }, { children: (0, jsx_runtime_1.jsx)(common_1.CheckBox, { ref: this.span, checked: ctrl.getValueForWidget(row), readOnly: true, disabled: true }) })));
    }
}
exports.TableFormCheckBoxFieldView = TableFormCheckBoxFieldView;
if (typeof window === 'object') {
    // @ts-ignore
    window.TableFormCheckBoxFieldView = TableFormCheckBoxFieldView;
}
