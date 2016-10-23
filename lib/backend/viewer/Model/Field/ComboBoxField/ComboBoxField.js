'use strict';

module.exports = ComboBoxField;

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server = require('../../../../../server');
var Field  = require('../Field');

util.inherits(ComboBoxField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ComboBoxField(data, parent) {
    var self = this;
    ComboBoxField.super_.call(self, data, parent);
    self.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FieldController/ComboBoxFieldController/view',
        self.parent.data['@class'] + self.data['@class'] + 'View.ejs'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxField.create = function(data, parent) {
    return Promise.resolve(new ComboBoxField(data, parent));
};