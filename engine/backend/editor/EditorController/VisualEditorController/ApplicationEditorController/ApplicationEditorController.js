'use strict';

module.exports = ApplicationEditorController;

var util = require('util');
var path = require('path');
var fs   = require('fs');

var QForms = require('../../../../QForms');
var server = require('../../../../server');

var VisualEditorController = require('../VisualEditorController');

util.inherits(ApplicationEditorController, VisualEditorController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ApplicationEditorController(appInfo) {
    ApplicationEditorController.super_.call(this, appInfo);
    this.viewDirPath = path.join(
        server.get('public'),
        'editor/class/Controller/ModelController/DocumentController/VisualController/ApplicationController'
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditorController.prototype.save = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.setAttr(params.attr, params.value, function() {
            callback(null);
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditorController.prototype.createView = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.createEjs(params, function(ejs) {
            appEditor.createCss(params, function(css) {
                callback({
                    ejs: ejs,
                    css: css
                });
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditorController.prototype.getView = function(params, callback) {
    var self = this;
    ApplicationEditorController.super_.prototype.getView.call(this, params, function(result) {
        switch (params.view) {
            case 'VisualView.html':
                self.getApplicationEditor(function(appEditor) {
                    appEditor.getCustomFile('ejs', function(ejs) {
                        result.data.ejs = ejs;
                        appEditor.getCustomFile('css', function(css) {
                            result.data.css = css;
                            appEditor.getCustomFile('js', function(js) {
                                result.data.js = js;
                                callback(result);
                            });
                        });
                    });
                });
                break;
            default:
                callback(result);
                break;
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditorController.prototype.saveView = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        switch (params.view) {
            case 'ejs':
                appEditor.saveCustomFile('ejs', params.text, function() {
                    callback(null);
                });
                break;
            case 'css':
                appEditor.saveCustomFile('css', params.text, function() {
                    callback(null);
                });
                break;
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditorController.prototype.createController = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.createJs(params, function(js) {
            callback({
                js: js
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditorController.prototype.saveController = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.saveJs(params, function() {
            callback(null);
        });
    });
};