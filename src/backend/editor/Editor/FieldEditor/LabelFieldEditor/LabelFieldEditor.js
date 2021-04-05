const FieldEditor = require('../FieldEditor');

class LabelFieldEditor extends FieldEditor {

    static createData(params) {
        return {
            '@class'     : 'LabelField',
            '@attributes': {
                ...Field.createAttributes(params),
            }
        };
    }

}

module.exports = LabelFieldEditor;
