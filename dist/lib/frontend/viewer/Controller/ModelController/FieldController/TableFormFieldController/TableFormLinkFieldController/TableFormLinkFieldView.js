"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableFormLinkFieldView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const TableFormFieldView_1 = require("../TableFormFieldView");
require("./TableFormLinkFieldView.less");
class TableFormLinkFieldView extends TableFormFieldView_1.TableFormFieldView {
    render() {
        const row = this.props.row;
        const ctrl = this.props.ctrl;
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssClassNames()} ellipsis`, style: this.getStyle(row) }, { children: (0, jsx_runtime_1.jsx)("a", Object.assign({ href: "#", onClick: ctrl.onClick }, { children: ctrl.getValueForWidget(row) })) })));
    }
}
exports.TableFormLinkFieldView = TableFormLinkFieldView;
// @ts-ignore
window.TableFormLinkFieldView = TableFormLinkFieldView;
