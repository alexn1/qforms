"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelFieldEditor = void 0;
const FieldEditor_1 = require("../FieldEditor");
class LabelFieldEditor extends FieldEditor_1.FieldEditor {
    static createData(params) {
        return {
            '@class': 'LabelField',
            '@attributes': Object.assign({}, FieldEditor_1.FieldEditor.createAttributes(params)),
        };
    }
}
exports.LabelFieldEditor = LabelFieldEditor;
