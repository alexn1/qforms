'use strict';

module.exports = ComboBoxFieldEditor;

var util = require('util');
var path = require('path');

var server      = require('../../../../../server');
var FieldEditor = require('../FieldEditor');

util.inherits(ComboBoxFieldEditor, FieldEditor);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ComboBoxFieldEditor(formEditor, name) {
    var self = this;
    ComboBoxFieldEditor.super_.call(self, formEditor, name);
    self.defaultViewDirPath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FieldController/ComboBoxFieldController/view'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldEditor.createData = function(params) {
    return {
        '@class'     : 'ComboBoxField',
        '@attributes': {
            'name'          :params['name'],
            'caption'       :params['caption']        ? params['caption']        : params['name'],
            'isVisible'     :params['isVisible']      ? params['isVisible']      :         'true',
            'width'         :params['width']          ? params['width']          :            '0',
            'defaultValue'  :params['defaultValue']   ? params['defaultValue']   :             '',
            'column'        :params['column']         ? params['column']         : params['name'],
            'readOnly'      :params['readOnly']       ? params['readOnly']       :        'true',
            'notNull'       :params['notNull']        ? params['notNull']        :        'false',
            'dataSourceName':params['dataSourceName'] ? params['dataSourceName'] :             '',
            'valueColumn'   :params['valueColumn']    ? params['valueColumn']    :             '',
            'displayColumn' :params['displayColumn']  ? params['displayColumn']  :             ''
        }
    };
};