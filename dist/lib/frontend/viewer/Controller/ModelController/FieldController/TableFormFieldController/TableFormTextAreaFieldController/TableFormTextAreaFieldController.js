"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableFormTextAreaFieldController = void 0;
const TableFormFieldController_1 = require("../TableFormFieldController");
const TableFormTextAreaFieldView_1 = require("./TableFormTextAreaFieldView");
const Helper_1 = require("../../../../../../common/Helper");
class TableFormTextAreaFieldController extends TableFormFieldController_1.TableFormFieldController {
    getViewClass() {
        return super.getViewClass() || TableFormTextAreaFieldView_1.TableFormTextAreaFieldView;
    }
}
exports.TableFormTextAreaFieldController = TableFormTextAreaFieldController;
Helper_1.Helper.registerGlobalClass(TableFormTextAreaFieldController);
