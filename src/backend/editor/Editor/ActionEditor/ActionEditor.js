const Editor = require('../Editor');

class ActionEditor extends Editor {

    static createData(params) {
        if (!params.name) throw new Error('no name');
        return {
            '@class'     : 'Action',
            '@attributes': {
                name    : params.name,
                caption : params.caption || params.name
            }
        };
    }
}

module.exports = ActionEditor;