// const path = require('path');
const FieldEditor = require('../FieldEditor');

class LabelFieldEditor extends FieldEditor {

    /*constructor(...args) {
        super(...args);
        this.defaultViewDirPath = path.join(
            this.getAppEditor().hostApp.publicDirPath,
            'viewer/class/Controller/ModelController/FieldController/LabelFieldController/view'
        );
    }*/

    static createData(params) {
        return {
            '@class'     : 'LabelField',
            '@attributes': {
                name        : params['name'],
                caption     : params['caption']      ? params['caption']      : params['name'],
                isVisible   : params['isVisible']    ? params['isVisible']    :         'true',
                defaultValue: params['defaultValue'] ? params['defaultValue'] :             '',
                column      : params['column']       ? params['column']       : params['name'],
                type        : params['type']         ? params['type']         :             '',
                param       : params.param           ? params.param           :        'false',
            }
        };
    }

}

module.exports = LabelFieldEditor;
