'use strict';

module.exports = ControlEditorController;

var util = require('util');
var path = require('path');
var fs   = require('fs');

var server = require('../../../../../server');

var VisualEditorController = require('../VisualEditorController');

util.inherits(ControlEditorController, VisualEditorController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ControlEditorController(appInfo) {
    ControlEditorController.super_.call(this, appInfo);
    this.viewDirPath = path.join(
        server.get('public'),
        'editor/class/Controller/ModelController/DocumentController/VisualController/ControlController'
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ControlEditorController.prototype._new = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPageByFileName(params.pageFileName, function(pageEditor) {
            var formEditor = pageEditor.getForm(params.form);
            formEditor.createControl(params, function(controlEditor) {
                var controlData = controlEditor.getData();
                callback(controlData);
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ControlEditorController.prototype.save = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPageByFileName(params.pageFileName, function(pageEditor) {
            var formEditor = pageEditor.getForm(params.form);
            var controlEditor = formEditor.getControl(params.control);
            controlEditor.setAttr(params['attr'], params['value'], function() {
                callback(null);
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ControlEditorController.prototype.delete = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPageByFileName(params.pageFileName, function(pageEditor) {
            var formEditor = pageEditor.getForm(params.form);
            formEditor.removeControl(params.control, function() {
                callback(null);
            });
        });
    });
};