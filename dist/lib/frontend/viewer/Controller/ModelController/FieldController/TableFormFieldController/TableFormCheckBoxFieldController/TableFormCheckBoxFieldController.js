"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableFormCheckBoxFieldController = void 0;
const TableFormFieldController_1 = require("../TableFormFieldController");
const TableFormCheckBoxFieldView_1 = require("./TableFormCheckBoxFieldView");
const Helper_1 = require("../../../../../../common/Helper");
class TableFormCheckBoxFieldController extends TableFormFieldController_1.TableFormFieldController {
    getViewClass() {
        return super.getViewClass() || TableFormCheckBoxFieldView_1.TableFormCheckBoxFieldView;
    }
    getValueForWidget(row) {
        return this.model.getValue(row);
    }
    getAlign() {
        return 'center';
    }
}
exports.TableFormCheckBoxFieldController = TableFormCheckBoxFieldController;
Helper_1.Helper.registerGlobalClass(TableFormCheckBoxFieldController);
