'use strict';

module.exports = Control;

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var Model = require('../ModelController');

util.inherits(Control, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function Control(data, parent) {
    var self = this;
    Control.super_.call(self, data, parent);
    self.dirPath            = path.join(parent.dirPath, self.name);
    self.customViewFilePath = path.join(self.dirPath, self.name + '.ejs');
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Control.create2 = function(data, parent) {
    return Promise.resolve(new Control(data, parent));
};