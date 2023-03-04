"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFormDateFieldController = void 0;
const RowFormFieldController_1 = require("../RowFormFieldController");
const RowFormDateFieldView_1 = require("./RowFormDateFieldView");
class RowFormDateFieldController extends RowFormFieldController_1.RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormDateFieldView_1.RowFormDateFieldView;
    }
    getValueForWidget() {
        return this.getValue();
    }
    setValueFromWidget(widgetValue) {
        this.setValue(widgetValue);
    }
}
exports.RowFormDateFieldController = RowFormDateFieldController;
if (typeof window === 'object') {
    // @ts-ignore
    window.RowFormDateFieldController = RowFormDateFieldController;
}
