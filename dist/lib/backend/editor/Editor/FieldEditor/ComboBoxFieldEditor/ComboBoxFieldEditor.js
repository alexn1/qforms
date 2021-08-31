"use strict";
const FieldEditor = require('../FieldEditor');
class ComboBoxFieldEditor extends FieldEditor {
    static createData(params) {
        return {
            '@class': 'ComboBoxField',
            '@attributes': Object.assign(Object.assign({}, FieldEditor.createAttributes(params)), { readOnly: params.readOnly ? params.readOnly : 'false', notNull: params.notNull ? params.notNull : 'false', placeholder: params.placeholder ? params.placeholder : '', dataSourceName: params.dataSourceName ? params.dataSourceName : '', valueColumn: params.valueColumn ? params.valueColumn : '', displayColumn: params.displayColumn ? params.displayColumn : '', newRowMode: params.newRowMode ? params.newRowMode : 'disabled', itemEditPage: params.itemEditPage ? params.itemEditPage : '', itemCreatePage: params.itemCreatePage ? params.itemCreatePage : '', itemCreateForm: params.itemCreateForm ? params.itemCreateForm : '' })
        };
    }
}
module.exports = ComboBoxFieldEditor;
