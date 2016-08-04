'use strict';

module.exports = PageLinkEditorController;

var util = require('util');
var path = require('path');
var fs   = require('fs');
var _    = require('underscore');

var qforms = require('../../../../qforms');
var server = require('../../../../server');

var EditorController = require('../EditorController');

util.inherits(PageLinkEditorController, EditorController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function PageLinkEditorController(appInfo) {
    PageLinkEditorController.super_.call(this, appInfo);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
PageLinkEditorController.prototype.save = function(params, callback) {
    var self = this;
    var appFile = new qforms.JsonFile(self.appInfo.filePath);
    appFile.read2().then(function () {
        var appEditor = new qforms.ApplicationEditor(appFile);
        appEditor.setPageLinkAttr(params['pageLink'], params['attr'], params['value']);
        return appEditor.save2().then(function () {
            callback(null);
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageLinkEditorController.prototype.moveUp = function(params, callback) {
    var self = this;
    self.getApplicationEditor2().then(function(appEditor) {
        appEditor.movePageLinkUp(params.page);
        return appEditor.appFile.save2().then(function () {
            callback('ok');
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageLinkEditorController.prototype.moveDown = function(params, callback) {
    var self = this;
    self.getApplicationEditor2().then(function(appEditor) {
        appEditor.movePageLinkDown(params.page);
        return appEditor.appFile.save2().then(function () {
            callback('ok');
        });
    });
};