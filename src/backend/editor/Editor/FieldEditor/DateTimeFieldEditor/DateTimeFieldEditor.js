const FieldEditor = require('../FieldEditor');

class DateTimeFieldEditor extends FieldEditor {
    static createData(params) {
        return {
            '@class'     : 'DateTimeField',
            '@attributes': {
                name        : params['name'],
                caption     : params['caption']      ? params['caption']      :                    params['name'],
                isVisible   : params['isVisible']    ? params['isVisible']    :                            'true',
                // width       : params['width']        ? params['width']        :                               '0',
                defaultValue: params['defaultValue'] ? params['defaultValue'] :                                '',
                column      : params['column']       ? params['column']       :                    params['name'],
                type        : params['type']         ? params['type']         :                                '',
                format      : params.format          ? params.format          : '{DD}.{MM}.{YYYY} {hh}:{mm}:{ss}',
                readOnly    : params['readOnly']     ? params['readOnly']     :                           'false',
                notNull     : params['notNull']      ? params['notNull']      :                           'false',
                // align       : params['align']        ? params['align']        :                            'left',
                param       : params.param           ? params.param           :                           'false',
                placeholder : params.placeholder     ? params.placeholder     :                                '',
                validateOnChange: params.validateOnChange ? params.validateOnChange :         'true',
                validateOnBlur  : params.validateOnBlur   ? params.validateOnBlur   :        'false',
            }
        };
    }
}

module.exports = DateTimeFieldEditor;
