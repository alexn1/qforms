"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComboBoxFieldEditor = void 0;
const FieldEditor_1 = require("../FieldEditor");
class ComboBoxFieldEditor extends FieldEditor_1.FieldEditor {
    static createData(params) {
        return {
            '@class': 'ComboBoxField',
            '@attributes': Object.assign(Object.assign({}, FieldEditor_1.FieldEditor.createAttributes(params)), { readOnly: params.readOnly ? params.readOnly : 'false', notNull: params.notNull ? params.notNull : 'false', placeholder: params.placeholder ? params.placeholder : '', dataSourceName: params.dataSourceName ? params.dataSourceName : '', valueColumn: params.valueColumn ? params.valueColumn : '', displayColumn: params.displayColumn ? params.displayColumn : '', newRowMode: params.newRowMode ? params.newRowMode : 'disabled', itemEditPage: params.itemEditPage ? params.itemEditPage : '', itemCreatePage: params.itemCreatePage ? params.itemCreatePage : '', itemCreateForm: params.itemCreateForm ? params.itemCreateForm : '', itemSelectPage: params.itemSelectPage ? params.itemSelectPage : '' })
        };
    }
}
exports.ComboBoxFieldEditor = ComboBoxFieldEditor;
