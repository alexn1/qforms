"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableFormFieldController = void 0;
const FieldController_1 = require("../FieldController");
class TableFormFieldController extends FieldController_1.FieldController {
    getValueForWidget(row) {
        // console.log('TableFormFieldController.getValueForWidget');
        return this.valueToString(this.model.getValue(row));
    }
    getForm() {
        return this.parent;
    }
    getAlign() {
        return null;
    }
}
exports.TableFormFieldController = TableFormFieldController;
if (typeof window === 'object') {
    // @ts-ignore
    window.TableFormFieldController = TableFormFieldController;
}
