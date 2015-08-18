'use strict';

module.exports = ButtonControlEditor;

var util = require('util');


var ControlEditor = require('../ControlEditor');

util.inherits(ButtonControlEditor, ControlEditor);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ButtonControlEditor(formEditor, name) {
    ButtonControlEditor.super_.call(this, formEditor, name);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ButtonControlEditor.createData = function(params) {
    return {
        '@class':'ButtonControl',
        '@attributes': {
            name:params.name,
            caption : (params.caption) && params.caption ? params.caption : params.name,
            isVisible:'true',
            width:'0'
        }
    };
};
