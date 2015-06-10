'use strict';

module.exports = FieldController;

var util = require('util');
var path = require('path');
var fs   = require('fs');

var qforms            = require('../../../../qforms');
var VisualController  = require('../VisualController');
var ApplicationFile   = require('../../../JsonFile/ApplicationFile/ApplicationFile');

util.inherits(FieldController, VisualController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function FieldController(appInfo) {
    FieldController.super_.call(this, appInfo);
    this.viewDirPath = path.join(
        qforms.get('public'),
        'editor/class/Controller/ModelController/DocumentController/VisualController/FieldController'
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.prototype._new = function(params, callback) {
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
FieldController.prototype.save = function(params, callback) {
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
FieldController.prototype.delete = function(params, callback) {
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
FieldController.prototype.changeClass = function(params, callback) {
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
FieldController.prototype.createView = function(params, callback) {
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
FieldController.prototype.getView = function(params, callback) {
    var self = this;
    FieldController.super_.prototype.getView.call(this, params, function(result) {
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
FieldController.prototype.saveView = function(params, callback) {
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
FieldController.prototype.createController = function(params, callback) {
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
FieldController.prototype.saveController = function(params, callback) {
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
FieldController.prototype.moveUp = function(params, callback) {
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
FieldController.prototype.moveDown = function(params, callback) {
    this.getApplicationEditor(function(appEditor) {
        appEditor.getPageByFileName(params.pageFileName, function(pageEditor) {
            var formEditor = pageEditor.getForm(params.form);
            formEditor.moveFieldDown(params, function(result) {
                callback(result);
            });
        });
    });
};