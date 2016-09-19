'use strict';

module.exports = ImageField;

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server = require('../../../../../server');
var Field  = require('../FieldController');

util.inherits(ImageField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ImageField(data, parent) {
    ImageField.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FieldController/ImageFieldController/view',
        this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ImageField.create2 = function(data, parent) {
    return Promise.resolve(new ImageField(data, parent));
};