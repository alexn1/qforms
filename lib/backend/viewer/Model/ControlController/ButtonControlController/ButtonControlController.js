'use strict';

module.exports = ButtonControl;

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server   = require('../../../../../server');
var Control  = require('../ControlController');

util.inherits(ButtonControl, Control);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ButtonControl(data, parent) {
    var self = this;
    ButtonControl.super_.call(self, data, parent);
    self.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/ControlController/ButtonControlController/view',
        self.parent.data['@class'] + this.data['@class'] + 'View.ejs'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ButtonControl.create2 = function(data, parent) {
    return Promise.resolve(new ButtonControl(data, parent));
};