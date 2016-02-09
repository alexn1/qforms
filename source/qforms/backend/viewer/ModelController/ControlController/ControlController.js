'use strict';

module.exports = ControlController;

var util = require('util');
var path = require('path');

var ModelController = require('../ModelController');

util.inherits(ControlController, ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ControlController(data, parent) {
    ControlController.super_.call(this, data, parent);
    this.dirPath            = path.join(parent.dirPath, this.name);
    this.customViewFilePath = path.join(this.dirPath, this.name + '.ejs');
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ControlController.create = function(data, parent, callback) {
    callback(new Control(data, parent));
};