"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeFieldEditor = void 0;
const FieldEditor_1 = require("../FieldEditor");
class DateTimeFieldEditor extends FieldEditor_1.FieldEditor {
    static createData(params) {
        return {
            '@class': 'DateTimeField',
            '@attributes': Object.assign(Object.assign({}, FieldEditor_1.FieldEditor.createAttributes(params)), { readOnly: params.readOnly ? params.readOnly : 'false', notNull: params.notNull ? params.notNull : 'false', format: params.format ? params.format : '{DD}.{MM}.{YYYY}', timezone: params.timezone ? params.timezone : 'true', placeholder: params.placeholder ? params.placeholder : '', validateOnChange: params.validateOnChange ? params.validateOnChange : 'true', validateOnBlur: params.validateOnBlur ? params.validateOnBlur : 'false' }),
        };
    }
}
exports.DateTimeFieldEditor = DateTimeFieldEditor;