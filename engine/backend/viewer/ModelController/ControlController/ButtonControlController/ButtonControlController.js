'use strict';

module.exports = ButtonControlController;

var util = require('util');
var path = require('path');

var QForms = require('../../../../qforms');
var server  = require('../../../../server');

var ControlController = require('../ControlController');

util.inherits(ButtonControlController, ControlController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ButtonControlController(data, parent) {
    ButtonControlController.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/ControlController/ButtonControlController/view',
        this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ButtonControlController.create = function(data, parent, callback) {
    callback(new ButtonControlController(data, parent));
};