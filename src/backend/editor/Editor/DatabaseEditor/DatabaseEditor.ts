const Editor = require('../Editor');

class DatabaseEditor extends Editor {
    static createData(params) {
        throw new Error('DatabaseEditor.createData not implemented');
    }
}

export = DatabaseEditor;
