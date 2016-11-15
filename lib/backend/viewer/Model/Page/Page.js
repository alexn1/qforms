'use strict';

module.exports = Page;

var util          = require('util');
var path          = require('path');
var fs            = require('fs');
var child_process = require('child_process');
var stream        = require('stream');
var Promise       = require('bluebird');

var qforms = require('../../../../qforms');
var server = require('../../../../server');
var Model  = require('../Model');

util.inherits(Page, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function Page(data, parent) {
    var self = this;
    Page.super_.call(self, data, parent);
    self.application        = parent;
    self.app                = parent;
    self.dirPath            = path.join(self.parent.dirPath, 'pages', self.name);
    self.viewFilePath       = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/PageController/view',
        self.data['@class'] + 'View.ejs'
    );
    self.customViewFilePath = path.join(self.dirPath, self.name + '.ejs');
    self.createCollections  = ['dataSources', 'forms'];
    self.fillCollections    = ['dataSources', 'forms'];
    self.dataSources        = {};
    self.forms              = {};
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.create = function(data, parent) {
    return Promise.try(function () {
        var customClassFilePath = path.join(
            parent.dirPath,
            'pages',
            data['@attributes'].name,
            data['@attributes'].name + '.backend.js'
        );
        return qforms.helper.getFileContent(customClassFilePath).then(function(content) {
            if (content) {
                var customClass = eval(content);
                return new customClass(data, parent);
            } else {
                return new Page(data, parent);
            }
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.rpc = function(context) {
    var self = this;
    return Promise.try(function () {
        return {
            result: 'ok'
        };
    });
};