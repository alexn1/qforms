'use strict';

module.exports = RowFormEditor;

var util = require('util');
var path = require('path');

var qforms = require('../../../../qforms');
var FormEditor = require('../FormEditor');

util.inherits(RowFormEditor, FormEditor);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function RowFormEditor(pageEditor, name) {
    RowFormEditor.super_.prototype.constructor.call(this, pageEditor, name);
    this.defaultEjsFilePath = path.join(
        qforms.get('public'),
        'viewer/class/Controller/ModelController/FormController/RowFormController/view/RowFormView.ejs'
    );
    this.defaultCssFilePath = path.join(
        qforms.get('public'),
        'viewer/class/Controller/ModelController/FormController/RowFormController/view/RowFormView.css'
    );
};