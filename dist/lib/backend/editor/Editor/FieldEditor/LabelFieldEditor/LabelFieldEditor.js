"use strict";
const FieldEditor_1 = require("../FieldEditor");
class LabelFieldEditor extends FieldEditor_1.FieldEditor {
    static createData(params) {
        return {
            '@class': 'LabelField',
            '@attributes': Object.assign({}, FieldEditor_1.FieldEditor.createAttributes(params))
        };
    }
}
module.exports = LabelFieldEditor;
