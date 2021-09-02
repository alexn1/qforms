const Editor = require('../Editor');

class ParamEditor extends Editor {
    static createData(params) {
        if (!params.name) throw new Error('no name');
        return {
            '@class'     : 'Param',
            '@attributes': {
                name : params.name,
                value: params.value || ''
            }
        };
    }
    getColName() {
        return 'params';
    }
}

export = ParamEditor;
