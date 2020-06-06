'use strict';

const ControlEditor = require('../ControlEditor');

class ButtonControlEditor extends ControlEditor {

    static createData(params) {
        return {
            '@class'     :'ButtonControl',
            '@attributes': {
                name     : params.name,
                caption  : (params.caption) && params.caption ? params.caption : params.name,
                isVisible: 'true',
                width    : '0'
            }
        };
    }

}

module.exports = ButtonControlEditor;
