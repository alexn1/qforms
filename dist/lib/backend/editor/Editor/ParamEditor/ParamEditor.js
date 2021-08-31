"use strict";
const Editor = require('../Editor');
class ParamEditor extends Editor {
    static createData(params) {
        const name = params.name;
        const value = params.value || '';
        if (!name)
            throw new Error('need param name');
        return {
            '@class': 'Param',
            '@attributes': {
                name: name,
                value: value
            }
        };
    }
}
module.exports = ParamEditor;
