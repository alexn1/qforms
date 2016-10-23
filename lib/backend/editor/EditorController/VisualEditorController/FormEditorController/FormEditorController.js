'use strict';

module.exports = FormEditorController;

var util = require('util');
var path = require('path');
var fs   = require('fs');

var server                 = require('../../../../../server');
var VisualEditorController = require('../VisualEditorController');

util.inherits(FormEditorController, VisualEditorController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function FormEditorController(appInfo) {
    var self = this;
    FormEditorController.super_.call(self, appInfo);
    self.viewDirPath = path.join(
        server.get('public'),
        'editor/class/Controller/ModelController/DocumentController/VisualController/FormController'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditorController.prototype._new = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        return appEditor.getPageByFileName2(params['pageFileName']).then(function (pageEditor) {
            return pageEditor.createForm2(params).then(function (formEditor) {
                var formData = formEditor.getData();
                return formData;
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditorController.prototype.save = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        return appEditor.getPageByFileName2(params['pageFileName']).then(function (pageEditor) {
            var formEditor = pageEditor.getForm(params.form);
            return formEditor.setAttr(params['attr'], params['value']).then(function () {
                return null;
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditorController.prototype.delete = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        return appEditor.getPageByFileName2(params['pageFileName']).then(function (pageEditor) {
            return pageEditor.removeForm2(params['form']).then(function () {
                return null;
            });
        });
    });
};


////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditorController.prototype.moveUp = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        return appEditor.getPageByFileName2(params.pageFileName).then(function (pageEditor) {
            return pageEditor.moveFormUp2(params).then(function (result) {
                return result;
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditorController.prototype.moveDown = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        return appEditor.getPageByFileName2(params.pageFileName).then(function (pageEditor) {
            return pageEditor.moveFormDown2(params).then(function (result) {
                return result;
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditorController.prototype.createView = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        return appEditor.getPage2(params.page).then(function (pageEditor) {
            var formEditor = pageEditor.getForm(params.form);
            return formEditor.createEjs2(params).then(function (ejs) {
                return formEditor.createCss2(params).then(function (css) {
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
FormEditorController.prototype.getView = function(params) {
    var self = this;
    return FormEditorController.super_.prototype.getView.call(this, params).then(function (result) {
        switch (params.view) {
            case 'VisualView.html':
                return self.getApplicationEditor2().then(function(appEditor) {
                    return appEditor.getPage2(params.page).then(function (pageEditor) {
                        var formEditor = pageEditor.getForm(params.form);
                        return formEditor.getCustomFile('ejs').then(function (ejs) {
                            result.data.ejs = ejs;
                            return formEditor.getCustomFile('css').then(function (css) {
                                result.data.css = css;
                                return formEditor.getCustomFile('js').then(function (js) {
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
FormEditorController.prototype.saveView = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        return appEditor.getPage2(params.page).then(function (pageEditor) {
            var formEditor = pageEditor.getForm(params.form);
            switch (params.view) {
                case 'ejs':
                    formEditor.saveCustomFile('ejs', params.text).then(function () {
                        return null;
                    });
                    break;
                case 'css':
                    formEditor.saveCustomFile('css', params.text).then(function () {
                        return null;
                    });
                    break;
            }
        });
    });
};


////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditorController.prototype.createController = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        return appEditor.getPage2(params.page).then(function (pageEditor) {
            var formEditor = pageEditor.getForm(params.form);
            return formEditor.createJs2(params).then(function (js) {
                return {
                    js: js
                };
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditorController.prototype.saveController = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        return appEditor.getPage2(params.page).then(function (pageEditor) {
            var formEditor = pageEditor.getForm(params.form);
            return formEditor.saveCustomFile('js', params.text).then(function () {
                return null;
            });
        });
    });
};