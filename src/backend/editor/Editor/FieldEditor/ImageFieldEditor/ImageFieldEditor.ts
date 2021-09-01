const FieldEditor = require('../FieldEditor');

class ImageFieldEditor extends FieldEditor {

    static createData(params) {
        return {
            '@class':'ImageField',
            '@attributes': {
                ...FieldEditor.createData(params),
                readOnly    : params.readOnly     ? params.readOnly     :        'false',
                notNull     : params.notNull      ? params.notNull      :        'false',
            }
        };
    }

}

export = ImageFieldEditor;
