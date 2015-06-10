'use strict';

module.exports = FormController;

var util = require('util');
var path = require('path');
var fs   = require('fs');

var qforms            = require('../../../../qforms');
var VisualController  = require('../VisualController');
var ApplicationFile   = require('../../../JsonFile/ApplicationFile/ApplicationFile');

util.inherits(FormController, VisualController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function FormController(appInfo) {
    FormController.super_.call(this, appInfo);
    this.viewDirPath = path.join(
        qforms.get('public'),
        'editor/class/Controller/ModelController/DocumentController/VisualController/FormController'
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype._new = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPageByFileName(params['pageFileName'], function(pageEditor) {
            pageEditor.createForm(params, function(formEditor) {
                var formData = formEditor.getData();
                callback(formData);
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.save = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPageByFileName(params['pageFileName'], function(pageEditor) {
            var formEditor = pageEditor.getForm(params.form);
            formEditor.setAttr(params["attr"], params["value"], function() {
                callback(null);
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.delete = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPageByFileName(params['pageFileName'], function(pageEditor) {
            pageEditor.removeForm(params["form"], function() {
                callback(null);
            });
        });
    });
};


////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.moveUp = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPageByFileName(params.pageFileName, function(pageEditor) {
            pageEditor.moveFormUp(params, function(result) {
                callback(result);
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.moveDown = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPageByFileName(params.pageFileName, function(pageEditor) {
            pageEditor.moveFormDown(params, function(result) {
                callback(result);
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.createView = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPage(params.page, function(pageEditor) {
            var formEditor = pageEditor.getForm(params.form);
            formEditor.createEjs(params, function(ejs) {
                formEditor.createCss(params, function(css) {
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
FormController.prototype.getView = function(params, callback) {
    var self = this;
    FormController.super_.prototype.getView.call(this, params, function(result) {
        switch (params.view) {
            case 'VisualView.html':
                self.getApplicationEditor(function(appEditor) {
                    appEditor.getPage(params.page, function(pageEditor) {
                        var formEditor = pageEditor.getForm(params.form);
                        formEditor.getCustomFile(params, 'ejs', function(ejs) {
                            result.data.ejs = ejs;
                            formEditor.getCustomFile(params, 'css', function(css) {
                                result.data.css = css;
                                formEditor.getCustomFile(params, 'js', function(js) {
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
FormController.prototype.saveView = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPage(params.page, function(pageEditor) {
            var formEditor = pageEditor.getForm(params.form);
            switch (params.view) {
                case 'ejs':
                    formEditor.saveCustomFile(params, 'ejs', function() {
                        callback(null);
                    });
                    break;
                case 'css':
                    formEditor.saveCustomFile(params, 'css', function() {
                        callback(null);
                    });
                    break;
            }
        });
    });
};


////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.createController = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPage(params.page, function(pageEditor) {
            var formEditor = pageEditor.getForm(params.form);
            formEditor.createJs(params, function(js) {
                callback({
                    js: js
                });
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.saveController = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPage(params.page, function(pageEditor) {
            var formEditor = pageEditor.getForm(params.form);
            formEditor.saveCustomFile(params, 'js' , function() {
                callback(null);
            });
        });
    });
};