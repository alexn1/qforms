"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFormTextBoxFieldView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const RowFormFieldView_1 = require("../RowFormFieldView");
const common_1 = require("../../../../../../common");
require("./RowFormTextBoxFieldView.less");
class RowFormTextBoxFieldView extends RowFormFieldView_1.RowFormFieldView {
    constructor(props) {
        super(props);
        this.onClear = async (e) => {
            this.getCtrl().onChange('');
            setTimeout(() => {
                this.getWidget().getElement().focus();
            }, 0);
        };
        this.onFocus = async (e) => {
            // console.log('RowFormTextBoxFieldView.onFocus');
            this.addCssClass('focus');
            await this.rerender();
        };
        this.onBlur = async (e) => {
            // console.log('RowFormTextBoxFieldView.onBlur');
            const value = e.target.value;
            this.removeCssClass('focus');
            this.getCtrl().onBlur(value);
        };
        this.state = {
            classList: [],
        };
    }
    isCloseVisible() {
        // console.log('RowFormTextBoxFieldView.isCloseVisible', this.props.value);
        const ctrl = this.getCtrl();
        if (!ctrl.isEditable())
            return false;
        return ctrl.getValueForWidget() !== '';
    }
    renderTextBox() {
        const ctrl = this.getCtrl();
        return ((0, jsx_runtime_1.jsx)(common_1.TextBox, { classList: [`${this.getCssBlockName()}__input`], value: ctrl.getValueForWidget(), readOnly: !ctrl.isEditable(), enabled: ctrl.isEditable(), autoFocus: ctrl.isAutoFocus(), placeholder: ctrl.getPlaceholder() || null, autocomplete: ctrl.getAutocomplete(), onCreate: this.onWidgetCreate, onChange: ctrl.onChange, onFocus: this.onFocus, onBlur: this.onBlur }));
    }
    renderCloseIcon() {
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__close ${this.isCloseVisible() ? 'visible' : ''}`, onMouseDown: this.onClear }, { children: (0, jsx_runtime_1.jsx)(common_1.CloseIcon, {}) })));
    }
    render() {
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: this.getCssClassNames() }, { children: [this.renderTextBox(), this.renderCloseIcon()] })));
    }
}
exports.RowFormTextBoxFieldView = RowFormTextBoxFieldView;
if (typeof window === 'object') {
    // @ts-ignore
    window.RowFormTextBoxFieldView = RowFormTextBoxFieldView;
}
