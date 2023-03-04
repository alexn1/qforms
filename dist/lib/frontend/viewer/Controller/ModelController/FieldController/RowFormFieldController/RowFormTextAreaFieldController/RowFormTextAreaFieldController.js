"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFormTextAreaFieldController = void 0;
const RowFormFieldController_1 = require("../RowFormFieldController");
const RowFormTextAreaFieldView_1 = require("./RowFormTextAreaFieldView");
class RowFormTextAreaFieldController extends RowFormFieldController_1.RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormTextAreaFieldView_1.RowFormTextAreaFieldView;
    }
}
exports.RowFormTextAreaFieldController = RowFormTextAreaFieldController;
if (typeof window === 'object') {
    // @ts-ignore
    window.RowFormTextAreaFieldController = RowFormTextAreaFieldController;
}
