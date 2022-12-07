"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageFieldEditor = void 0;
const FieldEditor_1 = require("../FieldEditor");
class ImageFieldEditor extends FieldEditor_1.FieldEditor {
    static createData(params) {
        return {
            '@class': 'ImageField',
            '@attributes': Object.assign(Object.assign({}, FieldEditor_1.FieldEditor.createAttributes(params)), { readOnly: params.readOnly ? params.readOnly : 'false', notNull: params.notNull ? params.notNull : 'false' }),
        };
    }
}
exports.ImageFieldEditor = ImageFieldEditor;
