'use strict';

module.exports = PageEditorController;

var util = require('util');
var path = require('path');
var fs   = require('fs');

var qforms                 = require('../../../../qforms');
var VisualEditorController = require('../VisualEditorController');
var ApplicationFile        = require('../../../JsonFile/ApplicationFile/ApplicationFile');

util.inherits(PageEditorController, VisualEditorController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function PageEditorController(appInfo) {
    PageEditorController.super_.call(this, appInfo);
    this.viewDirPath = path.join(
        qforms.get('public'),
        'editor/class/Controller/ModelController/DocumentController/VisualController/PageController'
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditorController.prototype.get = function(params, callback) {
    var pageFilePath = path.join(this.appInfo.dirPath, params.fileName);
    fs.readFile(pageFilePath, 'utf8', function(err, content) {
        callback(JSON.parse(content));
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditorController.prototype.save = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPageByFileName(params.fileName, function(pageEditor) {
            pageEditor.setAttr(params.attr, params.value, function() {
                callback(null);
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditorController.prototype._new = function(params, callback) {
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
PageEditorController.prototype.delete = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.removePage(params.page, function() {
            callback(null);
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditorController.prototype.createView = function(params, callback) {
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
PageEditorController.prototype.getView = function(params, callback) {
    var self = this;
    PageEditorController.super_.prototype.getView.call(this, params, function(result) {
        switch (params.view) {
            case 'VisualView.html':
                self.getApplicationEditor(function(appEditor) {
                    appEditor.getPage(params.page, function(pageEditor) {
                        pageEditor.getCustomFile('ejs', function(ejs) {
                            result.data.ejs = ejs;
                            pageEditor.getCustomFile('css', function(css) {
                                result.data.css = css;
                                pageEditor.getCustomFile('js', function(js) {
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
PageEditorController.prototype.saveView = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPage(params.page, function(pageEditor) {
            switch (params.view) {
                case 'ejs':
                    pageEditor.saveCustomFile('ejs', params.text, function() {
                        callback(null);
                    });
                    break;
                case 'css':
                    pageEditor.saveCustomFile('css', params.text, function() {
                        callback(null);
                    });
                    break;
            }
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditorController.prototype.createController = function(params, callback) {
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
PageEditorController.prototype.saveController = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPage(params.page, function(pageEditor) {
            pageEditor.saveCustomFile('js', params.text, function() {
                callback(null);
            });
        });
    });
};