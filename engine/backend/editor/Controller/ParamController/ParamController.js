'use strict';

module.exports = ParamController;

var util = require('util');
var path = require('path');
var fs   = require('fs');
var _    = require('underscore');

var qforms          = require('../../../qforms');
var Controller      = require('../Controller');
var ApplicationFile = require('../../JsonFile/ApplicationFile/ApplicationFile');

util.inherits(ParamController, Controller);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ParamController(appInfo) {
    ParamController.super_.prototype.constructor.call(this, appInfo);
    this.viewDirPath = path.join(
        qforms.get('public'),
        'editor/class/Controller/ModelController/ParamController'
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ParamController.prototype._new = function(params, callback) {
    var appFile = new ApplicationFile(this.appInfo);
    appFile.init(function() {
        var param = appFile.newDatabaseParam(params);
        appFile.save(function() {
            callback(param);
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ParamController.prototype.save = function(params, callback) {
    var appFile = new ApplicationFile(this.appInfo);
    appFile.init(function() {
        appFile.setDatabaseParamAttr(params["database"], params["param"], params["attr"], params["value"]);
        appFile.save(function() {
            callback(null);
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ParamController.prototype.delete = function(params, callback) {
    var appFile = new ApplicationFile(this.appInfo);
    appFile.init(function() {
        appFile.deleteDatabaseParam(params["database"], params["param"]);
        appFile.save(function() {
            callback(null);
        });
    });
};