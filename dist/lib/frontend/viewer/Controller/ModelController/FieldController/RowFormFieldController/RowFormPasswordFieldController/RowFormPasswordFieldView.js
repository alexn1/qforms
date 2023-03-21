"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFormPasswordFieldView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const RowFormFieldView_1 = require("../RowFormFieldView");
const common_1 = require("../../../../../../common");
require("./RowFormPasswordFieldView.less");
class RowFormPasswordFieldView extends RowFormFieldView_1.RowFormFieldView {
    constructor(props) {
        super(props);
        this.onCloseClick = async (e) => {
            // console.log('RowFormPasswordFieldView.onCloseClick');
            const ctrl = this.getCtrl();
            this.getWidget().state.value = '';
            this.getWidget().setState({ value: '' });
            ctrl.onChange('');
            this.getWidget().getElement().focus();
        };
        this.onFocus = async (e) => {
            // console.log('RowFormPasswordFieldView.onFocus');
            this.addCssClass('focus');
            await this.rerender();
        };
        this.onBlur = async (e) => {
            // console.log('RowFormPasswordFieldView.onBlur');
            this.removeCssClass('focus');
            await this.rerender();
        };
        this.onIconClick = (e) => {
            this.setState((prevState) => {
                return {
                    type: prevState.type === 'password' ? 'text' : 'password',
                };
            });
        };
        this.state = {
            classList: [],
            type: 'password',
        };
    }
    isCloseVisible() {
        // console.log('RowFormPasswordFieldView.isCloseVisible', this.props.value);
        const ctrl = this.getCtrl();
        if (!ctrl.isEditable())
            return false;
        if (!this.getWidget()) {
            return this.props.value !== undefined;
        }
        // console.log('this.getWidget().state.value:', this.getWidget().state.value);
        return this.getWidget().state.value !== '';
    }
    render() {
        const ctrl = this.getCtrl();
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: this.getCssClassNames() }, { children: [(0, jsx_runtime_1.jsx)(common_1.TextBox, { classList: [`${this.getCssBlockName()}__input`], type: this.state.type, value: ctrl.getValueForWidget(), readOnly: !ctrl.isEditable(), disabled: !ctrl.isEditable(), autoFocus: ctrl.isAutoFocus(), placeholder: ctrl.getPlaceholder() || null, autocomplete: ctrl.getAutocomplete(), onCreate: this.onWidgetCreate, onChange: ctrl.onChange, onFocus: this.onFocus, onBlur: this.onBlur }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__close ${this.isCloseVisible() ? 'visible' : ''}`, onClick: this.onCloseClick }, { children: (0, jsx_runtime_1.jsx)(common_1.CloseIcon, {}) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__icon`, onClick: this.onIconClick }, { children: this.state.type === 'password' ? (0, jsx_runtime_1.jsx)(common_1.VisibilityIcon, {}) : (0, jsx_runtime_1.jsx)(common_1.VisibilityOffIcon, {}) }))] })));
    }
}
exports.RowFormPasswordFieldView = RowFormPasswordFieldView;
if (typeof window === 'object') {
    // @ts-ignore
    window.RowFormPasswordFieldView = RowFormPasswordFieldView;
}
