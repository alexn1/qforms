"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFormTextBoxFieldController = void 0;
const RowFormFieldController_1 = require("../RowFormFieldController");
const RowFormTextBoxFieldView_1 = require("./RowFormTextBoxFieldView");
const Helper_1 = require("../../../../../../common/Helper");
class RowFormTextBoxFieldController extends RowFormFieldController_1.RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormTextBoxFieldView_1.RowFormTextBoxFieldView;
    }
}
exports.RowFormTextBoxFieldController = RowFormTextBoxFieldController;
Helper_1.Helper.registerGlobalClass(RowFormTextBoxFieldController);
