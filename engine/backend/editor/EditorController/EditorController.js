'use strict';

module.exports = EditorController;

var path = require('path');
var fs   = require('fs');

var JsonFile          = require('../JsonFile/JsonFile');
var ApplicationEditor = require('../Editor/ApplicationEditor/ApplicationEditor');

////////////////////////////////////////////////////////////////////////////////////////////////////
function EditorController(appInfo) {
    this.appInfo     = appInfo;
    this.viewDirPath = null;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
EditorController.prototype.getView = function(params, callback) {
    var result = {
        view: '',
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
EditorController.prototype.getApplicationEditor = function(callback) {
    var self = this;
    var appFile = new JsonFile(this.appInfo.filePath);
    appFile.read(function() {
        var appEditor = new ApplicationEditor(appFile);
        callback(appEditor);
    });
};