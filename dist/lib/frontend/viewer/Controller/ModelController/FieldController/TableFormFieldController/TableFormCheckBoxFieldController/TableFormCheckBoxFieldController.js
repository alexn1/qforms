"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableFormCheckBoxFieldController = void 0;
const TableFormFieldController_1 = require("../TableFormFieldController");
const TableFormCheckBoxFieldView_1 = require("./TableFormCheckBoxFieldView");
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
if (typeof window === 'object') {
    // @ts-ignore
    window.TableFormCheckBoxFieldController = TableFormCheckBoxFieldController;
}
