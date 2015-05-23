'use strict';

module.exports = ButtonControl;

var util = require('util');
var path = require('path');

var Control = require('../Control');
var qforms  = require('../../../../qforms');

util.inherits(ButtonControl, Control);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ButtonControl(data, parent) {
    ButtonControl.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        qforms.get('public'),
        'viewer/class/Controller/ModelController/ControlController/ButtonControlController/view',
        this.parent.constructor.name + this.constructor.name + 'View.ejs'
    );
};