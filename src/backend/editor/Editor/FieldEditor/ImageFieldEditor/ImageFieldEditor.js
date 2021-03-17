const FieldEditor = require('../FieldEditor');

class ImageFieldEditor extends FieldEditor {

    static createData(params) {
        return {
            '@class':'ImageField',
            '@attributes': {
                name        : params.name,
                caption     : params.caption      ? params.caption      : params.name,
                column      : params.column       ? params.column       : params.name,
                value       : params.value        ? params.value        :             '',
                defaultValue: params.defaultValue ? params.defaultValue :             '',
                param       : params.param        ? params.param        :        'false',
                isVisible   : params.isVisible    ? params.isVisible    :         'true',
                type        : params.type         ? params.type         :             '',

                readOnly    : params.readOnly     ? params.readOnly     :        'false',
                notNull     : params.notNull      ? params.notNull      :        'false',
            }
        };
    }

}

module.exports = ImageFieldEditor;
