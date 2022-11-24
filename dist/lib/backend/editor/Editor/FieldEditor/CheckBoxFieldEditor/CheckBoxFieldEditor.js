"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckBoxFieldEditor = void 0;
const FieldEditor_1 = require("../FieldEditor");
class CheckBoxFieldEditor extends FieldEditor_1.FieldEditor {
    static createData(params) {
        return {
            '@class': 'CheckBoxField',
            '@attributes': Object.assign(Object.assign({}, FieldEditor_1.FieldEditor.createAttributes(params)), { readOnly: params.readOnly ? params.readOnly : 'false', notNull: params.notNull ? params.notNull : 'false' })
        };
    }
}
exports.CheckBoxFieldEditor = CheckBoxFieldEditor;
