'use strict';

module.exports = RowFormEditor;

var util = require('util');
var path = require('path');

var server = require('../../../../../server');

var FormEditor = require('../FormEditor');

util.inherits(RowFormEditor, FormEditor);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function RowFormEditor(pageEditor, name, data) {
    RowFormEditor.super_.call(this, pageEditor, name, data);
    this.defaultEjsFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FormController/RowFormController/view/RowFormView.ejs'
    );
    this.defaultCssFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FormController/RowFormController/view/RowFormView.css'
    );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
RowFormEditor.createData = function(params) {
    return {
        '@class': 'RowForm',
        '@attributes': {
            'name'    :params.name,
            'caption' :params.caption ? params.caption : params.name
        },
        'dataSources' : {},
        'fields'      : {},
        'controls'    : {}
    };
};