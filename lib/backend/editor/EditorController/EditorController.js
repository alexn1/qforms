'use strict';

module.exports = EditorController;

var path = require('path');
var fs   = require('fs');

var qforms = require('../../../qforms');

////////////////////////////////////////////////////////////////////////////////////////////////////
function EditorController(appInfo) {
    var self = this;
    self.appInfo     = appInfo;
    self.viewDirPath = null;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
EditorController.prototype.getView = function(params) {
    var self = this;
    var result = {
        view: '',
        data: {}
    };
    var viewFilePath = path.join(self.viewDirPath, params.view);
    return qforms.helper.exists(viewFilePath).then(function (exists) {
        if (exists) {
            return qforms.helper.readFile(viewFilePath).then(function (content) {
                result.view = content;
                return result;
            });
        } else {
            return result;
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
EditorController.prototype.getApplicationEditor = function() {
    var self = this;
    console.log('EditorController.prototype.getApplicationEditor');
    var appFile = new qforms.JsonFile(self.appInfo.filePath);
    return appFile.read2().then(function () {
        var appEditor = new qforms.ApplicationEditor(appFile);
        return appEditor;
    });
};