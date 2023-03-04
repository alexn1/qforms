"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFormTimeFieldView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const RowFormFieldView_1 = require("../RowFormFieldView");
const common_1 = require("../../../../../../common");
require("./RowFormTimeFieldView.less");
class RowFormTimeFieldView extends RowFormFieldView_1.RowFormFieldView {
    constructor() {
        super(...arguments);
        this.onCloseClick = async (e) => {
            console.log('RowFormTimeFieldView.onCloseClick');
            /*const ctrl = this.props.ctrl;
            this.getWidget().state.value = '';
            this.getWidget().setState({value: ''});
            ctrl.onChange(null);*/
        };
    }
    isCloseVisible() {
        // console.log('RowFormTimeFieldView.isCloseVisible', this.props.value);
        if (this.props.readOnly)
            return false;
        if (!this.getWidget()) {
            return this.props.value !== undefined;
        }
        // console.log('this.getWidget().state.value:', ctrl.view.state.value);
        return this.getWidget().state.value !== '';
    }
    render() {
        const ctrl = this.props.ctrl;
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: this.getCssClassNames() }, { children: [(0, jsx_runtime_1.jsx)(common_1.TimeBox, { onCreate: this.onWidgetCreate, value: ctrl.getValueForWidget(), readOnly: !ctrl.isEditable(), onChange: ctrl.onChange, onBlur: ctrl.onBlur, placeholder: ctrl.getPlaceholder() }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: `close ${this.isCloseVisible() ? 'visible' : ''}`, onClick: this.onCloseClick }, { children: (0, jsx_runtime_1.jsx)(common_1.CloseIcon, {}) }))] })));
    }
}
exports.RowFormTimeFieldView = RowFormTimeFieldView;
if (typeof window === 'object') {
    // @ts-ignore
    window.RowFormTimeFieldView = RowFormTimeFieldView;
}
