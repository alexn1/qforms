'use strict';

module.exports = ComboBoxFieldController;

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server          = require('../../../../../server');
var FieldController = require('../FieldController');

util.inherits(ComboBoxFieldController, FieldController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ComboBoxFieldController(data, parent) {
    ComboBoxFieldController.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FieldController/ComboBoxFieldController/view',
        this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.create2 = function(data, parent) {
    return Promise.resolve(new ComboBoxFieldController(data, parent));
};