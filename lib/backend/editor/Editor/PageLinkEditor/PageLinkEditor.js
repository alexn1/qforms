'use strict';

module.exports = PageLinkEditor;

var util = require('util');

var Editor = require('../Editor');

util.inherits(PageLinkEditor, Editor);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageLinkEditor.createData = function(params) {
    return {
        '@class'     : 'PageLink',
        '@attributes': {
            name    : params.name,
            fileName: 'pages/{name}/{name}.json'.replace(/{name}/g, params.name),
            menu    : params.menu || (params.startup === 'true' ? 'Menu' : ''),
            startup : params.startup || 'false'
        }
    }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PageLinkEditor(appEditor, name) {
    var self = this;
    self.appEditor = appEditor;
    self.name      = name;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageLinkEditor.prototype.getData = function() {
    var self = this;
    return self.appEditor.getPageLinkData(self.name);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageLinkEditor.prototype.setAttr2 = function(name, value) {
    var self = this;
    self.appEditor.setPageLinkAttr(self.name, name, value);
    return self.appEditor.save();
};