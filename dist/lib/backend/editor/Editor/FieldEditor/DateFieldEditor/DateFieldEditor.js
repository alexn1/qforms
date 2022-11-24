"use strict";
const FieldEditor_1 = require("../FieldEditor");
class DateFieldEditor extends FieldEditor_1.FieldEditor {
    static createData(params) {
        return {
            '@class': 'DateField',
            '@attributes': Object.assign(Object.assign({}, FieldEditor_1.FieldEditor.createAttributes(params)), { readOnly: params.readOnly ? params.readOnly : 'false', notNull: params.notNull ? params.notNull : 'false', format: params.format ? params.format : '{DD}.{MM}.{YYYY} {hh}:{mm}:{ss}', timezone: params.timezone ? params.timezone : 'true', placeholder: params.placeholder ? params.placeholder : '', validateOnChange: params.validateOnChange ? params.validateOnChange : 'true', validateOnBlur: params.validateOnBlur ? params.validateOnBlur : 'false' })
        };
    }
}
module.exports = DateFieldEditor;
