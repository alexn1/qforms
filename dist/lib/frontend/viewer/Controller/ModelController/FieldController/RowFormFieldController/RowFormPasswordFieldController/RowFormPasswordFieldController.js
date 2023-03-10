"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFormPasswordFieldController = void 0;
const RowFormFieldController_1 = require("../RowFormFieldController");
const RowFormPasswordFieldView_1 = require("./RowFormPasswordFieldView");
const Helper_1 = require("../../../../../../common/Helper");
class RowFormPasswordFieldController extends RowFormFieldController_1.RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormPasswordFieldView_1.RowFormPasswordFieldView;
    }
}
exports.RowFormPasswordFieldController = RowFormPasswordFieldController;
Helper_1.Helper.registerGlobalClass(RowFormPasswordFieldController);
