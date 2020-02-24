'use strict';

var util = require('util');
var path = require('path');

var server      = require('../../../../../server');
var FieldEditor = require('../FieldEditor');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class ImageFieldEditor extends FieldEditor {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor(formEditor, name) {
        super(formEditor, name);
        var self = this;
        //LabelFieldEditor.super_.call(this, formEditor, name);
        self.defaultViewDirPath = path.join(
            server.get('public'),
            'viewer/class/Controller/ModelController/FieldController/ImageFieldController/view'
        );
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static createData(params) {
        return {
            '@class':'ImageField',
            '@attributes': {
                'name'        : params['name'],
                'caption'     : params['caption']      ? params['caption']      : params['name'],
                'isVisible'   : params['isVisible']    ? params['isVisible']    :         'true',
                'width'       : params['width']        ? params['width']        :            '0',
                'defaultValue': params['defaultValue'] ? params['defaultValue'] :             '',
                'column'      : params['column']       ? params['column']       : params['name'],
                'readOnly'    : params['readOnly']     ? params['readOnly']     :        'true',
                'notNull'     : params['notNull']      ? params['notNull']      :        'false'
            }
        };
    }

}

module.exports = ImageFieldEditor;