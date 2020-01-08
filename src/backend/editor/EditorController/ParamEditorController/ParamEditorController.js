'use strict';

module.exports = ParamEditorController;

var util = require('util');
var path = require('path');
var fs   = require('fs');
var _    = require('underscore');

var qforms           = require('../../../../qforms');
var server           = require('../../../../server');
var EditorController = require('../EditorController');

util.inherits(ParamEditorController, EditorController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ParamEditorController(appInfo) {
    var self = this;
    ParamEditorController.super_.call(self, appInfo);
    self.viewDirPath = path.join(
        server.get('public'),
        'editor/class/Controller/ModelController/ParamController'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ParamEditorController.prototype._new = function(params) {
    var self = this;
    var appFile = new qforms.JsonFile(self.appInfo.filePath);
    return appFile.read().then(function () {
        var appEditor = new qforms.ApplicationEditor(appFile);
        var param = appEditor.newDatabaseParam(params);
        return appEditor.save().then(function() {
            return param;
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ParamEditorController.prototype.save = function(params) {
    var self = this;
    var appFile = new qforms.JsonFile(self.appInfo.filePath);
    return appFile.read().then(function () {
        var appEditor = new qforms.ApplicationEditor(appFile);
        appEditor.setDatabaseParamAttr(params['database'], params['param'], params['attr'], params['value']);
        return appEditor.save().then(function() {
            return null;
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ParamEditorController.prototype.delete = function(params) {
    var self = this;
    var appFile = new qforms.JsonFile(self.appInfo.filePath);
    return appFile.read().then(function () {
        var appEditor = new qforms.ApplicationEditor(appFile);
        appEditor.deleteDatabaseParam(params['database'], params['param']);
        appEditor.save().then(function () {
            return null;
        });
    });
};