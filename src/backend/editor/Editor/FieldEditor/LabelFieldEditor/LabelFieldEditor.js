const FieldEditor = require('../FieldEditor');

class LabelFieldEditor extends FieldEditor {

    static createData(params) {
        return {
            '@class'     : 'LabelField',
            '@attributes': {
                ...FieldEditor.createAttributes(params),
            }
        };
    }

}

module.exports = LabelFieldEditor;
