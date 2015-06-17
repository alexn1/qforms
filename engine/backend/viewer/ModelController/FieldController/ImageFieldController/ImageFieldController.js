'use strict';

module.exports = ImageFieldController;

var util = require('util');
var path = require('path');

var FieldController = require('../FieldController');
var app             = require('../../../../qforms');

util.inherits(ImageFieldController, FieldController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ImageFieldController(data, parent) {
    ImageFieldController.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        app.get('public'),
        'viewer/class/Controller/ModelController/FieldController/ImageFieldController/view',
        this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ImageFieldController.create = function(data, parent, callback) {
    callback(new ImageFieldController(data, parent));
};