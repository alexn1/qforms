'use strict';

module.exports = PageLinkEditorController;

var util = require('util');
var path = require('path');
var fs   = require('fs');
var _    = require('underscore');

var qforms           = require('../../../../qforms');
var server           = require('../../../../server');
var EditorController = require('../EditorController');

util.inherits(PageLinkEditorController, EditorController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function PageLinkEditorController(appInfo) {
    var self = this;
    PageLinkEditorController.super_.call(self, appInfo);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
PageLinkEditorController.prototype.save = function(params) {
    var self = this;
    var appFile = new qforms.JsonFile(self.appInfo.filePath);
    return appFile.read2().then(function () {
        var appEditor = new qforms.ApplicationEditor(appFile);
        appEditor.setPageLinkAttr(params['pageLink'], params['attr'], params['value']);
        return appEditor.save().then(function () {
            return null;
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageLinkEditorController.prototype.moveUp = function(params) {
    var self = this;
    return self.getApplicationEditor().then(function(appEditor) {
        appEditor.movePageLinkUp(params.page);
        return appEditor.appFile.save().then(function () {
            return 'ok';
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageLinkEditorController.prototype.moveDown = function(params) {
    var self = this;
    return self.getApplicationEditor().then(function(appEditor) {
        appEditor.movePageLinkDown(params.page);
        return appEditor.appFile.save().then(function () {
            return 'ok';
        });
    });
};