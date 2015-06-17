'use strict';

module.exports = TextAreaFieldController;

var util = require('util');
var path = require('path');

var FieldController = require('../FieldController');
var app             = require('../../../../qforms');

util.inherits(TextAreaFieldController, FieldController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function TextAreaFieldController(data, parent) {
    TextAreaFieldController.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        app.get('public'),
        'viewer/class/Controller/ModelController/FieldController/TextAreaFieldController/view',
        this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TextAreaFieldController.create = function(data, parent, callback) {
    callback(new TextAreaFieldController(data, parent));
};