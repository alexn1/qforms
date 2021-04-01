const FieldEditor = require('../FieldEditor');

class TextAreaFieldEditor extends FieldEditor {

    static createData(params) {
        return {
            '@class'     : 'TextAreaField',
            '@attributes': {
                name        : params.name,
                caption     : params.caption      ? params.caption      : params.name,
                column      : params.column       ? params.column       : params.name,
                value       : params.value        ? params.value        :             '',
                defaultValue: params.defaultValue ? params.defaultValue :             '',
                param       : params.param           ? params.param           :        'false',
                isVisible   : params.isVisible    ? params.isVisible    :         'true',
                type        : params.type         ? params.type         :             '',
                width           : params.width         ? params.width        :                               '0',

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
