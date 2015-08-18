'use strict';

module.exports = TreeFormEditor;

var util = require('util');
var path = require('path');

var server = require('../../../../server');

var FormEditor = require('../FormEditor');

util.inherits(TreeFormEditor, FormEditor);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function TreeFormEditor(pageEditor, name, data) {
    TreeFormEditor.super_.call(this, pageEditor, name, data);
    this.defaultEjsFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FormController/TreeFormController/view/TreeFormView.ejs'
    );
    this.defaultCssFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FormController/TreeFormController/view/TreeFormView.css'
    );
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeFormEditor.createData = function(params) {
    return {
        '@class':'TreeForm',
        '@attributes': {
            'name'        : params.name,
            'caption'     : (params.caption) && params.caption ? params.caption : params.name,
            'itemEditPage': ''
        },
        'dataSources' : {},
        'fields'      : {},
        'controls'    : {}
    };
};