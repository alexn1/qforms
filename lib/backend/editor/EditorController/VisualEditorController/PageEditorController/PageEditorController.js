'use strict';

module.exports = PageEditorController;

var util = require('util');
var path = require('path');
var fs   = require('fs');

var qforms                 = require('../../../../../qforms');
var server                 = require('../../../../../server');
var VisualEditorController = require('../VisualEditorController');

util.inherits(PageEditorController, VisualEditorController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function PageEditorController(appInfo) {
    var self = this;
    PageEditorController.super_.call(self, appInfo);
    self.viewDirPath = path.join(
        server.get('public'),
        'editor/class/Controller/ModelController/DocumentController/VisualController/PageController'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditorController.prototype.get = function(params) {
    var self = this;
    var pageFilePath = path.join(self.appInfo.dirPath, params.fileName);
    return qforms.helper.readFile(pageFilePath).then(function (content) {
        return JSON.parse(content);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditorController.prototype.save = function(params) {
    var self = this;
    return self.getApplicationEditor().then(function(appEditor) {
        return appEditor.getPageByFileName(params.fileName).then(function (pageEditor) {
            return pageEditor.setAttr(params.attr, params.value).then(function () {
                return null;
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditorController.prototype._new = function(params) {
    var self = this;
    return self.getApplicationEditor().then(function(appEditor) {
        return appEditor.createPage(params).then(function(pageEditor) {
            var pageLinkEditor = appEditor.getPageLink(params.name);
            return {
                page    : pageEditor.getData(),
                pageLink: pageLinkEditor.getData()
            };
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditorController.prototype.delete = function(params) {
    var self = this;
    return self.getApplicationEditor().then(function(appEditor) {
        return appEditor.removePage(params.page).then(function () {
            return null;
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditorController.prototype.createView = function(params) {
    var self = this;
    return self.getApplicationEditor().then(function(appEditor) {
        return appEditor.getPage(params.page).then(function (pageEditor) {
            return pageEditor.createEjs(params).then(function (ejs) {
                return pageEditor.createCss(params).then(function (css) {
                    return {
                        ejs: ejs,
                        css: css
                    };
                });
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditorController.prototype.getView = function(params) {
    var self = this;
    return PageEditorController.super_.prototype.getView.call(this, params).then(function (result) {
        switch (params.view) {
            case 'VisualView.html':
                return self.getApplicationEditor().then(function(appEditor) {
                    return appEditor.getPage(params.page).then(function (pageEditor) {
                        return pageEditor.getCustomFile('ejs').then(function (ejs) {
                            result.data.ejs = ejs;
                            return pageEditor.getCustomFile('css').then(function (css) {
                                result.data.css = css;
                                return pageEditor.getCustomFile('js').then(function (js) {
                                    result.data.js = js;
                                    return result;
                                });
                            });
                        });
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
PageEditorController.prototype.saveView = function(params) {
    var self = this;
    return self.getApplicationEditor().then(function(appEditor) {
        return appEditor.getPage(params.page).then(function (pageEditor) {
            switch (params.view) {
                case 'ejs':
                    pageEditor.saveCustomFile('ejs', params.text).then(function () {
                        return null;
                    });
                    break;
                case 'css':
                    pageEditor.saveCustomFile('css', params.text).then(function () {
                        return null;
                    });
                    break;
            }
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditorController.prototype.createController = function(params) {
    var self = this;
    return self.getApplicationEditor().then(function(appEditor) {
        return appEditor.getPage(params.page).then(function (pageEditor) {
            return pageEditor.createJs(params).then(function (js) {
                return {
                    js: js
                };
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditorController.prototype.saveController = function(params) {
    var self = this;
    return self.getApplicationEditor().then(function(appEditor) {
        return appEditor.getPage(params.page).then(function (pageEditor) {
            return pageEditor.saveCustomFile('js', params.text).then(function () {
                return null;
            });
        });
    });
};