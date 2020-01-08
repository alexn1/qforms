'use strict';

module.exports = VisualEditorController;

var util = require('util');
var path = require('path');
var fs   = require('fs');

var server           = require('../../../../server');
var qforms           = require('../../../../qforms');
var EditorController = require('../EditorController');

util.inherits(VisualEditorController, EditorController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function VisualEditorController(appInfo) {
    var self = this;
    VisualEditorController.super_.call(self, appInfo);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
VisualEditorController.prototype.getView = function(params) {
    var self = this;
    return VisualEditorController.super_.prototype.getView.call(self, params).then(function (result) {
        switch (params.view) {
            case 'VisualView.html':
                var viewFilePath = path.join(
                    server.get('public'),
                    'editor/class/Controller/ModelController/DocumentController/VisualController/view/VisualView.html'
                );
                return qforms.helper.readFile(viewFilePath).then(function (content) {
                    result.view = content;
                    return result;
                });
                break;
            default:
                return result;
        }
    });
};