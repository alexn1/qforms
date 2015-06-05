'use strict';

module.exports = TableFormEditor;

var util = require('util');
var path = require('path');

var qforms     = require('../../../../qforms');
var FormEditor = require('../FormEditor');

util.inherits(TableFormEditor, FormEditor);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function TableFormEditor(pageEditor, name) {
    TableFormEditor.super_.call(this, pageEditor, name);
    this.defaultEjsFilePath = path.join(
        qforms.get('public'),
        'viewer/class/Controller/ModelController/FormController/TableFormController/view/TableFormView.ejs'
    );
    this.defaultCssFilePath = path.join(
        qforms.get('public'),
        'viewer/class/Controller/ModelController/FormController/TableFormController/view/TableFormView.css'
    );
};