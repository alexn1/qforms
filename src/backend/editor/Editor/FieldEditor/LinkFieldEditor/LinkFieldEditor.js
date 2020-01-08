'use strict';

module.exports = LinkFieldEditor;

var util = require('util');
var path = require('path');

var server      = require('../../../../../server');
var FieldEditor = require('../FieldEditor');

util.inherits(LinkFieldEditor, FieldEditor);

////////////////////////////////////////////////////////////////////////////////////////////////////
function LinkFieldEditor(formEditor, name) {
    var self = this;
    LinkFieldEditor.super_.call(self, formEditor, name);
    self.defaultViewDirPath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FieldController/LinkFieldController/view'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
LinkFieldEditor.createData = function(params) {
    return {
        '@class' : 'LinkField',
        '@attributes': {
            'name':params['name'],
            'caption'     : params['caption']      ? params['caption']      : params['name'],
            'isVisible'   : params['isVisible']    ? params['isVisible']    :         'true',
            'width'       : params['width']        ? params['width']        :            '0',
            'defaultValue': params['defaultValue'] ? params['defaultValue'] :             '',
            'column'      : params['column']       ? params['column']       : params['name'],
            'readOnly'    : params['readOnly']     ? params['readOnly']     :        'true',
            'notNull'     : params['notNull']      ? params['notNull']      :        'false'
        }
    };
};