const FieldEditor = require('../FieldEditor');

class LinkFieldEditor extends FieldEditor {

    static createData(params) {
        return {
            '@class' : 'LinkField',
            '@attributes': {
                ...Field.createAttributes(params),
                notNull     : params.notNull      ? params.notNull      :        'false',
            }
        };
    }

}

module.exports = LinkFieldEditor;
