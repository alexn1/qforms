"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableFormTimeFieldView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const TableFormFieldView_1 = require("../TableFormFieldView");
class TableFormTimeFieldView extends TableFormFieldView_1.TableFormFieldView {
    render() {
        const row = this.props.row;
        const ctrl = this.getCtrl();
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssClassNames()} ellipsis`, style: this.getStyle(row) }, { children: (0, jsx_runtime_1.jsx)("span", Object.assign({ ref: this.span }, { children: ctrl.getValueForWidget(row) })) })));
    }
}
exports.TableFormTimeFieldView = TableFormTimeFieldView;
if (typeof window === 'object') {
    // @ts-ignore
    window.TableFormTimeFieldView = TableFormTimeFieldView;
}
