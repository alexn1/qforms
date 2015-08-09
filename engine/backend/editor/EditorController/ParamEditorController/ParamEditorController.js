'use strict';

module.exports = ParamEditorController;

var util = require('util');
var path = require('path');
var fs   = require('fs');
var _    = require('underscore');

var qforms            = require('../../../qforms');
var EditorController  = require('../EditorController');
var ApplicationEditor = require('../../Editor/ApplicationEditor/ApplicationEditor');
var JsonFile          = require('../../JsonFile/JsonFile');

util.inherits(ParamEditorController, EditorController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ParamEditorController(appInfo) {
    ParamEditorController.super_.call(this, appInfo);
    this.viewDirPath = path.join(
        qforms.get('public'),
        'editor/class/Controller/ModelController/ParamController'
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ParamEditorController.prototype._new = function(params, callback) {
    var self = this;
    var appFile = new JsonFile(this.appInfo.filePath);
    appFile.init(function() {
        var appEditor = new ApplicationEditor(appFile, self.appInfo);
        var param = appEditor.newDatabaseParam(params);
        appEditor.save(function() {
            callback(param);
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ParamEditorController.prototype.save = function(params, callback) {
    var self = this;
    var appFile = new JsonFile(this.appInfo.filePath);
    appFile.init(function() {
        var appEditor = new ApplicationEditor(appFile, self.appInfo);
        appEditor.setDatabaseParamAttr(params['database'], params['param'], params['attr'], params['value']);
        appEditor.save(function() {
            callback(null);
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ParamEditorController.prototype.delete = function(params, callback) {
    var self = this;
    var appFile = new JsonFile(this.appInfo.filePath);
    appFile.init(function() {
        var appEditor = new ApplicationEditor(appFile, self.appInfo);
        appEditor.deleteDatabaseParam(params['database'], params['param']);
        appEditor.save(function() {
            callback(null);
        });
    });
};