const FieldEditor = require('../FieldEditor');

class DateTimeFieldEditor extends FieldEditor {
    static createData(params) {
        return {
            '@class'     : 'DateTimeField',
            '@attributes': {
                name            : params.name,
                caption         : params.caption       ? params.caption      :                    params.name,
                column          : params.column        ? params.column       :                    params.name,
                value           : params.value         ? params.value        :                                '',
                defaultValue    : params.defaultValue  ? params.defaultValue :                                '',
                param           : params.param         ? params.param        :                           'false',
                isVisible       : params.isVisible     ? params.isVisible    :                            'true',
                type            : params.type          ? params.type         :                                '',
                width           : params.width         ? params.width        :                               '0',

                format          : params.format           ? params.format          : '{DD}.{MM}.{YYYY} {hh}:{mm}:{ss}',
                readOnly        : params.readOnly         ? params.readOnly     :                           'false',
                notNull         : params.notNull          ? params.notNull      :                           'false',
                placeholder     : params.placeholder      ? params.placeholder     :                                '',
                validateOnChange: params.validateOnChange ? params.validateOnChange:                            'true',
                validateOnBlur  : params.validateOnBlur   ? params.validateOnBlur  :                           'false',
            }
        };
    }
}

module.exports = DateTimeFieldEditor;
