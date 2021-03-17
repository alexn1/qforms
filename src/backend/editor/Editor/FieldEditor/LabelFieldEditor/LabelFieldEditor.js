const FieldEditor = require('../FieldEditor');

class LabelFieldEditor extends FieldEditor {

    static createData(params) {
        return {
            '@class'     : 'LabelField',
            '@attributes': {
                name        : params.name,
                caption     : params.caption      ? params.caption      : params.name,
                column      : params.column       ? params.column       : params.name,
                defaultValue: params.defaultValue ? params.defaultValue :             '',
                isVisible   : params.isVisible    ? params.isVisible    :         'true',
                type        : params.type         ? params.type         :             '',
                param       : params.param           ? params.param           :        'false',
            }
        };
    }

}

module.exports = LabelFieldEditor;
