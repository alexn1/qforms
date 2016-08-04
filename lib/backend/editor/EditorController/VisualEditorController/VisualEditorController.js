'use strict';

module.exports = VisualEditorController;

var util = require('util');
var path = require('path');
var fs   = require('fs');

var server = require('../../../../server');
var qforms = require('../../../../qforms');

var EditorController = require('../EditorController');

util.inherits(VisualEditorController, EditorController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function VisualEditorController(appInfo) {
    VisualEditorController.super_.call(this, appInfo);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
VisualEditorController.prototype.getView = function(params, callback) {
    VisualEditorController.super_.prototype.getView.call(this, params, function(result) {
        switch (params.view) {
            case 'VisualView.html':
                var viewFilePath = path.join(
                    server.get('public'),
                    'editor/class/Controller/ModelController/DocumentController/VisualController/view/VisualView.html'
                );
                qforms.helper.readFile(viewFilePath).then(function (content) {
                    result.view = content;
                    callback(result);
                });
                break;
            default:
                callback(result);
        }
    });
};