'use strict';

module.exports = FormEditorController;

var util = require('util');
var path = require('path');
var fs   = require('fs');

var qforms                 = require('../../../../qforms');
var VisualEditorController = require('../VisualEditorController');
var ApplicationFile        = require('../../../JsonFile/ApplicationFile/ApplicationFile');

util.inherits(FormEditorController, VisualEditorController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function FormEditorController(appInfo) {
    FormEditorController.super_.call(this, appInfo);
    this.viewDirPath = path.join(
        qforms.get('public'),
        'editor/class/Controller/ModelController/DocumentController/VisualController/FormController'
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditorController.prototype._new = function(params, callback) {
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
FormEditorController.prototype.save = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPageByFileName(params['pageFileName'], function(pageEditor) {
            var formEditor = pageEditor.getForm(params.form);
            formEditor.setAttr(params['attr'], params['value'], function() {
                callback(null);
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditorController.prototype.delete = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPageByFileName(params['pageFileName'], function(pageEditor) {
            pageEditor.removeForm(params['form'], function() {
                callback(null);
            });
        });
    });
};


////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditorController.prototype.moveUp = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPageByFileName(params.pageFileName, function(pageEditor) {
            pageEditor.moveFormUp(params, function(result) {
                callback(result);
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditorController.prototype.moveDown = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPageByFileName(params.pageFileName, function(pageEditor) {
            pageEditor.moveFormDown(params, function(result) {
                callback(result);
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditorController.prototype.createView = function(params, callback) {
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
FormEditorController.prototype.getView = function(params, callback) {
    var self = this;
    FormEditorController.super_.prototype.getView.call(this, params, function(result) {
        switch (params.view) {
            case 'VisualView.html':
                self.getApplicationEditor(function(appEditor) {
                    appEditor.getPage(params.page, function(pageEditor) {
                        var formEditor = pageEditor.getForm(params.form);
                        formEditor.getCustomFile('ejs', function(ejs) {
                            result.data.ejs = ejs;
                            formEditor.getCustomFile('css', function(css) {
                                result.data.css = css;
                                formEditor.getCustomFile('js', function(js) {
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
FormEditorController.prototype.saveView = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPage(params.page, function(pageEditor) {
            var formEditor = pageEditor.getForm(params.form);
            switch (params.view) {
                case 'ejs':
                    formEditor.saveCustomFile('ejs', params.text, function() {
                        callback(null);
                    });
                    break;
                case 'css':
                    formEditor.saveCustomFile('css', params.text, function() {
                        callback(null);
                    });
                    break;
            }
        });
    });
};


////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditorController.prototype.createController = function(params, callback) {
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
FormEditorController.prototype.saveController = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPage(params.page, function(pageEditor) {
            var formEditor = pageEditor.getForm(params.form);
            formEditor.saveCustomFile('js', params.text, function() {
                callback(null);
            });
        });
    });
};