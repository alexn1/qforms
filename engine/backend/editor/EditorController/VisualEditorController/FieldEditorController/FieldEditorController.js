'use strict';

module.exports = FieldEditorController;

var util = require('util');
var path = require('path');
var fs   = require('fs');

var qforms                 = require('../../../../qforms');
var VisualEditorController = require('../VisualEditorController');
var ApplicationFile        = require('../../../JsonFile/ApplicationFile/ApplicationFile');

util.inherits(FieldEditorController, VisualEditorController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function FieldEditorController(appInfo) {
    FieldEditorController.super_.call(this, appInfo);
    this.viewDirPath = path.join(
        qforms.get('public'),
        'editor/class/Controller/ModelController/DocumentController/VisualController/FieldController'
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditorController.prototype._new = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPageByFileName(params.pageFileName, function(pageEditor) {
            var formEditor = pageEditor.getForm(params.form);
            formEditor.createField(params, function(fieldEditor) {
                var fieldData = fieldEditor.getData();
                callback(fieldData);
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditorController.prototype.save = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPageByFileName(params.pageFileName, function(pageEditor) {
            var formEditor = pageEditor.getForm(params.form);
            var fieldEditor = formEditor.getField(params.field);
            fieldEditor.setAttr(params["attr"], params["value"], function() {
                callback(null);
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditorController.prototype.delete = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPageByFileName(params.pageFileName, function(pageEditor) {
            var formEditor = pageEditor.getForm(params.form);
            formEditor.removeField(params.field, function() {
                callback(null);
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditorController.prototype.changeClass = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPage(params.page, function(pageEditor) {
            var formEditor = pageEditor.getForm(params.form);
            var fieldEditor = formEditor.getField(params.field);
            fieldEditor.changeClass(params['class'], function(newFieldData) {
                callback(newFieldData);
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditorController.prototype.createView = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPage(params.page, function(pageEditor) {
            var formEditor = pageEditor.getForm(params.form);
            var fieldEditor = formEditor.getField(params.field);
            fieldEditor.createEjs(params, function(ejs) {
                fieldEditor.createCss(params, function(css) {
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
FieldEditorController.prototype.getView = function(params, callback) {
    var self = this;
    FieldEditorController.super_.prototype.getView.call(this, params, function(result) {
        switch (params.view) {
            case 'VisualView.html':
                self.getApplicationEditor(function(appEditor) {
                    appEditor.getPage(params.page, function(pageEditor) {
                        var formEditor  = pageEditor.getForm(params.form);
                        var fieldEditor = formEditor.getField(params.field);
                        fieldEditor.getCustomFile(params, 'ejs', function(ejs) {
                            result.data.ejs = ejs;
                            fieldEditor.getCustomFile(params, 'css', function(css) {
                                result.data.css = css;
                                fieldEditor.getCustomFile(params, 'js', function(js) {
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
FieldEditorController.prototype.saveView = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPage(params.page, function(pageEditor) {
            var formEditor  = pageEditor.getForm(params.form);
            var fieldEditor = formEditor.getField(params.field);
            switch (params.view) {
                case 'ejs':
                    fieldEditor.saveCustomFile(params, 'ejs', function() {
                        callback(null);
                    });
                    break;
                case 'css':
                    fieldEditor.saveCustomFileaveFile(params, 'css', function() {
                        callback(null);
                    });
                    break;
            }
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditorController.prototype.createController = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPage(params.page, function(pageEditor) {
            var formEditor  = pageEditor.getForm(params.form);
            var fieldEditor = formEditor.getField(params.field);
            fieldEditor.createJs(params, function(js) {
                callback({
                    js: js
                });
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditorController.prototype.saveController = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPage(params.page, function(pageEditor) {
            var formEditor = pageEditor.getForm(params.form);
            var fieldEditor = formEditor.getField(params.field);
            fieldEditor.saveCustomFile(params, 'js', function() {
                callback(null);
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditorController.prototype.moveUp = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPageByFileName(params.pageFileName, function(pageEditor) {
            var formEditor = pageEditor.getForm(params.form);
            formEditor.moveFieldUp(params, function(result) {
                callback(result);
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditorController.prototype.moveDown = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPageByFileName(params.pageFileName, function(pageEditor) {
            var formEditor = pageEditor.getForm(params.form);
            formEditor.moveFieldDown(params, function(result) {
                callback(result);
            });
        });
    });
};