'use strict';

module.exports = ButtonControlController;

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server = require('../../../../../server');

var ControlController = require('../ControlController');

util.inherits(ButtonControlController, ControlController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ButtonControlController(data, parent) {
    var self = this;
    ButtonControlController.super_.call(self, data, parent);
    self.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/ControlController/ButtonControlController/view',
        self.parent.data['@class'] + this.data['@class'] + 'View.ejs'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ButtonControlController.create = function(data, parent, callback) {
    callback(new ButtonControlController(data, parent));
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ButtonControlController.create2 = function(data, parent) {
    return Promise.resolve(new ButtonControlController(data, parent));
};