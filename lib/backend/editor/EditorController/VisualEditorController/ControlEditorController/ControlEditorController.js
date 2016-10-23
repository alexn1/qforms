'use strict';

module.exports = ControlEditorController;

var util = require('util');
var path = require('path');
var fs   = require('fs');

var server = require('../../../../../server');

var VisualEditorController = require('../VisualEditorController');

util.inherits(ControlEditorController, VisualEditorController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ControlEditorController(appInfo) {
    var self = this;
    ControlEditorController.super_.call(self, appInfo);
    self.viewDirPath = path.join(
        server.get('public'),
        'editor/class/Controller/ModelController/DocumentController/VisualController/ControlController'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ControlEditorController.prototype._new = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        return appEditor.getPageByFileName2(params.pageFileName).then(function(pageEditor) {
            var formEditor = pageEditor.getForm(params.form);
            return formEditor.createControl2(params).then(function (controlEditor) {
                var controlData = controlEditor.getData();
                return controlData;
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ControlEditorController.prototype.save = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        return appEditor.getPageByFileName2(params.pageFileName).then(function (pageEditor) {
            var formEditor    = pageEditor.getForm(params.form);
            var controlEditor = formEditor.getControl(params.control);
            return controlEditor.setAttr(params['attr'], params['value']).then(function () {
                return null;
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ControlEditorController.prototype.delete = function(params) {
    var self = this;
    return self.getApplicationEditor2().then(function(appEditor) {
        return appEditor.getPageByFileName2(params.pageFileName).then(function (pageEditor) {
            var formEditor = pageEditor.getForm(params.form);
            return formEditor.removeControl2(params.control).then(function () {
                return null;
            });
        });
    });
};