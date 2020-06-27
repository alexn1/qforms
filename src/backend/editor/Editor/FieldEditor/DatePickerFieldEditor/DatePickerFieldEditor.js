'use strict';

const path = require('path');
const FieldEditor = require('../FieldEditor');

class DatePickerFieldEditor extends FieldEditor {

    constructor(...args) {
        super(...args);
        this.defaultViewDirPath = path.join(
            this.getAppEditor().hostApp.publicDirPath,
            'viewer/class/Controller/ModelController/FieldController/DatePickerFieldController/view'
        );
    }

    static createData(params) {
        return {
            '@class'     : 'DatePickerField',
            '@attributes': {
                name        : params['name'],
                caption     : params['caption']      ? params['caption']      : params['name'],
                isVisible   : params['isVisible']    ? params['isVisible']    :         'true',
                width       : params['width']        ? params['width']        :            '0',
                defaultValue: params['defaultValue'] ? params['defaultValue'] :             '',
                column      : params['column']       ? params['column']       : params['name'],
                readOnly    : params['readOnly']     ? params['readOnly']     :        'true',
                notNull     : params['notNull']      ? params['notNull']      :        'false',
                align       : params['align']        ? params['align']        :         'left'
            }
        };
    }

}

module.exports = DatePickerFieldEditor;
