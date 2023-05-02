"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckBoxListFieldEditor = void 0;
const FieldEditor_1 = require("../FieldEditor");
class CheckBoxListFieldEditor extends FieldEditor_1.FieldEditor {
    static createData(params) {
        return {
            '@class': 'CheckBoxListField',
            '@attributes': Object.assign(Object.assign({}, FieldEditor_1.FieldEditor.createAttributes(params)), { readOnly: params.readOnly ? params.readOnly : 'false', notNull: params.notNull ? params.notNull : 'false', dataSourceName: params.dataSourceName ? params.dataSourceName : '', valueColumn: params.valueColumn ? params.valueColumn : '', displayColumn: params.displayColumn ? params.displayColumn : '' }),
        };
    }
}
exports.CheckBoxListFieldEditor = CheckBoxListFieldEditor;
