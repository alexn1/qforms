"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadioFieldEditor = void 0;
const FieldEditor_1 = require("../FieldEditor");
class RadioFieldEditor extends FieldEditor_1.FieldEditor {
    static createData(params) {
        return {
            '@class': 'RadioField',
            '@attributes': Object.assign(Object.assign({}, FieldEditor_1.FieldEditor.createAttributes(params)), { readOnly: params.readOnly ? params.readOnly : 'false', notNull: params.notNull ? params.notNull : 'false', 
                // placeholder   : params.placeholder    ? params.placeholder    :             '',
                dataSourceName: params.dataSourceName ? params.dataSourceName : '', valueColumn: params.valueColumn ? params.valueColumn : '', displayColumn: params.displayColumn ? params.displayColumn : '' })
        };
    }
}
exports.RadioFieldEditor = RadioFieldEditor;
