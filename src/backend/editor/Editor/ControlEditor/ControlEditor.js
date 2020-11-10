const Editor = require('../Editor');

class ControlEditor extends Editor {

    constructor(formEditor, name, data) {
        super(data, formEditor);
        this.name       = name;
        this.colName = 'controls';
    }

}

module.exports = ControlEditor;