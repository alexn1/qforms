"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableFormDateFieldView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const TableFormFieldView_1 = require("../TableFormFieldView");
class TableFormDateFieldView extends TableFormFieldView_1.TableFormFieldView {
    render() {
        const row = this.props.row;
        const ctrl = this.props.ctrl;
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssClassNames()} ellipsis`, style: this.getStyle(row) }, { children: (0, jsx_runtime_1.jsx)("span", Object.assign({ ref: this.span }, { children: ctrl.getValueForWidget(row) })) })));
    }
}
exports.TableFormDateFieldView = TableFormDateFieldView;
if (typeof window === 'object') {
    // @ts-ignore
    window.TableFormDateFieldView = TableFormDateFieldView;
}