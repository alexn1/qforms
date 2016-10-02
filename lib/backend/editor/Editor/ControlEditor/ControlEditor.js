'use strict';

module.exports = ControlEditor;

var util = require('util');

var Editor = require('../Editor');

util.inherits(ControlEditor, Editor);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ControlEditor(formEditor, name) {
    var self = this;
    self.formEditor = formEditor;
    self.parent     = formEditor;
    self.name       = name;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ControlEditor.prototype.getData = function() {
    var self = this;
    return self.parent.data.controls[self.name];
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ControlEditor.prototype.setAttr2 = function(name, value) {
    var self = this;
    self.formEditor.setControlAttr(self.name, name, value);
    return self.formEditor.pageEditor.save2();
};