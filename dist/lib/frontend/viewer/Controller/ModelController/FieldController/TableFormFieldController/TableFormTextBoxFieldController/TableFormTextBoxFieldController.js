"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableFormTextBoxFieldController = void 0;
const TableFormFieldController_1 = require("../TableFormFieldController");
const TableFormTextBoxFieldView_1 = require("./TableFormTextBoxFieldView");
const common_1 = require("../../../../../../common");
class TableFormTextBoxFieldController extends TableFormFieldController_1.TableFormFieldController {
    getViewClass() {
        return super.getViewClass() || TableFormTextBoxFieldView_1.TableFormTextBoxFieldView;
    }
}
exports.TableFormTextBoxFieldController = TableFormTextBoxFieldController;
common_1.Helper.registerGlobalClass(TableFormTextBoxFieldController);
