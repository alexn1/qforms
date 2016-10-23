'use strict';

module.exports = LabelField;

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server = require('../../../../../server');
var Field  = require('../Field');

util.inherits(LabelField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function LabelField(data, parent) {
    var self = this;
    LabelField.super_.call(self, data, parent);
    self.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FieldController/LabelFieldController/view',
        self.parent.data['@class'] + self.data['@class'] + 'View.ejs'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
LabelField.create = function(data, parent) {
    return Promise.resolve(new LabelField(data, parent));
};