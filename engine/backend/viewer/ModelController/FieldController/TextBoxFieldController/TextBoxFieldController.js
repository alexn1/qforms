'use strict';

module.exports = TextBoxFieldController;

var util = require('util');
var path = require('path');

var QForms = require('../../../../qforms');
var server           = require('../../../../server');

var FieldController = require('../FieldController');

util.inherits(TextBoxFieldController, FieldController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function TextBoxFieldController(data, parent) {
    TextBoxFieldController.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FieldController/TextBoxFieldController/view',
        this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TextBoxFieldController.create = function(data, parent, callback) {
    callback(new TextBoxFieldController(data, parent));
};