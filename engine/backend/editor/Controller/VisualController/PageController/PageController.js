'use strict';

module.exports = PageController;

var util = require('util');
var path = require('path');
var fs   = require('fs');

var qforms            = require('../../../../qforms');
var VisualController  = require('../VisualController');
var ApplicationFile   = require('../../../JsonFile/ApplicationFile/ApplicationFile');
var ApplicationEditor = require('../../../Editor/ApplicationEditor/ApplicationEditor');

util.inherits(PageController, VisualController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function PageController(appInfo) {
    PageController.super_.prototype.constructor.call(this, appInfo);
    this.viewDirPath = path.join(
        qforms.get('public'),
        'editor/class/Controller/ModelController/DocumentController/VisualController/PageController'
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.get = function(params, callback) {
    var pageFilePath = path.join(this.appInfo.dirPath, params.fileName);
    fs.readFile(pageFilePath, 'utf8', function(err, content) {
        callback(JSON.parse(content));
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.save = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPageByFileName(params.fileName, function(pageEditor) {
            pageEditor.setAttr(params.attr, params.value, function() {
                callback(null);
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype._new = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.createPage(params, function(pageEditor) {
            var pageLinkEditor = appEditor.getPageLink(params.name);
            callback({
                page: pageEditor.getData(),
                pageLink: pageLinkEditor.getData()
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.delete = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.removePage(params.page, function() {
            callback(null);
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.createView = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPage(params.page, function(pageEditor) {
            pageEditor.createEjs(params, function(ejs) {
                pageEditor.createCss(params, function(css) {
                    callback({
                        ejs: ejs,
                        css: css
                    });
                });
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.getView = function(params, callback) {
    var self = this;
    PageController.super_.prototype.getView.call(this, params, function(result) {
        switch (params.view) {
            case 'VisualView.html':
                self.getApplicationEditor(function(appEditor) {
                    appEditor.getPage(params.page, function(pageEditor) {
                        pageEditor.getCustomFile(params, 'ejs', function(ejs) {
                            result.data.ejs = ejs;
                            pageEditor.getCustomFile(params, 'css', function(css) {
                                result.data.css = css;
                                pageEditor.getCustomFile(params, 'js', function(js) {
                                    result.data.js = js;
                                    callback(result);
                                });
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
PageController.prototype.saveView = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPage(params.page, function(pageEditor) {
            switch (params.view) {
                case 'ejs':
                    pageEditor.saveCustomFile(params, 'ejs', function() {
                        callback(null);
                    });
                    break;
                case 'css':
                    pageEditor.saveCustomFile(params, 'css', function() {
                        callback(null);
                    });
                    break;
            }
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.createController = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPage(params.page, function(pageEditor) {
            pageEditor.createJs(params, function(js) {
                callback({
                    js: js
                });
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.saveController = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPage(params.page, function(pageEditor) {
            pageEditor.saveCustomFile(params, 'js', function() {
                callback(null);
            });
        });
    });
};