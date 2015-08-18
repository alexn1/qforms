'use strict';

module.exports = FieldEditorController;

var util = require('util');
var path = require('path');
var fs   = require('fs');

var QForms = require('../../../../qforms');
var server = require('../../../../server');

var VisualEditorController = require('../VisualEditorController');

util.inherits(FieldEditorController, VisualEditorController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function FieldEditorController(appInfo) {
    FieldEditorController.super_.call(this, appInfo);
    this.viewDirPath = path.join(
        server.get('public'),
        'editor/class/Controller/ModelController/DocumentController/VisualController/FieldController'
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditorController.prototype._new = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPageByFileName(params.pageFileName, function(pageEditor) {
            var formEditor = pageEditor.getForm(params.form);
            var fieldData = formEditor.newField(params);
            pageEditor.save(function() {
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
            fieldEditor.setAttr(params['attr'], params['value'], function() {
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
                        fieldEditor.getCustomFile('ejs', function(ejs) {
                            result.data.ejs = ejs;
                            fieldEditor.getCustomFile('css', function(css) {
                                result.data.css = css;
                                fieldEditor.getCustomFile('js', function(js) {
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
                    fieldEditor.saveCustomFile('ejs', params.text, function() {
                        callback(null);
                    });
                    break;
                case 'css':
                    fieldEditor.saveCustomFileaveFile('css', params.text, function() {
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
            fieldEditor.saveCustomFile('js', params.text, function() {
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