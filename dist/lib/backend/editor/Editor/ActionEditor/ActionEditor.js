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
    reformat() {
        const editor = backend[`${this.getClassName()}Editor`];
        const newData = editor.createData(this.attributes());
        this.setData('actions', newData);
        return newData;
    }
}
module.exports = ActionEditor;
