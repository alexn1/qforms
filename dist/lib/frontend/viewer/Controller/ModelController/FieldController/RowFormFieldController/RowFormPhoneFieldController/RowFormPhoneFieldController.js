"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFormPhoneFieldController = void 0;
const RowFormFieldController_1 = require("../RowFormFieldController");
const RowFormPhoneFieldView_1 = require("./RowFormPhoneFieldView");
const Helper_1 = require("../../../../../../common/Helper");
class RowFormPhoneFieldController extends RowFormFieldController_1.RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormPhoneFieldView_1.RowFormPhoneFieldView;
    }
    getPhoneFormatErrorText() {
        return this.getModel().getApp().getText().form.phoneNumberFormatError;
    }
    getError() {
        const error = super.getError();
        if (error)
            return error;
        // russian phone format validator
        const value = this.getValue();
        if (value && value.substr(0, 2) === '+7' && value.length < 12) {
            return this.getPhoneFormatErrorText();
        }
        return null;
    }
}
exports.RowFormPhoneFieldController = RowFormPhoneFieldController;
Helper_1.Helper.registerGlobalClass(RowFormPhoneFieldController);
