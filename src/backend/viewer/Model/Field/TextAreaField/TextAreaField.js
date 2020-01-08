'use strict';

module.exports = TextAreaField;

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server = require('../../../../../server');
var Field  = require('../Field');

util.inherits(TextAreaField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function TextAreaField(data, parent) {
    var self = this;
    TextAreaField.super_.call(self, data, parent);
    self.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FieldController/TextAreaFieldController/view',
        self.parent.data['@class'] + self.data['@class'] + 'View.ejs'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
TextAreaField.create = function(data, parent) {
    return Promise.resolve(new TextAreaField(data, parent));
};