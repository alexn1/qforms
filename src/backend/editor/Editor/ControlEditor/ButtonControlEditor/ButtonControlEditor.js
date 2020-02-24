'use strict';

var util = require('util');

var ControlEditor = require('../ControlEditor');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class ButtonControlEditor extends ControlEditor {

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor(formEditor, name) {
        super(formEditor, name);
        var self = this;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
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