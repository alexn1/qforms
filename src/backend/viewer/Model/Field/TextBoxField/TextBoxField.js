'use strict';

module.exports = TextBoxField;

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server = require('../../../../../server');
var Field  = require('../Field');

util.inherits(TextBoxField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function TextBoxField(data, parent) {
    var self = this;
    TextBoxField.super_.call(self, data, parent);
    self.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FieldController/TextBoxFieldController/view',
        self.parent.data['@class'] + self.data['@class'] + 'View.ejs'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
TextBoxField.create = function(data, parent) {
    return Promise.resolve(new TextBoxField(data, parent));
};