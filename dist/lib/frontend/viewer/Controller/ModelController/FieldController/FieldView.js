"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldView = void 0;
const ModelView_1 = require("../ModelView");
class FieldView extends ModelView_1.ModelView {
    getStyle(row) {
        return this.getCtrl().getViewStyle(row);
    }
}
exports.FieldView = FieldView;
