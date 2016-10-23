'use strict';

module.exports = CheckBoxField;

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server  = require('../../../../../server');
var Field   = require('../Field');

util.inherits(CheckBoxField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function CheckBoxField(data, parent) {
    var self = this;
    CheckBoxField.super_.call(self, data, parent);
    self.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FieldController/CheckBoxFieldController/view',
        self.parent.data['@class'] + self.data['@class'] + 'View.ejs'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
CheckBoxField.create = function(data, parent) {
    return Promise.resolve(new CheckBoxField(data, parent));
};