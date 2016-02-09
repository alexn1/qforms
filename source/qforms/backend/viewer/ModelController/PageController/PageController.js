'use strict';

module.exports = PageController;

var util          = require('util');
var path          = require('path');
var fs            = require('fs');
var async         = require('async');
var child_process = require('child_process');
var stream        = require('stream');

var qforms = require('../../../../qforms');
var server = require('../../../../server');

var ModelController  = require('../ModelController');

util.inherits(PageController, ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function PageController(data, parent) {
    PageController.super_.call(this, data, parent);
    this.application        = parent;
    this.dirPath            = path.join(this.parent.dirPath, 'pages', this.name);
    this.viewFilePath       = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/PageController/view',
        this.data['@class'] + 'View.ejs'
    );
    this.customViewFilePath = path.join(this.dirPath, this.name + '.ejs');
    this.createCollections  = ['dataSources', 'forms'];
    this.fillCollections    = ['dataSources', 'forms'];
    this.dataSources        = {};
    this.forms              = {};
}

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.create = function(data, parent, callback) {
    var customClassFilePath = path.join(
        parent.dirPath,
        'pages',
        data['@attributes'].name,
        data['@attributes'].name + '.backend.js'
    );
    qforms.helper.getFileContent(customClassFilePath, function(content) {
        if (content) {
            var customClass = eval(content);
            callback(new customClass(data, parent));
        } else {
            callback(new PageController(data, parent));
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.rpc = function(context) {
    context.res.json({
        result: 'ok'
    });
};