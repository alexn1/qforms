'use strict';

module.exports = ControlEditor;

var util = require('util');

var Editor = require('../Editor');

util.inherits(ControlEditor, Editor);

var ButtonControlEditor = require('./ButtonControlEditor/ButtonControlEditor');

////////////////////////////////////////////////////////////////////////////////////////////////////
function ControlEditor(formEditor, name) {
    this.formEditor = formEditor;
    this.name = name;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ControlEditor.prototype.getData = function() {
    return this.formEditor.pageEditor.pageFile.getFormControlData(this.formEditor.name, this.name);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ControlEditor.prototype.setAttr = function(name, value, callback) {
    this.formEditor.pageEditor.pageFile.setFormControlAttr(this.formEditor.name, this.name, name, value);
    this.formEditor.pageEditor.pageFile.save(callback);
};