"use strict";
const Editor = require('../Editor');
const backend = require('../../../../backend');
class ActionEditor extends Editor {
    static createData(params) {
        if (!params.name)
            throw new Error('no name');
        return {
            '@class': 'Action',
            '@attributes': {
                name: params.name,
                caption: params.caption || params.name
            }
        };
    }
    getColName() {
        return 'actions';
    }
}
module.exports = ActionEditor;
