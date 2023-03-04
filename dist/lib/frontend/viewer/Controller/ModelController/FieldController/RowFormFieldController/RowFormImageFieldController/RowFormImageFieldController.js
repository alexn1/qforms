"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFormImageFieldController = void 0;
const RowFormFieldController_1 = require("../RowFormFieldController");
const RowFormImageFieldView_1 = require("./RowFormImageFieldView");
class RowFormImageFieldController extends RowFormFieldController_1.RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormImageFieldView_1.RowFormImageFieldView;
    }
}
exports.RowFormImageFieldController = RowFormImageFieldController;
if (typeof window === 'object') {
    // @ts-ignore
    window.RowFormImageFieldController = RowFormImageFieldController;
}
