"use strict";
const FieldEditor = require('../FieldEditor');
class CheckBoxListFieldEditor extends FieldEditor {
    static createData(params) {
        return {
            '@class': 'CheckBoxListField',
            '@attributes': Object.assign(Object.assign({}, FieldEditor.createAttributes(params)), { readOnly: params.readOnly ? params.readOnly : 'false', notNull: params.notNull ? params.notNull : 'false', dataSourceName: params.dataSourceName ? params.dataSourceName : '', valueColumn: params.valueColumn ? params.valueColumn : '', displayColumn: params.displayColumn ? params.displayColumn : '' })
        };
    }
}
module.exports = CheckBoxListFieldEditor;