"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFormPhoneFieldView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const RowFormFieldView_1 = require("../RowFormFieldView");
const common_1 = require("../../../../../../common");
require("./RowFormPhoneFieldView.less");
class RowFormPhoneFieldView extends RowFormFieldView_1.RowFormFieldView {
    constructor(props) {
        super(props);
        this.onClear = async (e) => {
            this.getCtrl().onChange('');
            setTimeout(() => {
                this.getWidget().getElement().focus();
            }, 0);
        };
        this.onFocus = async (e) => {
            this.addCssClass('focus');
            await this.rerender();
        };
        this.onBlur = async (value) => {
            // console.log('RowFormPhoneFieldView.onBlur', value);
            this.removeCssClass('focus');
            this.getCtrl().onBlur(value);
        };
        this.state = {
            classList: [],
        };
    }
    isCloseVisible() {
        const ctrl = this.getCtrl();
        if (!ctrl.isEditable())
            return false;
        return ctrl.getValueForWidget() !== '';
    }
    renderPhoneBox() {
        const ctrl = this.getCtrl();
        return ((0, jsx_runtime_1.jsx)(common_1.PhoneBox, { classList: [`${this.getCssBlockName()}__input`], value: ctrl.getValueForWidget(), readOnly: !ctrl.isEditable(), disabled: !ctrl.isEditable(), autoFocus: ctrl.isAutoFocus(), placeholder: ctrl.getPlaceholder() || null, autocomplete: ctrl.getAutocomplete(), onCreate: this.onWidgetCreate, onChange: ctrl.onChange, onFocus: this.onFocus, onBlur: this.onBlur }));
    }
    renderClearButton() {
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__close ${this.isCloseVisible() ? 'visible' : ''}`, onMouseDown: this.onClear }, { children: (0, jsx_runtime_1.jsx)(common_1.CloseIcon, {}) })));
    }
    renderPhoneIcon() {
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__icon` }, { children: (0, jsx_runtime_1.jsx)(common_1.PhoneIcon, {}) })));
    }
    render() {
        // console.log('RowFormPhoneFieldView.render');
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: this.getCssClassNames() }, { children: [this.renderPhoneBox(), this.renderClearButton(), this.renderPhoneIcon()] })));
    }
}
exports.RowFormPhoneFieldView = RowFormPhoneFieldView;
if (typeof window === 'object') {
    // @ts-ignore
    window.RowFormPhoneFieldView = RowFormPhoneFieldView;
}
