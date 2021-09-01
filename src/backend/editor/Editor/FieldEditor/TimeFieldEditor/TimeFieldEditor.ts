const FieldEditor = require('../FieldEditor');

class TimeFieldEditor extends FieldEditor {
    static createData(params) {
        return {
            '@class'     : 'TimeField',
            '@attributes': {
                ...FieldEditor.createData(params),
                readOnly    : params.readOnly     ? params.readOnly     :                           'false',
                notNull     : params.notNull      ? params.notNull      :                           'false',
                placeholder : params.placeholder     ? params.placeholder     :                                '',
                validateOnChange: params.validateOnChange ? params.validateOnChange :         'true',
                validateOnBlur  : params.validateOnBlur   ? params.validateOnBlur   :        'false',
            }
        };
    }
}

export = TimeFieldEditor;
