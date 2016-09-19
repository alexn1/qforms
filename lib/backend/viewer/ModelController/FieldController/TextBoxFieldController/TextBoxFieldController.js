'use strict';

module.exports = TextBoxFieldController;

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server = require('../../../../../server');
var Field  = require('../FieldController');

util.inherits(TextBoxFieldController, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function TextBoxFieldController(data, parent) {
    TextBoxFieldController.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FieldController/TextBoxFieldController/view',
        this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
TextBoxFieldController.create2 = function(data, parent) {
    return Promise.resolve(new TextBoxFieldController(data, parent));
};