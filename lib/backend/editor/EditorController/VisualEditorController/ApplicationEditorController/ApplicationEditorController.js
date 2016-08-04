'use strict';

module.exports = ApplicationEditorController;

var util    = require('util');
var path    = require('path');
var fs      = require('fs');
var Promise = require('bluebird');

var server = require('../../../../../server');

var VisualEditorController = require('../VisualEditorController');

util.inherits(ApplicationEditorController, VisualEditorController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ApplicationEditorController(appInfo) {
    ApplicationEditorController.super_.call(this, appInfo);
    this.viewDirPath = path.join(
        server.get('public'),
        'editor/class/Controller/ModelController/DocumentController/VisualController/ApplicationController'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditorController.prototype.save = function(params, callback) {
    var self = this;
    self.getApplicationEditor2().then(function(appEditor) {
        return appEditor.setAttr2(params.attr, params.value).then(function () {
            callback(null);
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditorController.prototype.createView = function(params, callback) {
    var self = this;
    //console.log('ApplicationEditorController.prototype.createView');
    self.getApplicationEditor2().then(function(appEditor) {
        return appEditor.createEjs2(params).then(function(ejs) {
            return appEditor.createCss2(params).then(function(css) {
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
    ApplicationEditorController.super_.prototype.getView.call(self, params, function(result) {
        switch (params.view) {
            case 'VisualView.html':
                self.getApplicationEditor2().then(function(appEditor) {
                    return appEditor.getCustomFile2('ejs').then(function (ejs) {
                        console.log('ejs', ejs);
                        result.data.ejs = ejs;
                        return appEditor.getCustomFile2('css');
                    }).then(function (css) {
                        result.data.css = css;
                        return appEditor.getCustomFile2('js');
                    }).then(function (js) {
                        result.data.js = js;
                        callback(result);
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
    var self = this;
    self.getApplicationEditor2().then(function(appEditor) {
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
    var self = this;
    self.getApplicationEditor2().then(function(appEditor) {
        appEditor.createJs(params, function(js) {
            callback({
                js: js
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditorController.prototype.saveController = function(params, callback) {
    var self = this;
    self.getApplicationEditor2().then(function(appEditor) {
        appEditor.saveJs(params, function() {
            callback(null);
        });
    });
};