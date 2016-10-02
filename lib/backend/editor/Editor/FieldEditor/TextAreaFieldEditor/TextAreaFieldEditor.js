'use strict';

module.exports = TextAreaFieldEditor;

var util = require('util');
var path = require('path');

var server      = require('../../../../../server');
var FieldEditor = require('../FieldEditor');

util.inherits(TextAreaFieldEditor, FieldEditor);

////////////////////////////////////////////////////////////////////////////////////////////////////
function TextAreaFieldEditor(formEditor, name) {
    var self = this;
    TextAreaFieldEditor.super_.call(self, formEditor, name);
    self.defaultViewDirPath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FieldController/TextAreaFieldController/view'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
TextAreaFieldEditor.createData = function(params) {
    return {
        '@class':'TextAreaField',
        '@attributes' : {
            'name'        : params['name'],
            'caption'     : params['caption']      ? params['caption']      : params['name'],
            'isVisible'   : params['isVisible']    ? params['isVisible']    :         'true',
            'width'       : params['width']        ? params['width']        :            '0',
            'defaultValue': params['defaultValue'] ? params['defaultValue'] :             '',
            'column'      : params['column']       ? params['column']       : params['name'],
            'readOnly'    : params['readOnly']     ? params['readOnly']     :        'false',
            'notNull'     : params['notNull']      ? params['notNull']      :        'false',
            'align'       : params['align']        ? params['align']        :         'left',
            'rows'        : params['rows']         ? params['rows']         :             '',
            'cols'        : params['cols']         ? params['cols']         :             ''
        }
    };
};