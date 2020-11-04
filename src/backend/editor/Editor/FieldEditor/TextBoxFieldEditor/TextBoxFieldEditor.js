'use strict';

const path = require('path');

const FieldEditor = require('../FieldEditor');

class TextBoxFieldEditor extends FieldEditor {

    constructor(...args) {
        super(...args);
        this.defaultViewDirPath = path.join(
            this.getAppEditor().hostApp.publicDirPath,
            'viewer/class/Controller/ModelController/FieldController/TextBoxFieldController/view'
        );
    }

    static createData(params) {
        return {
            '@class'     : 'TextBoxField',
            '@attributes': {
                name          : params['name'],
                caption       : params['caption']      ? params['caption']      : params['name'],
                isVisible     : params['isVisible']    ? params['isVisible']    :         'true',
                width         : params['width']        ? params['width']        :            '0',
                defaultValue  : params['defaultValue'] ? params['defaultValue'] :             '',
                value         : params['value']        ? params['value']        :             '',
                column        : params['column']       ? params['column']       : params['name'],
                type          : params['type']         ? params['type']         :             '',
                readOnly      : params['readOnly']     ? params['readOnly']     :        'false',
                notNull       : params['notNull']      ? params['notNull']      :        'false',
                align         : params['align']        ? params['align']        :         'left',
                param         : params.param           ? params.param           :        'false',
                placeholder   : params.placeholder     ? params.placeholder     :             '',
            }
        };
    }

}

module.exports = TextBoxFieldEditor;
