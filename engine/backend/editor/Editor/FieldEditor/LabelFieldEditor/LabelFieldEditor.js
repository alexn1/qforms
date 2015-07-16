'use strict';

module.exports = LabelFieldEditor;

var util = require('util');
var path = require('path');

var qforms = require('../../../../qforms');
var FieldEditor = require('../FieldEditor');

util.inherits(LabelFieldEditor, FieldEditor);

////////////////////////////////////////////////////////////////////////////////////////////////////
function LabelFieldEditor(formEditor, name) {
    LabelFieldEditor.super_.call(this, formEditor, name);
    this.defaultViewDirPath = path.join(
        qforms.get('public'),
        'viewer/class/Controller/ModelController/FieldController/LabelFieldController/view'
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
LabelFieldEditor.createData = function(params) {
    return {
        '@class':'LabelField',
        '@attributes': {
            'name' : params['name'],
            'caption' : params['caption'] ? params['caption'] : params['name'],
            'isVisible':params['isVisible'] ? params['isVisible'] : 'true',
            'width':params['width'] ? params['width'] : '0',
            'defaultValue':params['defaultValue'] ? params['defaultValue'] : '',
            'column' :params['column'] ? params['column'] : params['name'],
            'align':params['align'] ? params['align'] : 'left'
        }
    };
};