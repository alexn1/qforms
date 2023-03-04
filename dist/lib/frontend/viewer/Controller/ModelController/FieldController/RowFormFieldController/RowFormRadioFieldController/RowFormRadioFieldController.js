"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFormRadioFieldController = void 0;
const RowFormFieldController_1 = require("../RowFormFieldController");
const RowFormRadioFieldView_1 = require("./RowFormRadioFieldView");
class RowFormRadioFieldController extends RowFormFieldController_1.RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormRadioFieldView_1.RowFormRadioFieldView;
    }
    getItems() {
        try {
            return this.getRows().map((row) => ({
                // value: this.valueToString(this.getModel().getValueValue(row)),
                value: this.getModel().getValueValue(row),
                title: this.getModel().getDisplayValue(row),
            }));
        }
        catch (err) {
            err.message = `${this.getModel().getFullName()}: ${err.message}`;
            throw err;
        }
    }
    getRows() {
        return this.getModel().getDataSource().getRows();
    }
}
exports.RowFormRadioFieldController = RowFormRadioFieldController;
if (typeof window === 'object') {
    // @ts-ignore
    window.RowFormRadioFieldController = RowFormRadioFieldController;
}
