'use strict';

module.exports = PageLinkEditor;

var util = require('util');

var Editor = require('../Editor');

util.inherits(PageLinkEditor, Editor);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageLinkEditor.createData = function(params) {
    return {
        '@class' : 'PageLink',
        '@attributes' : {
            name    : params.name,
            fileName: 'pages/{name}/{name}.json'.replace(/{name}/g, params.name),
            menu    : params.menu || (params.startup === 'true' ? 'Menu' : ''),
            startup : params.startup || 'false'
        }
    }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PageLinkEditor(appEditor, name) {
    this.appEditor = appEditor;
    this.name      = name;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageLinkEditor.prototype.getData = function() {
    return this.appEditor.getPageLinkData(this.name);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageLinkEditor.prototype.setAttr = function(name, value, callback) {
    this.appEditor.setPageLinkAttr(this.name, name, value);
    this.appEditor.save(callback);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageLinkEditor.prototype.setAttr2 = function(name, value) {
    var self = this;
    self.appEditor.setPageLinkAttr(self.name, name, value);
    return self.appEditor.save2();
};