const FieldEditor = require('../FieldEditor');

class DatePickerFieldEditor extends FieldEditor {

    static createData(params) {
        return {
            '@class'     : 'DatePickerField',
            '@attributes': {
                ...FieldEditor.createAttributes(params),
                format      : params.format          ? params.format          : '{DD}.{MM}.{YYYY} {hh}:{mm}:{ss}',
                readOnly    : params.readOnly     ? params.readOnly     :                           'false',
                notNull     : params.notNull      ? params.notNull      :                           'false',
                placeholder : params.placeholder     ? params.placeholder     :                                '',
                validateOnChange: params.validateOnChange ? params.validateOnChange :         'true',
                validateOnBlur  : params.validateOnBlur   ? params.validateOnBlur   :        'false',
            }
        };
    }

}

module.exports = DatePickerFieldEditor;
