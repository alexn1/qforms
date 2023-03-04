"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFormFieldView = void 0;
const FieldView_1 = require("../FieldView");
class RowFormFieldView extends FieldView_1.FieldView {
    constructor(props) {
        super(props);
        this.onWidgetCreate = (widget) => {
            this.widget = widget;
        };
        this.widget = null;
    }
    getWidget() {
        return this.widget;
    }
    getClassList() {
        const ctrl = this.getCtrl();
        return [
            ...super.getClassList(),
            ...(ctrl.isEditable() ? ['editable'] : []),
            ...(ctrl.isChanged() ? ['changed'] : []),
            ...(ctrl.getErrorMessage() !== null ? ['error'] : []),
        ];
    }
}
exports.RowFormFieldView = RowFormFieldView;
// @ts-ignore
window.RowFormFieldView = RowFormFieldView;
