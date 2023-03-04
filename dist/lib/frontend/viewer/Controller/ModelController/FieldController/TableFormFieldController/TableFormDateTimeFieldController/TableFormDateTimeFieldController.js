"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableFormDateTimeFieldController = void 0;
const TableFormFieldController_1 = require("../TableFormFieldController");
const TableFormDateTimeFieldView_1 = require("./TableFormDateTimeFieldView");
const common_1 = require("../../../../../../common");
class TableFormDateTimeFieldController extends TableFormFieldController_1.TableFormFieldController {
    getViewClass() {
        return super.getViewClass() || TableFormDateTimeFieldView_1.TableFormDateTimeFieldView;
    }
    getValueForWidget(row) {
        const value = this.model.getValue(row);
        if (value)
            return common_1.Helper.formatDate(value, this.getFormat() || '{DD}.{MM}.{YYYY} {hh}:{mm}:{ss}');
        return '';
    }
}
exports.TableFormDateTimeFieldController = TableFormDateTimeFieldController;
if (typeof window === 'object') {
    // @ts-ignore
    window.TableFormDateTimeFieldController = TableFormDateTimeFieldController;
}
