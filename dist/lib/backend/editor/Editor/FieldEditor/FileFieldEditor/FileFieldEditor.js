"use strict";
const FieldEditor = require('../FieldEditor');
class FileFieldEditor extends FieldEditor {
    static createData(params) {
        return {
            '@class': 'FileField',
            '@attributes': Object.assign(Object.assign({}, FieldEditor.createAttributes(params)), { readOnly: params.readOnly ? params.readOnly : 'false', notNull: params.notNull ? params.notNull : 'false' })
        };
    }
}
module.exports = FileFieldEditor;
