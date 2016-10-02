'use strict';

module.exports = FieldEditorController;

var util = require('util');
var path = require('path');
var fs   = require('fs');

var server                 = require('../../../../../server');
var VisualEditorController = require('../VisualEditorController');

util.inherits(FieldEditorController, VisualEditorController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function FieldEditorController(appInfo) {
    var self = this;
    FieldEditorController.super_.call(self, appInfo);
    self.viewDirPath = path.join(
        server.get('public'),
        'editor/class/Controller/ModelController/DocumentController/VisualController/FieldController'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditorController.prototype._new = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        return appEditor.getPageByFileName2(params.pageFileName).then(function (pageEditor) {
            var formEditor = pageEditor.getForm(params.form);
            var fieldData = formEditor.newField(params);
            return pageEditor.save2().then(function () {
                return fieldData;
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditorController.prototype.save = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        return appEditor.getPageByFileName2(params.pageFileName).then(function (pageEditor) {
            var formEditor  = pageEditor.getForm(params.form);
            var fieldEditor = formEditor.getField(params.field);
            return fieldEditor.setAttr2(params['attr'], params['value']).then(function () {
                return null;
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditorController.prototype.delete = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        return appEditor.getPageByFileName2(params.pageFileName).then(function (pageEditor) {
            var formEditor = pageEditor.getForm(params.form);
            return formEditor.removeField2(params.field).then(function () {
                return null;
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditorController.prototype.changeClass = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        return appEditor.getPage2(params.page).then(function (pageEditor) {
            var formEditor  = pageEditor.getForm(params.form);
            var fieldEditor = formEditor.getField(params.field);
            return fieldEditor.changeClass2(params['class']).then(function (newFieldData) {
                return newFieldData;
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditorController.prototype.createView = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        return appEditor.getPage2(params.page).then(function (pageEditor) {
            var formEditor  = pageEditor.getForm(params.form);
            var fieldEditor = formEditor.getField(params.field);
            return fieldEditor.createEjs2(params).then(function (ejs) {
                return fieldEditor.createCss2(params).then(function (css) {
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
FieldEditorController.prototype.getView = function(params) {
    var self = this;
    return FieldEditorController.super_.prototype.getView.call(this, params).then(function (result) {
        switch (params.view) {
            case 'VisualView.html':
                return self.getApplicationEditor2().then(function(appEditor) {
                    return appEditor.getPage2(params.page).then(function (pageEditor) {
                        var formEditor  = pageEditor.getForm(params.form);
                        var fieldEditor = formEditor.getField(params.field);
                        return fieldEditor.getCustomFile2('ejs').then(function (ejs) {
                            result.data.ejs = ejs;
                            return fieldEditor.getCustomFile2('css').then(function (css) {
                                result.data.css = css;
                                return fieldEditor.getCustomFile2('js').then(function (js) {
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
FieldEditorController.prototype.saveView = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        return appEditor.getPage2(params.page).then(function (pageEditor) {
            var formEditor  = pageEditor.getForm(params.form);
            var fieldEditor = formEditor.getField(params.field);
            switch (params.view) {
                case 'ejs':
                    fieldEditor.saveCustomFile2('ejs', params.text).then(function () {
                        return null;
                    });
                    break;
                case 'css':
                    fieldEditor.saveCustomFile2('css', params.text).then(function () {
                        return null;
                    });
                    break;
            }
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditorController.prototype.createController = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        return appEditor.getPage2(params.page).then(function (pageEditor) {
            var formEditor  = pageEditor.getForm(params.form);
            var fieldEditor = formEditor.getField(params.field);
            return fieldEditor.createJs2(params).then(function (js) {
                return {
                    js: js
                };
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditorController.prototype.saveController = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        return appEditor.getPage2(params.page).then(function (pageEditor) {
            var formEditor  = pageEditor.getForm(params.form);
            var fieldEditor = formEditor.getField(params.field);
            return fieldEditor.saveCustomFile2('js', params.text).then(function () {
                return null;
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditorController.prototype.moveUp = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        return appEditor.getPageByFileName2(params.pageFileName).then(function (pageEditor) {
            var formEditor = pageEditor.getForm(params.form);
            return formEditor.moveFieldUp2(params).then(function (result) {
                return result;
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditorController.prototype.moveDown = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        return appEditor.getPageByFileName2(params.pageFileName).then(function (pageEditor) {
            var formEditor = pageEditor.getForm(params.form);
            return formEditor.moveFieldDown2(params).then(function (result) {
                return result;
            });
        });
    });
};