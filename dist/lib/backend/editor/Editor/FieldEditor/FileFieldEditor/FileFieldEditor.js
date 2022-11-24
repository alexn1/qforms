"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileFieldEditor = void 0;
const FieldEditor_1 = require("../FieldEditor");
class FileFieldEditor extends FieldEditor_1.FieldEditor {
    static createData(params) {
        return {
            '@class': 'FileField',
            '@attributes': Object.assign(Object.assign({}, FieldEditor_1.FieldEditor.createAttributes(params)), { readOnly: params.readOnly ? params.readOnly : 'false', notNull: params.notNull ? params.notNull : 'false' })
        };
    }
}
exports.FileFieldEditor = FileFieldEditor;
