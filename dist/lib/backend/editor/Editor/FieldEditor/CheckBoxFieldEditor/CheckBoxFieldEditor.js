"use strict";
const FieldEditor = require('../FieldEditor');
class CheckBoxFieldEditor extends FieldEditor {
    static createData(params) {
        return {
            '@class': 'CheckBoxField',
            '@attributes': Object.assign(Object.assign({}, FieldEditor.createData(params)), { readOnly: params.readOnly ? params.readOnly : 'false', notNull: params.notNull ? params.notNull : 'false' })
        };
    }
}
module.exports = CheckBoxFieldEditor;
