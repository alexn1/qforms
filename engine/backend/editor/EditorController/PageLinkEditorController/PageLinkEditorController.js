'use strict';

module.exports = PageLinkEditorController;

var util = require('util');
var path = require('path');
var fs   = require('fs');
var _    = require('underscore');

var qforms           = require('../../../qforms');
var EditorController = require('../EditorController');
var ApplicationEditor = require('../../Editor/ApplicationEditor/ApplicationEditor');
var JsonFile  = require('../../JsonFile/JsonFile');

util.inherits(PageLinkEditorController, EditorController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function PageLinkEditorController(appInfo) {
    PageLinkEditorController.super_.call(this, appInfo);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageLinkEditorController.prototype.save = function(params, callback) {
    var self = this;
    var appFile = new JsonFile(this.appInfo.filePath);
    appFile.read(function() {
        var appEditor = new ApplicationEditor(appFile, self.appInfo);
        appEditor.setPageLinkAttr(params['pageLink'], params['attr'], params['value']);
        appEditor.save(function() {
            callback(null);
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageLinkEditorController.prototype.moveUp = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.movePageLinkUp(params.page);
        appEditor.appFile.save(function() {
            callback('ok');
        });

    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageLinkEditorController.prototype.moveDown = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.movePageLinkDown(params.page);
        appEditor.appFile.save(function() {
            callback('ok');
        });
    });
};