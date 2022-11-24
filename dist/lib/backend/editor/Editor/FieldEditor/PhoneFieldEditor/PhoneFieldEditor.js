"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneFieldEditor = void 0;
const FieldEditor_1 = require("../FieldEditor");
class PhoneFieldEditor extends FieldEditor_1.FieldEditor {
    static createData(params) {
        return {
            '@class': 'PhoneField',
            '@attributes': Object.assign(Object.assign({}, FieldEditor_1.FieldEditor.createAttributes(params)), { readOnly: params.readOnly ? params.readOnly : 'false', notNull: params.notNull ? params.notNull : 'false', placeholder: params.placeholder ? params.placeholder : '', validateOnChange: params.validateOnChange ? params.validateOnChange : 'true', validateOnBlur: params.validateOnBlur ? params.validateOnBlur : 'false', autocomplete: params.autocomplete ? params.autocomplete : '' })
        };
    }
}
exports.PhoneFieldEditor = PhoneFieldEditor;
