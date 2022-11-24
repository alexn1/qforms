"use strict";
const FieldEditor_1 = require("../FieldEditor");
class LinkFieldEditor extends FieldEditor_1.FieldEditor {
    static createData(params) {
        return {
            '@class': 'LinkField',
            '@attributes': Object.assign(Object.assign({}, FieldEditor_1.FieldEditor.createAttributes(params)), { notNull: params.notNull ? params.notNull : 'false' })
        };
    }
}
module.exports = LinkFieldEditor;
