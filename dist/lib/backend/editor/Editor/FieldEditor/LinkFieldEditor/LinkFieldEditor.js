"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkFieldEditor = void 0;
const FieldEditor_1 = require("../FieldEditor");
class LinkFieldEditor extends FieldEditor_1.FieldEditor {
    static createData(params) {
        return {
            '@class': 'LinkField',
            '@attributes': Object.assign(Object.assign({}, FieldEditor_1.FieldEditor.createAttributes(params)), { notNull: params.notNull ? params.notNull : 'false', page: params.page ? params.page : '', displayColumn: params.displayColumn ? params.displayColumn : '' }),
        };
    }
}
exports.LinkFieldEditor = LinkFieldEditor;
