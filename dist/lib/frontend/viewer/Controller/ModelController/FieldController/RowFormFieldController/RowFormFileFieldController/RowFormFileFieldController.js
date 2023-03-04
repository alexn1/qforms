"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFormFileFieldController = void 0;
const RowFormFieldController_1 = require("../RowFormFieldController");
const RowFormFileFieldView_1 = require("./RowFormFileFieldView");
class RowFormFileFieldController extends RowFormFieldController_1.RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormFileFieldView_1.RowFormFileFieldView;
    }
}
exports.RowFormFileFieldController = RowFormFileFieldController;
// @ts-ignore
window.RowFormFileFieldController = RowFormFileFieldController;
