'use strict';

module.exports = ApplicationEditorController;

var util    = require('util');
var path    = require('path');
var fs      = require('fs');
var Promise = require('bluebird');

var server                 = require('../../../../../server');
var VisualEditorController = require('../VisualEditorController');

util.inherits(ApplicationEditorController, VisualEditorController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ApplicationEditorController(appInfo) {
    var self = this;
    ApplicationEditorController.super_.call(self, appInfo);
    self.viewDirPath = path.join(
        server.get('public'),
        'editor/class/Controller/ModelController/DocumentController/VisualController/ApplicationController'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditorController.prototype.save = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        return appEditor.setAttr(params.attr, params.value).then(function () {
            return null;
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditorController.prototype.createView = function(params) {
    var self = this;
    //console.log('ApplicationEditorController.prototype.createView');
    return self.getApplicationEditor2().then(function(appEditor) {
        return appEditor.createEjs(params).then(function(ejs) {
            return appEditor.createCss(params).then(function(css) {
                return {
                    ejs: ejs,
                    css: css
                };
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditorController.prototype.getView = function(params) {
    var self = this;
    return ApplicationEditorController.super_.prototype.getView.call(self, params).then(function (result) {
        switch (params.view) {
            case 'VisualView.html':
                return self.getApplicationEditor2().then(function(appEditor) {
                    return appEditor.getCustomFile('ejs').then(function (ejs) {
                        console.log('ejs', ejs);
                        result.data.ejs = ejs;
                        return appEditor.getCustomFile('css');
                    }).then(function (css) {
                        result.data.css = css;
                        return appEditor.getCustomFile('js');
                    }).then(function (js) {
                        result.data.js = js;
                        return result;
                    });
                });
                break;
            default:
                return result;
                break;
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditorController.prototype.saveView = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        switch (params.view) {
            case 'ejs':
                appEditor.saveCustomFile('ejs', params.text).then(function () {
                    return null;
                });
                break;
            case 'css':
                appEditor.saveCustomFile('css', params.text).then(function() {
                    return null;
                });
                break;
            default:
                throw new Error('unknown view');
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditorController.prototype.createController = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        return appEditor.createJs2(params).then(function (js) {
            return {
                js: js
            };
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditorController.prototype.saveController = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        return appEditor.saveCustomFile('js', params.text).then(function () {
            return null;
        });
    });
};