const FieldEditor = require('../FieldEditor');

class DatePickerFieldEditor extends FieldEditor {

    static createData(params) {
        return {
            '@class'     : 'DatePickerField',
            '@attributes': {
                ...FieldEditor.createAttributes(params),
                readOnly    : params.readOnly     ? params.readOnly     :                           'false',
                notNull     : params.notNull      ? params.notNull      :                           'false',
                format      : params.format          ? params.format          : '{DD}.{MM}.{YYYY} {hh}:{mm}:{ss}',
                placeholder : params.placeholder     ? params.placeholder     :                                '',
                validateOnChange: params.validateOnChange ? params.validateOnChange :         'true',
                validateOnBlur  : params.validateOnBlur   ? params.validateOnBlur   :        'false',
            }
        };
    }

}

module.exports = DatePickerFieldEditor;
