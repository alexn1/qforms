'use strict';

module.exports = TextAreaFieldController;

var util = require('util');
var path = require('path');

var QForms = require('../../../../QForms');
var server             = require('../../../../server');

var FieldController = require('../FieldController');

util.inherits(TextAreaFieldController, FieldController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function TextAreaFieldController(data, parent) {
    TextAreaFieldController.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FieldController/TextAreaFieldController/view',
        this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TextAreaFieldController.create = function(data, parent, callback) {
    callback(new TextAreaFieldController(data, parent));
};