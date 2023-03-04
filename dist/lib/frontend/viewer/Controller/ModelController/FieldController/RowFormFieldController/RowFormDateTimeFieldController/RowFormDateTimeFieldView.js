"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFormDateTimeFieldView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const RowFormFieldView_1 = require("../RowFormFieldView");
const common_1 = require("../../../../../../common");
require("./RowFormDateTimeFieldView.less");
class RowFormDateTimeFieldView extends RowFormFieldView_1.RowFormFieldView {
    constructor() {
        super(...arguments);
        this.onClear2 = async () => {
            // console.log('RowFormDateTimeFieldView.onClear2');
            this.getCtrl().onChange2(null);
        };
    }
    isCloseVisible() {
        if (this.props.readOnly)
            return false;
        const { ctrl } = this.props;
        if (!ctrl.widget2) {
            return this.props.value !== undefined;
        }
        return ctrl.widget2.state.value !== '';
    }
    renderDatePart() {
        const ctrl = this.getCtrl();
        return ((0, jsx_runtime_1.jsx)(common_1.DropdownDatePicker, { classList: [`${this.getCssBlockName()}__dropdown-date-picker`], onCreate: this.onWidgetCreate, value: ctrl.getValueForWidget(), readOnly: !ctrl.isEditable(), onChange: ctrl.onChange, placeholder: ctrl.getPlaceholder(), format: ctrl.getFormat(), oldDates: this.props.oldDates, 
            // getMinDate={this.props.getMinDate}
            highlightedDate: ctrl.getHighlightedDate ? ctrl.getHighlightedDate() : null, selectToday: ctrl.getSelectToday ? ctrl.getSelectToday() : null, minDate: ctrl.getMinDate ? ctrl.getMinDate() : null }));
    }
    renderTimePart() {
        const ctrl = this.getCtrl();
        return ((0, jsx_runtime_1.jsx)(common_1.TimeBox2, { classList: [`${this.getCssBlockName()}__time-box`], onCreate: ctrl.onView2Create, readOnly: !ctrl.isEditable(), value: ctrl.getValueForTime(), onChange: ctrl.onChange2, onBlur: ctrl.isValidateOnBlur2() ? ctrl.onBlur2 : null, placeholder: ctrl.getPlaceholder2(), onClear: this.onClear2 }));
    }
    getMode() {
        return this.getCtrl().state.value ? 'datetime' : 'date';
    }
    render() {
        // console.log('RowFormDateTimeFieldView.render');
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `${this.getCssClassNames()} ${this.getMode()}`, style: this.getStyle(this.getCtrl().getRow()) }, { children: [this.renderDatePart(), this.renderTimePart()] })));
    }
}
exports.RowFormDateTimeFieldView = RowFormDateTimeFieldView;
// @ts-ignore
window.RowFormDateTimeFieldView = RowFormDateTimeFieldView;
