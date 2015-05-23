'use strict';

module.exports = ApplicationController;

var util = require('util');
var path = require('path');
var fs   = require('fs');

var qforms            = require('../../../../qforms');
var VisualController  = require('../VisualController');

util.inherits(ApplicationController, VisualController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ApplicationController(appInfo) {
    ApplicationController.super_.prototype.constructor.call(this, appInfo);
    this.viewDirPath = path.join(
        qforms.get('public'),
        'editor/class/Controller/ModelController/DocumentController/VisualController/ApplicationController'
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.save = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.setAttr(params.attr, params.value, function() {
            callback(null);
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.createView = function(params, callback) {
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
ApplicationController.prototype.getView = function(params, callback) {
    var self = this;
    ApplicationController.super_.prototype.getView.call(this, params, function(result) {
        switch (params.view) {
            case 'VisualView.html':
                self.getApplicationEditor(function(appEditor) {
                    appEditor.getCustomFile(params, 'ejs', function(ejs) {
                        result.data.ejs = ejs;
                        appEditor.getCustomFile(params, 'css', function(css) {
                            result.data.css = css;
                            appEditor.getCustomFile(params, 'js', function(js) {
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
ApplicationController.prototype.saveView = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        switch (params.view) {
            case 'ejs':
                appEditor.saveCustomFile(params, 'ejs', function() {
                    callback(null);
                });
                break;
            case 'css':
                appEditor.saveCustomFile(params, 'css', function() {
                    callback(null);
                });
                break;
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.createController = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.createJs(params, function(js) {
            callback({
                js: js
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.saveController = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.saveJs(params, function() {
            callback(null);
        });
    });
};