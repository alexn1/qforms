"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFormImageFieldView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const RowFormFieldView_1 = require("../RowFormFieldView");
require("./RowFormImageFieldView.less");
const Image_1 = require("../../../../../../common/widget/Image/Image");
class RowFormImageFieldView extends RowFormFieldView_1.RowFormFieldView {
    constructor() {
        super(...arguments);
        this.onImageClick = async (e) => {
            const ctrl = this.props.ctrl;
            console.log('RowFormImageFieldView.onImageClick');
        };
    }
    render() {
        const ctrl = this.props.ctrl;
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: this.getCssClassNames(), style: this.getStyle(ctrl.getRow()) }, { children: (0, jsx_runtime_1.jsx)(Image_1.Image, { src: ctrl.getValueForWidget(), onClick: this.onImageClick }) })));
    }
}
exports.RowFormImageFieldView = RowFormImageFieldView;
// @ts-ignore
window.RowFormImageFieldView = RowFormImageFieldView;
