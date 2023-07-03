"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableFormFieldController = void 0;
const FieldController_1 = require("../FieldController");
class TableFormFieldController extends FieldController_1.FieldController {
    getValueForWidget(row) {
        // console.debug('TableFormFieldController.getValueForWidget');
        return this.valueToString(this.getModel().getValue(row));
    }
    getForm() {
        return this.getParent();
    }
    getAlign() {
        return null;
    }
}
exports.TableFormFieldController = TableFormFieldController;
