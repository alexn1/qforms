"use strict";
const FieldEditor = require('../FieldEditor');
class LabelFieldEditor extends FieldEditor {
    static createData(params) {
        return {
            '@class': 'LabelField',
            '@attributes': Object.assign({}, FieldEditor.createData(params))
        };
    }
}
module.exports = LabelFieldEditor;
