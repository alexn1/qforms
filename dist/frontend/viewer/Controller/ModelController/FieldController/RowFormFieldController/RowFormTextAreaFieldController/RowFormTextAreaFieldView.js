"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFormTextAreaFieldView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const RowFormFieldView_1 = require("../RowFormFieldView");
const common_1 = require("../../../../../../common");
require("./RowFormTextAreaFieldView.less");
class RowFormTextAreaFieldView extends RowFormFieldView_1.RowFormFieldView {
    constructor(props) {
        super(props);
        this.onFocus = async (e) => {
            // console.log('RowFormTextAreaFieldView.onFocus');
            this.addCssClass('focus');
            await this.rerender();
        };
        this.onBlur = async (e) => {
            // console.log('RowFormTextAreaFieldView.onBlur');
            this.removeCssClass('focus');
            await this.rerender();
        };
        this.state = {
            classList: [],
        };
    }
    render() {
        // console.log('RowFormTextAreaFieldView.render', this.state);
        const ctrl = this.getCtrl();
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: this.getCssClassNames() }, { children: (0, jsx_runtime_1.jsx)(common_1.TextArea, { classList: [`${this.getCssBlockName()}__textarea`], onCreate: this.onWidgetCreate, value: ctrl.getValueForWidget(), readOnly: !ctrl.isEditable(), disabled: !ctrl.isEditable(), onChange: ctrl.onChange, placeholder: ctrl.getPlaceholder(), rows: ctrl.getModel().getRows(), cols: ctrl.getModel().getCols(), onFocus: this.onFocus, onBlur: this.onBlur }) })));
    }
}
exports.RowFormTextAreaFieldView = RowFormTextAreaFieldView;
