'use strict';

module.exports = ButtonControlController;

var util = require('util');
var path = require('path');

var ControlController = require('../ControlController');
var qforms  = require('../../../../qforms');

util.inherits(ButtonControlController, ControlController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ButtonControlController(data, parent) {
    ButtonControlController.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        qforms.get('public'),
        'viewer/class/Controller/ModelController/ControlController/ButtonControlController/view',
        this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ButtonControlController.create = function(data, parent, callback) {
    callback(new ButtonControlController(data, parent));
};