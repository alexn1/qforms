const FieldEditor = require('../FieldEditor');

class FileFieldEditor extends FieldEditor {

    static createData(params) {
        return {
            '@class'     : 'FileField',
            '@attributes': {
                ...FieldEditor.createData(params),
                readOnly    : params.readOnly     ? params.readOnly     :        'false',
                notNull     : params.notNull      ? params.notNull      :        'false',
            }
        };
    }

}

export = FileFieldEditor;
