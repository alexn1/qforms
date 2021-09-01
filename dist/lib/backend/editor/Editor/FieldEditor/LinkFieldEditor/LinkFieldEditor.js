"use strict";
const FieldEditor = require('../FieldEditor');
class LinkFieldEditor extends FieldEditor {
    static createData(params) {
        return {
            '@class': 'LinkField',
            '@attributes': Object.assign(Object.assign({}, FieldEditor.createAttributes(params)), { notNull: params.notNull ? params.notNull : 'false' })
        };
    }
}
module.exports = LinkFieldEditor;
