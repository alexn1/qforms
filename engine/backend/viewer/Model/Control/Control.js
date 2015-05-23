'use strict';

module.exports = Control;

var util = require('util');
var path = require('path');

var Model = require('../Model');

util.inherits(Control, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function Control(data, parent) {
    Control.super_.call(this, data, parent);
    this.dirPath            = path.join(parent.dirPath, this.name);
    this.customViewFilePath = path.join(this.dirPath, this.name + '.ejs');
};