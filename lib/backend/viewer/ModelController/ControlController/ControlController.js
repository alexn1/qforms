'use strict';

module.exports = ControlController;

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var ModelController = require('../ModelController');

util.inherits(ControlController, ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ControlController(data, parent) {
    var self = this;
    ControlController.super_.call(self, data, parent);
    self.dirPath            = path.join(parent.dirPath, self.name);
    self.customViewFilePath = path.join(self.dirPath, self.name + '.ejs');
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ControlController.create = function(data, parent, callback) {
    callback(new Control(data, parent));
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ControlController.create2 = function(data, parent) {
    return Promise.resolve(new Control(data, parent));
};