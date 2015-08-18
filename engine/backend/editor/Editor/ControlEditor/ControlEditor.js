'use strict';

module.exports = ControlEditor;

var util = require('util');

var QForms = require('../../../qforms');

var Editor = require('../Editor');

util.inherits(ControlEditor, Editor);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ControlEditor(formEditor, name) {
    this.formEditor = formEditor;
    this.parent     = formEditor;
    this.name = name;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ControlEditor.prototype.getData = function() {
    return this.parent.data.controls[this.name];
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ControlEditor.prototype.setAttr = function(name, value, callback) {
    this.formEditor.setControlAttr(this.name, name, value);
    this.formEditor.pageEditor.save(callback);
};