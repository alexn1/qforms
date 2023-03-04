"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableFormTimeFieldController = void 0;
const TableFormFieldController_1 = require("../TableFormFieldController");
const TableFormTimeFieldView_1 = require("./TableFormTimeFieldView");
const common_1 = require("../../../../../../common");
class TableFormTimeFieldController extends TableFormFieldController_1.TableFormFieldController {
    getViewClass() {
        return super.getViewClass() || TableFormTimeFieldView_1.TableFormTimeFieldView;
    }
    getValueForWidget(row) {
        const value = this.model.getValue(row);
        return common_1.TimeBox.getStringValue(value);
    }
}
exports.TableFormTimeFieldController = TableFormTimeFieldController;
// @ts-ignore
window.TableFormTimeFieldController = TableFormTimeFieldController;
