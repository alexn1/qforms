'use strict';

module.exports = DatePickerFieldEditor;

var util = require('util');

var FieldEditor = require('../FieldEditor');
var path = require('path');

var qforms = require('../../../../qforms');
util.inherits(DatePickerFieldEditor, FieldEditor);

////////////////////////////////////////////////////////////////////////////////////////////////////
function DatePickerFieldEditor(formEditor, name) {
    DatePickerFieldEditor.super_.call(this, formEditor, name);
    this.defaultViewDirPath = path.join(
        qforms.get('public'),
        'viewer/class/Controller/ModelController/FieldController/DatePickerFieldController/view'
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatePickerFieldEditor.createData = function(params) {
    return {
        '@class':'DatePickerField',
        '@attributes': {
            'name' : params['name'],
            'caption' : params['caption'] ? params['caption'] : params['name'],
            'isVisible':params['isVisible'] ? params['isVisible'] : 'true',
            'width':params['width'] ? params['width'] : '0',
            'defaultValue':params['defaultValue'] ? params['defaultValue'] : '',
            'column' :params['column'] ? params['column'] : params['name'],
            'readOnly':params['readOnly'] ? params['readOnly'] : 'false',
            'notNull':params['notNull'] ? params['notNull'] : 'false',
            'align':params['align'] ? params['align'] : 'left'
        }
    };
};