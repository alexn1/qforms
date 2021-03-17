const FieldEditor = require('../FieldEditor');

class TextAreaFieldEditor extends FieldEditor {

    static createData(params) {
        return {
            '@class'     : 'TextAreaField',
            '@attributes': {
                name        : params['name'],
                caption     : params['caption']      ? params['caption']      : params['name'],
                column      : params['column']       ? params['column']       : params['name'],
                defaultValue: params['defaultValue'] ? params['defaultValue'] :             '',
                isVisible   : params['isVisible']    ? params['isVisible']    :         'true',
                type        : params['type']         ? params['type']         :             '',
                readOnly    : params['readOnly']     ? params['readOnly']     :        'false',
                notNull     : params['notNull']      ? params['notNull']      :        'false',
                rows        : params['rows']         ? params['rows']         :             '',
                cols        : params['cols']         ? params['cols']         :             '',
                param       : params.param           ? params.param           :        'false',
                validateOnChange: params.validateOnChange ? params.validateOnChange :         'true',
                validateOnBlur  : params.validateOnBlur   ? params.validateOnBlur   :        'false',
            }
        };
    }

}

module.exports = TextAreaFieldEditor;
