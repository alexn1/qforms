const FieldEditor = require('../FieldEditor');

class LabelFieldEditor extends FieldEditor {

    static createData(params) {
        return {
            '@class'     : 'LabelField',
            '@attributes': {
                name        : params.name,
                caption     : params.caption      ? params.caption      : params.name,
                column      : params.column       ? params.column       : params.name,
                value       : params.value        ? params.value        :             '',
                defaultValue: params.defaultValue ? params.defaultValue :             '',
                param       : params.param           ? params.param           :        'false',
                isVisible   : params.isVisible    ? params.isVisible    :         'true',
                type        : params.type         ? params.type         :             '',
            }
        };
    }

}

module.exports = LabelFieldEditor;
