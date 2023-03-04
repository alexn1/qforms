"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFormCheckBoxFieldController = void 0;
const RowFormFieldController_1 = require("../RowFormFieldController");
const RowFormCheckBoxFieldView_1 = require("./RowFormCheckBoxFieldView");
class RowFormCheckBoxFieldController extends RowFormFieldController_1.RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormCheckBoxFieldView_1.RowFormCheckBoxFieldView;
    }
    getValueForWidget() {
        return this.getValue();
    }
    setValueFromWidget(widgetValue) {
        this.setValue(widgetValue);
    }
}
exports.RowFormCheckBoxFieldController = RowFormCheckBoxFieldController;
if (typeof window === 'object') {
    // @ts-ignore
    window.RowFormCheckBoxFieldController = RowFormCheckBoxFieldController;
}
