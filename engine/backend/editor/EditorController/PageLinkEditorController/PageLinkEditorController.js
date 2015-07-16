'use strict';

module.exports = PageLinkEditorController;

var util = require('util');
var path = require('path');
var fs   = require('fs');
var _    = require('underscore');

var qforms           = require('../../../qforms');
var EditorController = require('../EditorController');
var ApplicationFile  = require('../../JsonFile/ApplicationFile/ApplicationFile');

util.inherits(PageLinkEditorController, EditorController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function PageLinkEditorController(appInfo) {
    PageLinkEditorController.super_.call(this, appInfo);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageLinkEditorController.prototype.save = function(params, callback) {
    var appFile = new ApplicationFile(this.appInfo);
    appFile.init(function() {
        appFile.setPageLinkAttr(params['pageLink'], params['attr'], params['value']);
        appFile.save(function() {
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