'use strict';

module.exports = LabelFieldController;

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server = require('../../../../../server');
var Field  = require('../FieldController');

util.inherits(LabelFieldController, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function LabelFieldController(data, parent) {
    LabelFieldController.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FieldController/LabelFieldController/view',
        this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
LabelFieldController.create2 = function(data, parent) {
    return Promise.resolve(new LabelFieldController(data, parent));
};