"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFormDateFieldController = void 0;
const RowFormFieldController_1 = require("../RowFormFieldController");
const RowFormDateFieldView_1 = require("./RowFormDateFieldView");
const Helper_1 = require("../../../../../../common/Helper");
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
Helper_1.Helper.registerGlobalClass(RowFormDateFieldController);
