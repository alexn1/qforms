"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFormTextBoxFieldController = void 0;
const RowFormFieldController_1 = require("../RowFormFieldController");
const RowFormTextBoxFieldView_1 = require("./RowFormTextBoxFieldView");
class RowFormTextBoxFieldController extends RowFormFieldController_1.RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormTextBoxFieldView_1.RowFormTextBoxFieldView;
    }
}
exports.RowFormTextBoxFieldController = RowFormTextBoxFieldController;
// @ts-ignore
window.RowFormTextBoxFieldController = RowFormTextBoxFieldController;
