const FieldEditor = require('../FieldEditor');

class TextAreaFieldEditor extends FieldEditor {

    static createData(params) {
        return {
            '@class'     : 'TextAreaField',
            '@attributes': {
                ...FieldEditor.createAttributes(params),
                readOnly    : params.readOnly     ? params.readOnly     :        'false',
                notNull     : params.notNull      ? params.notNull      :        'false',
                rows        : params.rows         ? params.rows         :             '',
                cols        : params.cols         ? params.cols         :             '',
                validateOnChange: params.validateOnChange ? params.validateOnChange :         'true',
                validateOnBlur  : params.validateOnBlur   ? params.validateOnBlur   :        'false',
            }
        };
    }

}

module.exports = TextAreaFieldEditor;
