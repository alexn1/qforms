const FieldEditor = require('../FieldEditor');

class ImageFieldEditor extends FieldEditor {

    static createData(params) {
        return {
            '@class':'ImageField',
            '@attributes': {
                ...FieldEditor.createAttributes(params),
                readOnly    : params.readOnly     ? params.readOnly     :        'false',
                notNull     : params.notNull      ? params.notNull      :        'false',
            }
        };
    }

}

module.exports = ImageFieldEditor;
