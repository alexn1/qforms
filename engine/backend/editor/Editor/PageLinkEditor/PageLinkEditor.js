'use strict';

module.exports = PageLinkEditor;

var util = require('util');

var Editor = require('../Editor');

util.inherits(PageLinkEditor, Editor);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PageLinkEditor(appEditor, name) {
    this.appEditor = appEditor;
    this.name      = name;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageLinkEditor.prototype.getData = function() {
    return this.appEditor.appFile.getPageLinkData(this.name);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageLinkEditor.prototype.setAttr = function(name, value, callback) {
    this.appEditor.appFile.setPageLinkAttr(this.name, name, value);
    this.appEditor.appFile.save(callback);
};