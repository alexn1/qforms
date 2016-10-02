'use strict';

module.exports = ButtonControlEditor;

var util = require('util');

var ControlEditor = require('../ControlEditor');

util.inherits(ButtonControlEditor, ControlEditor);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ButtonControlEditor(formEditor, name) {
    var self = this;
    ButtonControlEditor.super_.call(self, formEditor, name);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ButtonControlEditor.createData = function(params) {
    return {
        '@class'     :'ButtonControl',
        '@attributes': {
            name     : params.name,
            caption  : (params.caption) && params.caption ? params.caption : params.name,
            isVisible: 'true',
            width    : '0'
        }
    };
};