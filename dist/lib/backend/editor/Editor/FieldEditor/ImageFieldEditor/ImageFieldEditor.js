"use strict";
const FieldEditor = require('../FieldEditor');
class ImageFieldEditor extends FieldEditor {
    static createData(params) {
        return {
            '@class': 'ImageField',
            '@attributes': Object.assign(Object.assign({}, FieldEditor.createData(params)), { readOnly: params.readOnly ? params.readOnly : 'false', notNull: params.notNull ? params.notNull : 'false' })
        };
    }
}
module.exports = ImageFieldEditor;
