'use strict';

var util = require('util');
var path = require('path');

var server      = require('../../../../../server');
var FieldEditor = require('../FieldEditor');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class LabelFieldEditor extends FieldEditor {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor(formEditor, name) {
        super(formEditor, name);
        var self = this;
        self.defaultViewDirPath = path.join(
            server.get('public'),
            'viewer/class/Controller/ModelController/FieldController/LabelFieldController/view'
        );
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static createData(params) {
        return {
            '@class'     : 'LabelField',
            '@attributes': {
                'name'        : params['name'],
                'caption'     : params['caption']      ? params['caption']      : params['name'],
                'isVisible'   : params['isVisible']    ? params['isVisible']    :         'true',
                'width'       : params['width']        ? params['width']        :            '0',
                'defaultValue': params['defaultValue'] ? params['defaultValue'] :             '',
                'column'      : params['column']       ? params['column']       : params['name'],
                'align'       : params['align']        ? params['align']        :         'left'
            }
        };
    }

}

module.exports = LabelFieldEditor;