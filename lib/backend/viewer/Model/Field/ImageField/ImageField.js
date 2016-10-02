'use strict';

module.exports = ImageField;

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server = require('../../../../../server');
var Field  = require('../Field');

util.inherits(ImageField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ImageField(data, parent) {
    var self = this;
    ImageField.super_.call(self, data, parent);
    self.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FieldController/ImageFieldController/view',
        self.parent.data['@class'] + self.data['@class'] + 'View.ejs'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ImageField.create2 = function(data, parent) {
    return Promise.resolve(new ImageField(data, parent));
};