'use strict';

module.exports = VisualController;

var util = require('util');
var path = require('path');
var fs   = require('fs');

var qforms     = require('../../../qforms');
var Controller = require('../Controller');

util.inherits(VisualController, Controller);

////////////////////////////////////////////////////////////////////////////////////////////////////
function VisualController(appInfo) {
    VisualController.super_.prototype.constructor.call(this, appInfo);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
VisualController.prototype.getView = function(params, callback) {
    VisualController.super_.prototype.getView.call(this, params, function(result) {
        switch (params.view) {
            case 'VisualView.html':
                var viewFilePath = path.join(
                    qforms.get('public'),
                    'editor/class/Controller/ModelController/DocumentController/VisualController/VisualView.html'
                );
                fs.readFile(viewFilePath, 'utf8', function(err, content) {
                    result.view = content;
                    callback(result);
                });
                break;
            default:
                callback(result);
        }
    });
};