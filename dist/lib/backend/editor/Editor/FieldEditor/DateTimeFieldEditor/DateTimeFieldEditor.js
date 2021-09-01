"use strict";
const FieldEditor = require('../FieldEditor');
class DateTimeFieldEditor extends FieldEditor {
    static createData(params) {
        return {
            '@class': 'DateTimeField',
            '@attributes': Object.assign(Object.assign({}, FieldEditor.createData(params)), { readOnly: params.readOnly ? params.readOnly : 'false', notNull: params.notNull ? params.notNull : 'false', format: params.format ? params.format : '{DD}.{MM}.{YYYY} {hh}:{mm}:{ss}', timezone: params.timezone ? params.timezone : 'true', placeholder: params.placeholder ? params.placeholder : '', validateOnChange: params.validateOnChange ? params.validateOnChange : 'true', validateOnBlur: params.validateOnBlur ? params.validateOnBlur : 'false' })
        };
    }
}
module.exports = DateTimeFieldEditor;
