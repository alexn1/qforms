"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFormDateFieldView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const RowFormFieldView_1 = require("../RowFormFieldView");
const common_1 = require("../../../../../../common");
require("./RowFormDateFieldView.less");
class RowFormDateFieldView extends RowFormFieldView_1.RowFormFieldView {
    render() {
        const ctrl = this.getCtrl();
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: this.getCssClassNames() }, { children: (0, jsx_runtime_1.jsx)(common_1.DropdownDatePicker, { classList: [`${this.getCssBlockName()}__date-picker`], onCreate: this.onWidgetCreate, value: ctrl.getValueForWidget(), readOnly: !ctrl.isEditable(), onChange: ctrl.onChange, placeholder: ctrl.getPlaceholder(), format: ctrl.getFormat(), oldDates: this.props.oldDates, 
                // getMinDate={this.props.getMinDate}
                minDate: this.props.minDate, debug: ctrl.getApp().getHostApp().isDebugMode() }) })));
    }
}
exports.RowFormDateFieldView = RowFormDateFieldView;
