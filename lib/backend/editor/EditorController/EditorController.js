'use strict';

module.exports = EditorController;

var path = require('path');
var fs   = require('fs');

var qforms = require('../../../qforms');

////////////////////////////////////////////////////////////////////////////////////////////////////
function EditorController(appInfo) {
    this.appInfo     = appInfo;
    this.viewDirPath = null;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
EditorController.prototype.getView = function(params, callback) {
    var result = {
        view: '',
        data: {}
    };
    var viewFilePath = path.join(this.viewDirPath, params.view);
    qforms.helper.exists(viewFilePath).then(function (exists) {
        if (exists) {
            return qforms.helper.readFile(viewFilePath).then(function (content) {
                result.view = content;
                callback(result);
            });
        } else {
            callback(result);
        }
    });
};

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
EditorController.prototype.getApplicationEditor = function(callback) {
    var self = this;
    var appFile = new qforms.JsonFile(self.appInfo.filePath);
    appFile.read(function() {
        var appEditor = new qforms.ApplicationEditor(appFile);
        callback(appEditor);
    });
};
*/

////////////////////////////////////////////////////////////////////////////////////////////////////
EditorController.prototype.getApplicationEditor2 = function() {
    var self = this;
    console.log('EditorController.prototype.getApplicationEditor2');
    var appFile = new qforms.JsonFile(self.appInfo.filePath);
    return appFile.read2().then(function () {
        var appEditor = new qforms.ApplicationEditor(appFile);
        return appEditor;
    });
};