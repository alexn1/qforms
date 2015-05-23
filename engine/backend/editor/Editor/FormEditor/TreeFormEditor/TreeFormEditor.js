'use strict';

module.exports = TreeFormEditor;

var util = require('util');
var path = require('path');

var qforms = require('../../../../qforms');
var FormEditor = require('../FormEditor');

util.inherits(TreeFormEditor, FormEditor);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function TreeFormEditor(pageEditor, name) {
    TreeFormEditor.super_.prototype.constructor.call(this, pageEditor, name);
    this.defaultEjsFilePath = path.join(
        qforms.get('public'),
        'viewer/class/Controller/ModelController/FormController/TreeFormController/view/TreeFormView.ejs'
    );
    this.defaultCssFilePath = path.join(
        qforms.get('public'),
        'viewer/class/Controller/ModelController/FormController/TreeFormController/view/TreeFormView.css'
    );
};