"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableFormDateFieldController = void 0;
const TableFormFieldController_1 = require("../TableFormFieldController");
const TableFormDateFieldView_1 = require("./TableFormDateFieldView");
const common_1 = require("../../../../../../common");
class TableFormDateFieldController extends TableFormFieldController_1.TableFormFieldController {
    getViewClass() {
        return super.getViewClass() || TableFormDateFieldView_1.TableFormDateFieldView;
    }
    getValueForWidget(row) {
        const value = this.model.getValue(row);
        if (value)
            return common_1.Helper.formatDate(value, this.getFormat() || '{DD}.{MM}.{YYYY} {hh}:{mm}:{ss}');
        return '';
    }
}
exports.TableFormDateFieldController = TableFormDateFieldController;
if (typeof window === 'object') {
    // @ts-ignore
    window.TableFormDateFieldController = TableFormDateFieldController;
}
