"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableFormPhoneFieldController = void 0;
const TableFormFieldController_1 = require("../TableFormFieldController");
const TableFormPhoneFieldView_1 = require("./TableFormPhoneFieldView");
const Helper_1 = require("../../../../../../common/Helper");
class TableFormPhoneFieldController extends TableFormFieldController_1.TableFormFieldController {
    getViewClass() {
        return super.getViewClass() || TableFormPhoneFieldView_1.TableFormPhoneFieldView;
    }
}
exports.TableFormPhoneFieldController = TableFormPhoneFieldController;
Helper_1.Helper.registerGlobalClass(TableFormPhoneFieldController);
