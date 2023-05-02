"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFormCheckBoxFieldController = void 0;
const RowFormFieldController_1 = require("../RowFormFieldController");
const RowFormCheckBoxFieldView_1 = require("./RowFormCheckBoxFieldView");
const Helper_1 = require("../../../../../../common/Helper");
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
Helper_1.Helper.registerGlobalClass(RowFormCheckBoxFieldController);
