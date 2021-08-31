const FieldEditor = require('../FieldEditor');

class LinkFieldEditor extends FieldEditor {

    static createData(params) {
        return {
            '@class' : 'LinkField',
            '@attributes': {
                ...FieldEditor.createAttributes(params),
                notNull     : params.notNull      ? params.notNull      :        'false',
            }
        };
    }

}

export = LinkFieldEditor;
