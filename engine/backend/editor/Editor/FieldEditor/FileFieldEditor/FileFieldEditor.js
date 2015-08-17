'use strict';

module.exports = FileFieldEditor;

var util = require('util');
var path = require('path');

var QForms = require('../../../../QForms');
var server      = require('../../../../server');

var FieldEditor = require('../FieldEditor');

util.inherits(FileFieldEditor, FieldEditor);

////////////////////////////////////////////////////////////////////////////////////////////////////
function FileFieldEditor(formEditor, name) {
    FileFieldEditor.super_.call(this, formEditor, name);
    this.defaultViewDirPath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FieldController/FileFieldController/view'
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FileFieldEditor.createData = function(params) {
    return {
        '@class': 'FileField',
        '@attributes': {
            name          : params['name'],
            caption       : params['caption']      ? params['caption']      : params['name'],
            isVisible     : params['isVisible']    ? params['isVisible']    : 'true',
            width         : params['width']        ? params['width']        : '0',
            defaultValue  : params['defaultValue'] ? params['defaultValue'] : '',
            column        : params['column']       ? params['column']       : params['name'],
            readOnly      : params['readOnly']     ? params['readOnly']     : 'false',
            notNull       : params['notNull']      ? params['notNull']      : 'false',
            align         : params['align']        ? params['align']        : 'left'
        }
    };
};