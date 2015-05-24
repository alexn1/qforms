'use strict';

module.exports = ControlController;

var util = require('util');
var path = require('path');
var fs   = require('fs');

var qforms            = require('../../../../qforms');
var VisualController  = require('../VisualController');
var ApplicationFile   = require('../../../JsonFile/ApplicationFile/ApplicationFile');

util.inherits(ControlController, VisualController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ControlController(appInfo) {
    ControlController.super_.prototype.constructor.call(this, appInfo);
    this.viewDirPath = path.join(
        qforms.get('public'),
        'editor/class/Controller/ModelController/DocumentController/VisualController/ControlController'
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ControlController.prototype._new = function(params, callback) {
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
ControlController.prototype.save = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPageByFileName(params.pageFileName, function(pageEditor) {
            var formEditor = pageEditor.getForm(params.form);
            var controlEditor = formEditor.getControl(params.control);
            controlEditor.setAttr(params["attr"], params["value"], function() {
                callback(null);
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ControlController.prototype.delete = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPageByFileName(params.pageFileName, function(pageEditor) {
            var formEditor = pageEditor.getForm(params.form);
            formEditor.removeControl(params.control, function() {
                callback(null);
            });
        });
    });
};