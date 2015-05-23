'use strict';

module.exports = Controller;

var path = require('path');
var fs   = require('fs');

var ApplicationFile   = require('../JsonFile/ApplicationFile/ApplicationFile');
var ApplicationEditor = require('../Editor/ApplicationEditor/ApplicationEditor');

////////////////////////////////////////////////////////////////////////////////////////////////////
function Controller(appInfo) {
    this.appInfo     = appInfo;
    this.viewDirPath = null;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Controller.prototype.getView = function(params, callback) {
    var result = {
        view:  '',
        data: {}
    };
    var viewFilePath = path.join(this.viewDirPath, params.view);
    fs.exists(viewFilePath, function(exists) {
        if (exists) {
            fs.readFile(viewFilePath, 'utf8', function(err, content) {
                result.view = content;
                callback(result);
            });
        } else {
            callback(result);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Controller.prototype.getApplicationEditor = function(callback) {
    var appFile = new ApplicationFile(this.appInfo);
    appFile.init(function() {
        var appEditor = new ApplicationEditor(appFile);
        callback(appEditor);
    });
};