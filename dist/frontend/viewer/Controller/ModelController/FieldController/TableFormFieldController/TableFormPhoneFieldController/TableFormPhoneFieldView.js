"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableFormPhoneFieldView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const TableFormFieldView_1 = require("../TableFormFieldView");
const common_1 = require("../../../../../../common");
class TableFormPhoneFieldView extends TableFormFieldView_1.TableFormFieldView {
    render() {
        const row = this.props.row;
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssClassNames()} ellipsis`, style: this.getStyle(row) }, { children: (0, jsx_runtime_1.jsx)("span", Object.assign({ ref: this.span }, { children: common_1.PhoneBox.formatPhoneNumber(this.getCtrl().getValueForWidget(row)) })) })));
    }
}
exports.TableFormPhoneFieldView = TableFormPhoneFieldView;
