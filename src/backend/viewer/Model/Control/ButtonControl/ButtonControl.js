'use strict';

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server   = require('../../../../../server');
var Control  = require('../Control');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class ButtonControl extends Control {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor(data, parent) {
        super(data, parent);
        var self = this;
        self.viewFilePath = path.join(
            server.get('public'),
            'viewer/class/Controller/ModelController/ControlController/ButtonControlController/view',
            self.parent.data['@class'] + this.data['@class'] + 'View.ejs'
        );
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static async create(data, parent) {
        return new ButtonControl(data, parent);
    }

}

module.exports = ButtonControl;