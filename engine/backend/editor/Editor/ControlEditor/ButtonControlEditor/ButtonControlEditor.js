'use strict';

module.exports = ButtonControlEditor;

var util = require('util');

var ControlEditor = require('../ControlEditor');

util.inherits(ButtonControlEditor, ControlEditor);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ButtonControlEditor(formEditor, name) {
    ButtonControlEditor.super_.call(this, formEditor, name);
};

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
ButtonControlEditor.createData = function(params) {
    return {
        "@class":"CheckBoxField",
        "@attributes": {
            'name' : params['name'],
            'caption' : params['caption'] ? params['caption'] : params['name'],
            'isVisible': params['isVisible'] ? params['isVisible'] : 'true',
            'width' : params['width'] ? params['width'] : '0',
            'defaultValue':params['defaultValue'] ? params['defaultValue'] : '',
            'column' : params['column'] ? params['column'] : params['name'],
            'readOnly':params['readOnly'] ? params['readOnly'] : 'false',
            'notNull':params['notNull'] ? params['notNull'] : 'false'
        }
    };
};
    */