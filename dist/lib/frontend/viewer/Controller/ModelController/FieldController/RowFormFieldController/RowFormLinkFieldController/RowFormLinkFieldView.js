"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFormLinkFieldView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const RowFormFieldView_1 = require("../RowFormFieldView");
require("./RowFormLinkFieldView.less");
class RowFormLinkFieldView extends RowFormFieldView_1.RowFormFieldView {
    render() {
        const ctrl = this.getCtrl();
        let href = ctrl.getValueForWidget();
        let displayValue = ctrl.getValueForWidget();
        // valueOfDisplayColumn
        const valueOfDisplayColumn = ctrl.getDisplayValue();
        if (valueOfDisplayColumn) {
            displayValue = valueOfDisplayColumn;
        }
        const pageName = ctrl.getModel().getAttr('page');
        if (pageName) {
            const value = ctrl.getValueForWidget();
            href = ctrl.getPage().createOpenInNewLink(pageName, JSON.stringify([value]));
            // console.log('href:', link);
        }
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: this.getCssClassNames() }, { children: (0, jsx_runtime_1.jsx)("a", Object.assign({ href: href, onClick: ctrl.onClick, target: '_blank' }, { children: displayValue })) })));
    }
}
exports.RowFormLinkFieldView = RowFormLinkFieldView;
