// const path        = require('path');
const FieldEditor = require('../FieldEditor');

class DatePickerFieldEditor extends FieldEditor {

    /*constructor(...args) {
        super(...args);
        this.defaultViewDirPath = path.join(
            this.getAppEditor().hostApp.publicDirPath,
            'viewer/class/Controller/ModelController/FieldController/DatePickerFieldController/view'
        );
    }*/

    static createData(params) {
        return {
            '@class'     : 'DatePickerField',
            '@attributes': {
                name        : params['name'],
                caption     : params['caption']      ? params['caption']      :                    params['name'],
                isVisible   : params['isVisible']    ? params['isVisible']    :                            'true',
                defaultValue: params['defaultValue'] ? params['defaultValue'] :                                '',
                column      : params['column']       ? params['column']       :                    params['name'],
                type        : params['type']         ? params['type']         :                                '',
                format      : params.format          ? params.format          : '{DD}.{MM}.{YYYY} {hh}:{mm}:{ss}',
                readOnly    : params['readOnly']     ? params['readOnly']     :                           'false',
                notNull     : params['notNull']      ? params['notNull']      :                           'false',
                param       : params.param           ? params.param           :                           'false',
                placeholder : params.placeholder     ? params.placeholder     :                                '',
                validateOnChange: params.validateOnChange ? params.validateOnChange :         'true',
                validateOnBlur  : params.validateOnBlur   ? params.validateOnBlur   :        'false',
            }
        };
    }

}

module.exports = DatePickerFieldEditor;
