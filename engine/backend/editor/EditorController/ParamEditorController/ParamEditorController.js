'use strict';

module.exports = ParamEditorController;

var util = require('util');
var path = require('path');
var fs   = require('fs');
var _    = require('underscore');

var qforms           = require('../../../qforms');
var EditorController = require('../EditorController');
var ApplicationFile  = require('../../JsonFile/ApplicationFile/ApplicationFile');

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
    var appFile = new ApplicationFile(this.appInfo);
    appFile.init(function() {
        var param = appFile.newDatabaseParam(params);
        appFile.save(function() {
            callback(param);
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ParamEditorController.prototype.save = function(params, callback) {
    var appFile = new ApplicationFile(this.appInfo);
    appFile.init(function() {
        appFile.setDatabaseParamAttr(params['database'], params['param'], params['attr'], params['value']);
        appFile.save(function() {
            callback(null);
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ParamEditorController.prototype.delete = function(params, callback) {
    var appFile = new ApplicationFile(this.appInfo);
    appFile.init(function() {
        appFile.deleteDatabaseParam(params['database'], params['param']);
        appFile.save(function() {
            callback(null);
        });
    });
};